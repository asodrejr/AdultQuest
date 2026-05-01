const loginScreen = document.getElementById("login-screen");
const introScreen = document.getElementById("intro-screen");
const loginBtn = document.getElementById("login-btn");

const startBtn = document.getElementById("start-button");
const optionsBtn = document.getElementById("option-button");

const optionsScreen = document.getElementById("options-screen");
const menuButtons = document.getElementById("menu-buttons");
const closeBtn = document.querySelector(".close-button");

// CONTROLES
const volumeUp = document.getElementById("volume-up");
const volumeDown = document.getElementById("volume-down");
const volumeValue = document.getElementById("volume-value");

const fontUp = document.getElementById("font-up");
const fontDown = document.getElementById("font-down");
const fontValue = document.getElementById("font-value");

const languageSelect = document.getElementById("language-select");

// ===============================
// CONFIG INICIAL
// ===============================

let volume = localStorage.getItem("gameVolume") || 50;
let fontSize = localStorage.getItem("gameFont") || 16;
let language = localStorage.getItem("gameLanguage") || "pt-br";

// ===============================
// ESCONDE MENU ATÉ LOGIN
// ===============================

if (introScreen) {
    introScreen.style.display = "none";
}

// ===============================
// INICIA VALORES VISUAIS
// ===============================

if (volumeValue) volumeValue.innerText = volume + "%";
if (fontValue) fontValue.innerText = fontSize + "px";
if (languageSelect) languageSelect.value = language;

// ===============================
// LOGIN
// ===============================

checkUser();

async function checkUser() {

    const { data, error } = await window.supabaseClient.auth.getUser();

    if (error) {
        console.error(error.message);
        return;
    }

    if (data.user) {
        showGame();
    }
}

function showGame() {

    if (loginScreen) loginScreen.style.display = "none";
    if (introScreen) introScreen.style.display = "block";
}

function showError(msg) {

    const errorEl = document.getElementById("login-error");

    if (errorEl) {
        errorEl.innerText = msg;
    }
}

// BOTÃO LOGIN

if (loginBtn) {

    loginBtn.addEventListener("click", async () => {

        const { error } = await window.supabaseClient.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: window.location.origin + "/index.html"
            }
        });

        if (error) {
            showError("Erro ao conectar com Google.");
        }

    });

}

// DETECTA LOGIN

window.supabaseClient.auth.onAuthStateChange((event, session) => {

    if (event === "SIGNED_IN" && session) {
        showGame();
    }

});

// ===============================
// START GAME
// ===============================

if (startBtn) {

    startBtn.addEventListener("click", () => {
        window.location.href = "/frontend/game.html";
    });

}

// ===============================
// OPTIONS MENU
// ===============================

if (optionsBtn) {

    optionsBtn.addEventListener("click", () => {

        menuButtons.style.display = "none";
        optionsScreen.classList.remove("hidden");

    });

}

// FECHAR OPTIONS

if (closeBtn) {

    closeBtn.addEventListener("click", () => {

        optionsScreen.classList.add("hidden");
        menuButtons.style.display = "flex";

    });

}

// ===============================
// VOLUME
// ===============================

if (volumeUp) {

    volumeUp.onclick = () => {

        if (volume < 100) {

            volume = Number(volume) + 10;

            volumeValue.innerText = volume + "%";

            localStorage.setItem("gameVolume", volume);
        }

    };

}

if (volumeDown) {

    volumeDown.onclick = () => {

        if (volume > 0) {

            volume = Number(volume) - 10;

            volumeValue.innerText = volume + "%";

            localStorage.setItem("gameVolume", volume);
        }

    };

}

// ===============================
// TAMANHO FONTE
// ===============================

if (fontUp) {

    fontUp.onclick = () => {

        fontSize = Number(fontSize) + 2;

        fontValue.innerText = fontSize + "px";

        localStorage.setItem("gameFont", fontSize);
    };

}

if (fontDown) {

    fontDown.onclick = () => {

        if (fontSize > 10) {

            fontSize = Number(fontSize) - 2;

            fontValue.innerText = fontSize + "px";

            localStorage.setItem("gameFont", fontSize);
        }

    };

}

// ===============================
// IDIOMA
// ===============================

if (languageSelect) {

    languageSelect.onchange = function () {

        localStorage.setItem("gameLanguage", this.value);

        console.log("Idioma alterado para:", this.value);

    };

}