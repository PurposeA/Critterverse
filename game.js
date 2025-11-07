const items = ["🍎","🍪","🍭","🍫","🍩","🍓","🍬"];
let inventory = [];

const collectBtn = document.getElementById("collectBtn");
const inventoryList = document.getElementById("inventoryList");
const itemsContainer = document.getElementById("itemsContainer");
const seasonalEffect = document.getElementById("seasonalEffect");
const snowLayers = document.querySelectorAll(".snow-layer");

const winterMusic = document.getElementById("winterMusic");
const windSound = document.getElementById("windSound");
const chimeSound = document.getElementById("chimeSound");

winterMusic.volume = 0.3;
windSound.volume = 0.2;

function displayInventory() { inventoryList.innerHTML = inventory.map(i=>`<li>${i}</li>`).join(''); }

function createItemAnimation(item){
  const itemEl = document.createElement("div"); 
  itemEl.className="item"; 
  itemEl.textContent=item;
  itemsContainer.appendChild(itemEl); 
  setTimeout(()=>itemsContainer.removeChild(itemEl),1500);
}

function triggerWinterEffect(){
  const snow = document.createElement("div"); 
  snow.className="flake"; 
  snow.textContent="❄️";
  snow.style.left=Math.random()*90+"%"; 
  snow.style.fontSize=(Math.random()*24+16)+"px";
  snow.style.animationDuration=(Math.random()*4+3)+"s";
  seasonalEffect.appendChild(snow);
  setTimeout(()=>seasonalEffect.removeChild(snow),5000);
}

function winterBlizzardEffect(){
  for(let i=0;i<50;i++) createWinterConfetti(Math.random()*window.innerWidth,Math.random()*window.innerHeight);
  chimeSound.play();
}

function createWinterConfetti(x,y){
  for(let i=0;i<10;i++){
    const c=document.createElement("div"); c.className="confetti"; c.textContent="❄️";
    c.style.left=x+"px"; c.style.top=y+"px";
    c.style.fontSize=(Math.random()*20+10)+"px"; 
    c.style.animationDuration=(Math.random()*1+0.5)+"s";
    document.body.appendChild(c); setTimeout(()=>document.body.removeChild(c),1000);
  }
}

function addItemToInventory(item){
  inventory.push(item); displayInventory(); createItemAnimation(item); triggerWinterEffect();
  const rect=collectBtn.getBoundingClientRect(); createWinterConfetti(rect.left+rect.width/2,rect.top);

  const inventoryItems=inventoryList.querySelectorAll("li");
  const newItem=inventoryItems[inventoryItems.length-1]; newItem.classList.add("new-item");
  setTimeout(()=>newItem.classList.remove("new-item"),500);

  if(inventory.length % 5 ===0) winterBlizzardEffect();
}

collectBtn.addEventListener("click", (event)=>{
  const randomItem=items[Math.floor(Math.random()*items.length)]; 
  addItemToInventory(randomItem);

  for(let i=0;i<5;i++){
    const offsetX=(Math.random()*20-10), offsetY=(Math.random()*20-10);
    createSwirlTrail(event.clientX+offsetX,event.clientY+offsetY);
  }
});

function createSwirlTrail(x,y){
  const trail=document.createElement("div"); trail.className="trail-flake"; trail.textContent="❄️";
  trail.style.left=x+"px"; trail.style.top=y+"px"; trail.style.fontSize=(Math.random()*15+8)+"px";
  document.body.appendChild(trail); 
  setTimeout(()=>{ if(trail.parentNode) trail.parentNode.removeChild(trail); },2000);
}

function createSnow(layer){
  const flake=document.createElement("div"); flake.className="flake"; flake.textContent="❄️";
  flake.style.left=Math.random()*100+"%";
  flake.style.animationDuration=(Math.random()*5+parseInt(layer.dataset.speed))+"s";
  layer.appendChild(flake);
  setTimeout(()=>layer.removeChild(flake),20000);
}
snowLayers.forEach(layer=>{
  layer.dataset.speed=layer.classList.contains("layer1")?10:layer.classList.contains("layer2")?15:20;
  setInterval(()=>createSnow(layer),200);
});
