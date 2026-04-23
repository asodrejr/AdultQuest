const AdultQuestAPI = {
    // Configurações iniciais para novos personagens
    INITIAL_STATS: {
        attr_body: 1,
        attr_mind: 1,
        attr_emotions: 1,
        attr_social: 1,
        available_points: 10,
        current_xp: 0
    },

    // Busca dados reais ou cria um novo se não existir
    async getCharacter() {
        const { data: { user } } = await window.supabaseClient.auth.getUser();
        if (!user) return null;

        // Tenta buscar o personagem
        let { data, error } = await window.supabaseClient
            .from('character_attributes')
            .select('*')
            .eq('profile_id', user.id)
            .maybeSingle(); // maybeSingle não gera erro 406 se retornar vazio

        // Se não existir (Erro PGRST116 ou data nulo), cria um novo
        if (!data) {
            console.log("Personagem não encontrado. Criando perfil inicial...");
            const { data: newData, error: createError } = await window.supabaseClient
                .from('character_attributes')
                .insert([{
                    profile_id: user.id,
                    ...this.INITIAL_STATS
                }])
                .select()
                .single();

            if (createError) {
                console.error("Erro crítico ao criar personagem:", createError);
                throw createError;
            }
            return newData;
        }

        if (error) throw error;
        return data;
    },

    // Salva com validação de integridade
    async saveCharacter(stats) {
        const { data: { user } } = await window.supabaseClient.auth.getUser();
        if (!user) throw new Error("Usuário não autenticado");

        const total = Number(stats.attr_body) + 
                    Number(stats.attr_mind) + 
                    Number(stats.attr_emotions) + 
                    Number(stats.attr_social) + 
                    Number(stats.available_points);

        if (total > 14) throw new Error("Violação de integridade!");

        const { error } = await window.supabaseClient
            .from('character_attributes')
            .update({
                attr_body: stats.attr_body,
                attr_mind: stats.attr_mind,
                attr_emotions: stats.attr_emotions,
                attr_social: stats.attr_social,
                available_points: stats.available_points,
                current_xp: stats.current_xp,
                updated_at: new Date()
            })
            .eq('profile_id', user.id);

        return { success: !error, error };
    }
};