// Objeto central de atributos
let player = {
  attr_body: 1,
  attr_mind: 1,
  attr_emotions: 1,
  attr_social: 1,
  xp: 0,
  points: 2
};

// Atualiza valores na tela
function updateHUD() {
  document.getElementById('attr_body').innerText = player.attr_body;
  document.getElementById('attr_mind').innerText = player.attr_mind;
  document.getElementById('attr_emotions').innerText = player.attr_emotions;
  document.getElementById('attr_social').innerText = player.attr_social;
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