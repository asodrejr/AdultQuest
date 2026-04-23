const character = document.getElementById('character');

// posição inicial no centro da tela
let posX = window.innerWidth / 2 - 32;
let posY = window.innerHeight / 2 - 32;

// tamanho e passo do personagem
const step = 10;
const charWidth = 64;
const charHeight = 64;

// sprites por direção
const sprites = {
  front: 'assets/sprites/player_front.png',
  back:  'assets/sprites/player_back.png',
  left:  'assets/sprites/player_left.png',
  right: 'assets/sprites/player_right.png'
};

// direção e estado de movimento
let direction = 'front';
let moving = false;
let moveInterval = null;

// Array de colisões para o mapa do apartamento (1080x1920)
const collisions = [
  // Paredes externas
  {x:0, y:0, width:1080, height:50},       // parede topo
  {x:0, y:0, width:50, height:1920},      // parede esquerda
  {x:1030, y:0, width:50, height:1920},   // parede direita
  {x:0, y:1870, width:1080, height:50},   // parede inferior

  // Sala de estar
  {x:60, y:100, width:400, height:200},   // sofá
  {x:200, y:220, width:150, height:80},   // mesa de centro
  {x:450, y:100, width:200, height:50},   // estante/TV

  // Cozinha
  {x:700, y:100, width:250, height:120},  // pia + fogão + geladeira
  {x:700, y:220, width:250, height:50},   // bancada adicional

  // Quarto
  {x:100, y:800, width:300, height:200},  // cama
  {x:420, y:800, width:150, height:200},  // guarda-roupa
  {x:100, y:1010, width:80, height:50},   // mesa de cabeceira

  // Banheiro
  {x:700, y:800, width:150, height:120},  // pia
  {x:700, y:930, width:150, height:120},  // vaso sanitário

  // Corredor (opcional, se tiver obstáculos)
  {x:400, y:500, width:100, height:200},  // degrau ou coluna
];

// função de verificação de colisão
function isColliding(newX, newY) {
  for (const rect of collisions) {
    if (
      newX < rect.x + rect.width &&
      newX + charWidth > rect.x &&
      newY < rect.y + rect.height &&
      newY + charHeight > rect.y
    ) return true;
  }
  return false;
}

// função principal de movimento
function moveCharacter(dx, dy) {
  // calcula nova posição
  let newX = posX + dx;
  let newY = posY + dy;

  // verifica colisão
  if (!isColliding(newX, newY)) {
    posX = newX;
    posY = newY;
    
    // define direção do sprite
    if(dx > 0) direction = 'right';
    else if(dx < 0) direction = 'left';
    else if(dy < 0) direction = 'back';
    else if(dy > 0) direction = 'front';
  }

  // aplica limites da tela
  posX = Math.max(0, Math.min(posX, window.innerWidth - charWidth));
  posY = Math.max(0, Math.min(posY, window.innerHeight - charHeight));

  // atualiza estilo do personagem
  character.style.left = posX + 'px';
  character.style.top = posY + 'px';
  character.style.backgroundImage = `url('${sprites[direction]}')`;
}

// === Controle por teclado ===
const keys = { ArrowUp:false, ArrowDown:false, ArrowLeft:false, ArrowRight:false };

document.addEventListener('keydown', e => {
  if(keys.hasOwnProperty(e.key)) keys[e.key] = true;
  if(!moving) startMoving();
});

document.addEventListener('keyup', e => {
  if(keys.hasOwnProperty(e.key)) keys[e.key] = false;
});

// loop de movimento contínuo
function startMoving() {
  moving = true;
  moveInterval = setInterval(() => {
    let dx = 0, dy = 0;
    if(keys.ArrowUp) dy -= step;
    if(keys.ArrowDown) dy += step;
    if(keys.ArrowLeft) dx -= step;
    if(keys.ArrowRight) dx += step;

    if(dx !== 0 || dy !== 0) moveCharacter(dx, dy);
    else stopMoving();
  }, 50);
}

function stopMoving() {
  moving = false;
  clearInterval(moveInterval);
}

// === Controle mobile ===
const mobileKeys = { up:false, down:false, left:false, right:false };

document.querySelectorAll('.arrow-buttons button').forEach(btn => {
  const dir = btn.dataset.dir;
  btn.addEventListener('mousedown', () => moveMobile(dir, true));
  btn.addEventListener('mouseup', () => moveMobile(dir, false));
  btn.addEventListener('touchstart', e => { e.preventDefault(); moveMobile(dir, true); });
  btn.addEventListener('touchend', e => { e.preventDefault(); moveMobile(dir, false); });
});

function moveMobile(dir, state) {
  switch(dir) {
    case 'up': mobileKeys.up = state; break;
    case 'down': mobileKeys.down = state; break;
    case 'left': mobileKeys.left = state; break;
    case 'right': mobileKeys.right = state; break;
  }
  if(!moving) startMobileMoving();
}

function startMobileMoving() {
  moving = true;
  moveInterval = setInterval(() => {
    let dx = 0, dy = 0;
    if(mobileKeys.up) dy -= step;
    if(mobileKeys.down) dy += step;
    if(mobileKeys.left) dx -= step;
    if(mobileKeys.right) dx += step;

    if(dx !== 0 || dy !== 0) moveCharacter(dx, dy);
    else stopMoving();
  }, 50);
}

// === Inicializa posição e sprite ===
character.style.left = posX + 'px';
character.style.top = posY + 'px';
character.style.backgroundImage = `url('${sprites[direction]}')`;