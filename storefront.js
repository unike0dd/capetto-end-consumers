const consumerEmail=localStorage.getItem("cappeto_consumer_email")||sessionStorage.getItem("cappeto_consumer_email")||"consumer@cappeto.demo";
const consumerNameKey="cappeto_consumer_name";
const avatarOnlyKey="cappeto_consumer_avatar_only";
function paintConsumer(){
  const name=localStorage.getItem(consumerNameKey)||"Consumer";
  const initial=(consumerEmail.trim().charAt(0)||"C").toUpperCase();
  document.getElementById("consumerAvatar").textContent=initial;
  document.getElementById("consumerEmail").textContent=consumerEmail;
  document.getElementById("consumerName").value=localStorage.getItem(consumerNameKey)||"";
  document.getElementById("customerLabel").textContent=name;
  document.getElementById("customerLabel").hidden=localStorage.getItem(avatarOnlyKey)==="true";
}
function setPanel(type,open){
  const isMenu=type==="menu",panel=document.getElementById(isMenu?"categoryDrawer":"drawer"),button=document.getElementById(isMenu?"menuButton":"bagButton");
  const other=document.getElementById(isMenu?"drawer":"categoryDrawer");
  other.classList.remove("open");other.setAttribute("aria-hidden","true");
  document.getElementById(isMenu?"bagButton":"menuButton").setAttribute("aria-expanded","false");
  panel.classList.toggle("open",open);panel.setAttribute("aria-hidden",String(!open));button.setAttribute("aria-expanded",String(open));
  document.getElementById("scrim").classList.toggle("show",open);
  document.body.style.overflow=open?"hidden":"";
  if(open)panel.querySelector("button")?.focus();
}
function moveProduct(direction){
  const grid=document.getElementById("grid"),card=grid.querySelector(".card");
  if(!card)return;
  grid.scrollBy({left:direction*(card.getBoundingClientRect().width+parseFloat(getComputedStyle(grid).gap||0)),behavior:"smooth"});
}
function updateCarouselButtons(){
  const grid=document.getElementById("grid");
  document.getElementById("previousProduct").disabled=grid.scrollLeft<8;
  document.getElementById("nextProduct").disabled=grid.scrollLeft+grid.clientWidth>=grid.scrollWidth-8;
}
const originalRenderProducts=renderProducts;
renderProducts=function(){
  document.getElementById("results").textContent=filtered.length+" "+copy[language].available;
  document.getElementById("grid").innerHTML=filtered.length?filtered.map((p,index)=>`<article class="card"><div class="picture"><img src="${p.imageUrl}" alt="${esc(p.name)}" loading="${index<2?"eager":"lazy"}" decoding="async" width="900" height="900"><span class="stock">${p.stock} ${copy[language].available}</span></div><div class="card-body"><span class="category">${esc(p.category)}</span><h3>${esc(p.name)}</h3><p class="description">${esc(p.description)}</p><div class="card-bottom"><strong class="price">${money(p.priceCents)}</strong><div class="product-controls"><button data-remove="${esc(p.id)}" type="button" aria-label="Remove ${esc(p.name)}">−</button><button class="add" data-add="${esc(p.id)}" type="button">+${copy[language].add}</button></div></div></div></article>`).join(""):`<p class="empty">${copy[language].empty}</p>`;
  requestAnimationFrame(updateCarouselButtons);
};
document.getElementById("grid").addEventListener("click",event=>{const remove=event.target.closest("[data-remove]");if(remove&&bag[remove.dataset.remove]){bag[remove.dataset.remove]--;if(bag[remove.dataset.remove]<=0)delete bag[remove.dataset.remove];saveBag()}});
document.getElementById("previousProduct").onclick=()=>moveProduct(-1);
document.getElementById("nextProduct").onclick=()=>moveProduct(1);
document.getElementById("grid").addEventListener("scroll",updateCarouselButtons,{passive:true});
document.getElementById("grid").addEventListener("keydown",event=>{if(event.key==="ArrowLeft")moveProduct(-1);if(event.key==="ArrowRight")moveProduct(1)});
document.getElementById("menuButton").onclick=()=>setPanel("menu",true);
document.getElementById("closeMenu").onclick=()=>setPanel("menu",false);
document.getElementById("bagButton").onclick=()=>setPanel("bag",true);
document.getElementById("closeBag").onclick=()=>setPanel("bag",false);
document.getElementById("scrim").onclick=()=>{setPanel("menu",false);setPanel("bag",false)};
document.getElementById("filters").addEventListener("click",event=>{if(event.target.closest("[data-category]"))setPanel("menu",false)});
document.getElementById("consumerButton").onclick=()=>{const pop=document.getElementById("consumerPopover"),open=pop.hidden;pop.hidden=!open;document.getElementById("consumerButton").setAttribute("aria-expanded",String(open));if(open)document.getElementById("consumerName").focus()};
document.getElementById("saveConsumer").onclick=()=>{const value=document.getElementById("consumerName").value.trim();if(value)localStorage.setItem(consumerNameKey,value);else localStorage.removeItem(consumerNameKey);localStorage.setItem(avatarOnlyKey,"false");document.getElementById("consumerPopover").hidden=true;paintConsumer()};
document.getElementById("useInitial").onclick=()=>{localStorage.setItem(avatarOnlyKey,"true");document.getElementById("consumerPopover").hidden=true;paintConsumer()};
document.addEventListener("click",event=>{const pop=document.getElementById("consumerPopover");if(!pop.hidden&&!event.target.closest("#consumerPopover")&&!event.target.closest("#consumerButton")){pop.hidden=true;document.getElementById("consumerButton").setAttribute("aria-expanded","false")}});
document.addEventListener("keydown",event=>{if(event.key==="Escape"){setPanel("menu",false);setPanel("bag",false);document.getElementById("consumerPopover").hidden=true}});
paintConsumer();
