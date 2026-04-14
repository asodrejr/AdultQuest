const loginScreen = document.getElementById("login-screen");
const introScreen = document.getElementById("intro-screen");

const loginBtn = document.getElementById("login-btn");
const registerBtn = document.getElementById("register-btn");

// Esconde menu até login
introScreen.style.display = "none";

// Verifica se já está logado
const token = localStorage.getItem("token");
if (token) {
    showGame();
}

function showGame() {
    loginScreen.style.display = "none";
    introScreen.style.display = "block";
}

// LOGIN
loginBtn.addEventListener("click", async () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("token", data.token);
            showGame();
        } else {
            document.getElementById("login-error").innerText = data.message;
        }

    } catch (error) {
        console.error(error);
    }
});

// REGISTER
registerBtn.addEventListener("click", async () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    });

    alert("Usuário criado!");
});

document.getElementById('start-button').addEventListener('click', function() {window.location.href = 'game.html';
});

const loadScreen= document.getElementById("load-screen");
const optionsScreen= document.getElementById("options-screen");

document.getElementById('load-button').addEventListener('click', function() {loadScreen.classList.remove("hidden");
});

document.getElementById('option-button').addEventListener('click', function() {optionsScreen.classList.remove("hidden");
});

//Fechar Overlays
document.querySelectorAll(".close-button").forEach(button=>{
button.addEventListener("click", ()=>{
    button.closest(".overlay").classList.add("hidden");
});
});

//Fechando clicando fora do conteúdo
document.querySelectorAll(".overlay").forEach(overlay =>{
overlay.addEventListener("click", (e) =>{
    if(e.target === overlay){
    overlay.classList.add("hidden");
    }
});
});