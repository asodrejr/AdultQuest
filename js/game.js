// Objeto central de atributos
let player = {
  vigor: 1,
  mente: 1,
  emocional: 1,
  social: 1,
  xp: 0,
  points: 2
};

// Atualiza valores na tela
function updateHUD() {
  document.getElementById('vigor').innerText = player.vigor;
  document.getElementById('mente').innerText = player.mente;
  document.getElementById('emocional').innerText = player.emocional;
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