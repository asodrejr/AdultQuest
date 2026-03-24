// Objeto central de atributos
let player = {
  money: 1,
  energy: 1,
  stress: 1,
  health: 1,
  relationships: 1,
  xp: 0,
  points: 2
};

// Atualiza valores na tela
function updateHUD() {
  document.getElementById('money').innerText = player.money;
  document.getElementById('energy').innerText = player.energy;
  document.getElementById('stress').innerText = player.stress;
  document.getElementById('health').innerText = player.health;
  document.getElementById('relationships').innerText = player.relationships;
  document.getElementById('xp').innerText = player.xp;
  document.getElementById('points').innerText = player.points;
}

// Altera atributo com + ou -
function changeAttr(attr, delta) {
  if (player.points <= 0 && delta > 0) return;

  player[attr] += delta;

  // Mantém mínimo em 0
  if (player[attr] < 0) player[attr] = 0;

  // Ajusta pontos
  if (delta > 0) player.points--;
  if (delta < 0) player.points++;

  updateHUD();
}

// Inicializa
updateHUD();