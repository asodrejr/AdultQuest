let player = null;

async function init() {
    // Só roda a lógica de HUD se no game.html
    if (!document.getElementById('attribute-panel')) {
        return; 
    }
    
    try {
        // Cchama API, não mais o Supabase
        const data = await AdultQuestAPI.getCharacter();
        if (data) {
            player = data;
            updateHUD();
        }
    } catch (e) {
        console.error("Erro ao carregar:", e);
    }
}

function updateHUD() {
    if (!player) return;
    // Função auxiliar para evitar o erro de "null"
    const setSafeText = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.innerText = value ?? 0;
    };
    document.getElementById('attr_body').innerText = player.attr_body;
    document.getElementById('attr_mind').innerText = player.attr_mind;
    document.getElementById('attr_emotions').innerText = player.attr_emotions;
    document.getElementById('attr_social').innerText = player.attr_social;
    document.getElementById('points').innerText = player.available_points;
    document.getElementById('xp').innerText = player.current_xp; 
}

function changeAttr(attrName, amount) {
    if (!player) return;

    function showWarning(msg = "") {
        document.getElementById("warning-msg").innerText = msg;
    }

    // 1. Verificar atributo >= 6 proibido quando personagem inicial
    if (amount > 0) {
        // current_xp <= 0 do personagem inicial não permite atributo maior que 6
        if ((player.current_xp <= 0) && (player[attrName] >= 6)) {
            showWarning("Atributo inicial máximo permitido: 6");
            return;
        }

        // Verificar pontos disponíveis

        if (player.available_points <= 0) {
            showWarning("Você não possui pontos disponíveis.");
            return;
        }

        showWarning("");
        
    }

    // 2. Impedir atributo < 1
    if (amount < 0) {
        if (player[attrName] <= 1) {
            return;
        }
    }

    // 3. +-
    player[attrName] += amount;
    player.available_points -= amount;

    // 4. Update
    updateHUD();
}

// O botão salvar no HTML agora chama isso:
async function handleSave() {
    const saveBtn = document.getElementById('save-button');
    const warningEl = document.getElementById("warning-msg");
    
    // 1. Feedback visual imediato (Botão de carregamento)
    const originalText = saveBtn.innerText;
    saveBtn.innerText = "Salvando...";
    saveBtn.disabled = true;

    try {
        const result = await AdultQuestAPI.saveCharacter(player);
        
        if (result.success) {
            // 2. MENSAGEM DE SUCESSO NO JOGO
            if (warningEl) {
                warningEl.style.color = "#28a745"; // Verde Sucesso
                warningEl.innerText = "Progresso salvo com sucesso!";
                
                // Limpa a mensagem automaticamente após 3 segundos
                setTimeout(() => {
                    warningEl.innerText = "";
                    warningEl.style.color = "#b30000"; // Volta para o vermelho padrão de avisos
                }, 3000);
            }
        } else {
            throw new Error(result.error);
        }
    } catch (e) {
        // 3. MENSAGEM DE ERRO NO JOGO
        if (warningEl) {
            warningEl.style.color = "#b30000"; // Vermelho Erro
            warningEl.innerText = "Erro ao salvar o progresso.";
        }
        console.error("Falha no salvamento:", e.message);
    } finally {
        // 4. Restaura o botão
        saveBtn.innerText = originalText;
        saveBtn.disabled = false;
    }
}

init();