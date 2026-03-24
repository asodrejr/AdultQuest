let money = 100;
let energy = 100;
let stress = 0;
let health = 100;
let relationships = 50;
let xp = 0;

function updateHUD() {
  document.getElementById('money').innerText = `Dinheiro: ${money}`;
  document.getElementById('energy').innerText = `Energia: ${energy}`;
  document.getElementById('stress').innerText = `Estresse: ${stress}`;
  document.getElementById('health').innerText = `Saúde: ${health}`;
  document.getElementById('relationships').innerText = `Relacionamentos: ${relationships}`;
  document.getElementById('xp').innerText = `XP: ${xp}`;
}

function work() {
  money += 20;
  energy -= 10;
  stress += 5;
  xp += 5;
  updateHUD();
}

function rest() {
  energy += 20;
  stress -= 10;
  health += 10;
  updateHUD();
}

function social() {
  relationships += 10;
  energy -= 5;
  stress -= 5;
  xp += 2;
  updateHUD();
}