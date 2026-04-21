// Objeto central de atributos
let player = {
  body: 1,
  mind: 1,
  emotions: 1,
  social: 1,
  xp: 0,
  points: 2
};

// Atualiza valores na tela
function updateHUD() {
  document.getElementById('body').innerText = player.body;
  document.getElementById('mind').innerText = player.mind;
  document.getElementById('emotions').innerText = player.emotions;
  document.getElementById('social').innerText = player.social;
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