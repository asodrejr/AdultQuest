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

    /**
     * Busca os dados do personagem ou cria um novo.
     * Implementado com tratamento de erro granular para o desenvolvedor.
     */
    async getCharacter() {
        try {
            const { data: { user }, error: authError } = await window.supabaseClient.auth.getUser();
            
            if (authError || !user) {
                console.warn("Usuário não autenticado.");
                return null;
            }

            // Busca o personagem usando maybeSingle para evitar erro 406 (Not Acceptable)
            const { data, error } = await window.supabaseClient
                .from('character_attributes')
                .select('*')
                .eq('profile_id', user.id)
                .maybeSingle();

            if (error) throw error;

            // Se não encontrar dados, dispara a criação do perfil inicial
            if (!data) {
                return await this.createInitialCharacter(user.id);
            }

            return data;
        } catch (err) {
            console.error("Erro em getCharacter:", err.message);
            throw err;
        }
    },

    /**
     * Cria o registro inicial na tabela character_attributes
     */
    async createInitialCharacter(userId) {
        console.log("Iniciando criação de perfil para:", userId);
        
        const { data, error } = await window.supabaseClient
            .from('character_attributes')
            .insert([{
                profile_id: userId,
                ...this.INITIAL_STATS
            }])
            .select()
            .single();

        if (error) {
            console.error("Erro ao inserir personagem inicial:", error.message);
            throw error;
        }
        
        return data;
    },

    /**
     * Salva os atributos com validação de integridade.
     * @param {Object} stats - O objeto 'player' vindo do frontend.
     */
    async saveCharacter(stats) {
        try {
            const { data: { user } } = await window.supabaseClient.auth.getUser();
            if (!user) throw new Error("Sessão expirada. Faça login novamente.");

            // Validação de Integridade (Business Logic)
            const total = Number(stats.attr_body) + 
                          Number(stats.attr_mind) + 
                          Number(stats.attr_emotions) + 
                          Number(stats.attr_social) + 
                          Number(stats.available_points);

            // O limite de 14 pontos é a soma dos iniciais (1+1+1+1 + 10)
            if (total > 14) {
                throw new Error("Integridade violada: Total de pontos excede o limite permitido.");
            }

            // Update focado apenas nas colunas necessárias para evitar erros de constraint
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

            if (error) throw error;

            return { success: true };

        } catch (err) {
            console.error("Erro em saveCharacter:", err.message);
            return { success: false, error: err.message };
        }
    }
};