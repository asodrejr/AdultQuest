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