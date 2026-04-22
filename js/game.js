// Objeto central de atributos
let player = null;

// Atualiza HUD
function updateHUD() {
  if(!player) return;

  document.getElementById('attr_body').innerText = player.attr_body;
  document.getElementById('attr_mind').innerText = player.attr_mind;
  document.getElementById('attr_emotions').innerText = player.attr_emotions;
  document.getElementById('attr_social').innerText = player.attr_social;
  document.getElementById('xp').innerText = player.xp;
  document.getElementById('points').innerText = player.points;
}

// Altera atributo
function changeAttr(attr, delta) {
  if(!player) return;

  if (player.points <= 0 && delta > 0) return;

  player[attr] += delta;

  // Ajusta pontos
  if (delta > 0) player.points--;
  if (delta < 0) player.points++;

  updateHUD();
}

//CHAMANDO O BANCO
async function loadPalyerData(){

  const {data: {user}, error: userError} = await window.supabasaClient.auth.getUser();

  if(userError || !user){
    alert("Usuário não autentificado.");
    window.location.href = "index.html";
    return;
  }

  const {data, error} = await window.supabasaClient
  .from('public.player_character_attributes')
  .select('*')
  .eq('profile_id', user.id)
  .single();// para somente um personagem então se formos ter equipe isso pode será no futuro

  if(error){
    console.error("Erro ao carregar personagem:", error);
    alert("|Personagem não encontrado.");
    return;
  }

  player = data;
  updateHUD();

}

// Inicializa
loadPalyerData();