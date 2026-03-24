// Atributos iniciais do Player
let player = {
  money: 100,
  energy: 100,
  stress: 0,
  health: 100,
  relationships: 50,
  xp: 0
};

// Atualiza HUD
function updateHUD() {
  document.getElementById('money').innerText = 'Dinheiro: ' + player.money;
  document.getElementById('energy').innerText = 'Energia: ' + player.energy;
  document.getElementById('stress').innerText = 'Estresse: ' + player.stress;
  document.getElementById('health').innerText = 'Saúde: ' + player.health;
  document.getElementById('relationships').innerText = 'Relacionamentos: ' + player.relationships;
  document.getElementById('xp').innerText = 'XP: ' + player.xp;
}

// Eventos do jogo
function work() {
  player.money += 50;
  player.energy -= 10;
  player.stress += 5;
  player.xp += 10;
  updateHUD();
  alert("Você trabalhou extra! +50$ dinheiro, -10 energia, +5 estresse, +10 XP");
}

function rest() {
  player.energy += 20;
  player.stress -= 5;
  player.health += 5;
  updateHUD();
  alert("Você descansou! +20 energia, -5 estresse, +5 saúde");
}

function social() {
  player.relationships += 10;
  player.stress -= 10;
  player.energy -= 5;
  player.xp += 5;
  updateHUD();
  alert("Você socializou! +10 relacionamentos, -10 estresse, -5 energia, +5 XP");
}

// Inicializa HUD
updateHUD();