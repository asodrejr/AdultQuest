const character = document.getElementById('character');

// posição inicial no centro
let posX = window.innerWidth / 2 - 32;
let posY = window.innerHeight / 2 - 32;

// tamanho e passo
const step = 10;
const charWidth = 64;
const charHeight = 64;

// sprites
const sprites = {
  front: 'assets/sprites/player_front.png',
  back:  'assets/sprites/player_back.png',
  left:  'assets/sprites/player_left.png',
  right: 'assets/sprites/player_right.png'
};

// direção e movimento
let direction = 'front';
let moving = false;
let moveInterval = null;

// move e atualiza sprite
function moveCharacter(dx, dy) {
  if(dx > 0) direction = 'right';
  else if(dx < 0) direction = 'left';
  else if(dy < 0) direction = 'back';
  else if(dy > 0) direction = 'front';

  posX += dx;
  posY += dy;

  // limites
  posX = Math.max(0, Math.min(posX, window.innerWidth - charWidth));
  posY = Math.max(0, Math.min(posY, window.innerHeight - charHeight));

  character.style.left = posX + 'px';
  character.style.top = posY + 'px';
  character.style.backgroundImage = `url('${sprites[direction]}')`;
}

// teclado
const keys = { ArrowUp:false, ArrowDown:false, ArrowLeft:false, ArrowRight:false };

document.addEventListener('keydown', e => {
  if(keys.hasOwnProperty(e.key)) keys[e.key] = true;
  if(!moving) startMoving();
});
document.addEventListener('keyup', e => {
  if(keys.hasOwnProperty(e.key)) keys[e.key] = false;
});

// loop de movimento
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

// mobile
const mobileKeys = { up:false, down:false, left:false, right:false };
document.querySelectorAll('.arrow-buttons button').forEach(btn => {
  const dir = btn.dataset.dir;
  btn.addEventListener('mousedown', () => moveMobile(dir, true));
  btn.addEventListener('mouseup', () => moveMobile(dir, false));
  btn.addEventListener('touchstart', e => { e.preventDefault(); moveMobile(dir, true); });
  btn.addEventListener('touchend', e => { e.preventDefault(); moveMobile(dir, false); });
});

function moveMobile(dir, state) {
  mobileKeys[dir] = state;
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

// inicializa
character.style.left = posX + 'px';
character.style.top = posY + 'px';
character.style.backgroundImage = `url('${sprites[direction]}')`;