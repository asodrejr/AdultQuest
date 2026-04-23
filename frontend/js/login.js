const loginScreen = document.getElementById("login-screen");
const introScreen = document.getElementById("intro-screen");
const loginBtn = document.getElementById("login-btn");

const loadScreen = document.getElementById("load-screen");
const optionsScreen = document.getElementById("options-screen");

// Esconde menu até login
if (introScreen) introScreen.style.display = "none";

// Verifica sessão existente (Supabase)
checkUser();

// ==========================
// FUNÇÕES
// ==========================

function showGame() {
    if (loginScreen) loginScreen.style.display = "none";
    if (introScreen) introScreen.style.display = "block";
}

function showError(msg) {
    const errorEl = document.getElementById("login-error");
    if (errorEl) errorEl.innerText = msg;
}

// ==========================
// VERIFICA LOGIN
// ==========================

async function checkUser() {
    const { data, error } = await window.supabaseClient.auth.getUser();

    if (error) {
        console.error("Erro ao verificar usuário:", error.message);
        return;
    }

    if (data.user) {
        showGame();
    }
}

// ==========================
// LOGIN GOOGLE
// ==========================

if (loginBtn) {
    loginBtn.addEventListener("click", async () => {

        const { error } = await window.supabaseClient.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: window.location.origin + '/index.html'
            }
        });

        if (error) {
            console.error("Erro no login:", error.message);
            showError("Erro ao conectar com Google.");
        }
    });
}

// ==========================
// DETECTA LOGIN APÓS REDIRECT
// ==========================

window.supabaseClient.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_IN" && session) {
        showGame();
    }
});

// ==========================
// START GAME
// ==========================

const startBtn = document.getElementById("start-button");

if (startBtn) {
    startBtn.addEventListener("click", () => {
        window.location.href = "/frontend/game.html";
    });
}

// ==========================
// OVERLAYS
// ==========================

document.getElementById('load-button')?.addEventListener('click', () => {
    loadScreen?.classList.remove("hidden");
});

document.getElementById('option-button')?.addEventListener('click', () => {
    optionsScreen?.classList.remove("hidden");
});

// Fechar botão
document.querySelectorAll(".close-button").forEach(button => {
    button.addEventListener("click", () => {
        button.closest(".overlay")?.classList.add("hidden");
    });
});

// Fechar clicando fora
document.querySelectorAll(".overlay").forEach(overlay => {
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
            overlay.classList.add("hidden");
        }
    });
});