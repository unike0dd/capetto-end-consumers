const consumerNameKey="cappeto_consumer_name";
function getConsumerName(){
  const first=sessionStorage.getItem("cappeto_first_name")||"";
  const last=sessionStorage.getItem("cappeto_last_name")||"";
  return [first,last].filter(Boolean).join(" ")||sessionStorage.getItem(consumerNameKey)||sessionStorage.getItem("cappeto_nickname")||"Consumer";
}
function paintConsumer(){
  if(!customerSignedIn())return;
  const name=getConsumerName();
  sessionStorage.setItem(consumerNameKey,name);
  document.getElementById("customerLabel").textContent=name;
  document.getElementById("splashConsumer")?.replaceChildren(document.createTextNode(name));
}
function setPanel(type,open){
  const isSettings=type==="menu";
  if(isSettings&&!customerSignedIn())return;
  const panel=document.getElementById(isSettings?"categoryDrawer":"drawer");
  const button=document.getElementById(isSettings?"menuButton":"bagButton");
  const other=document.getElementById(isSettings?"drawer":"categoryDrawer");
  other.classList.remove("open");
  other.setAttribute("aria-hidden","true");
  document.getElementById(isSettings?"bagButton":"menuButton").setAttribute("aria-expanded","false");
  panel.classList.toggle("open",open);
  panel.setAttribute("aria-hidden",String(!open));
  button.setAttribute("aria-expanded",String(open));
  button.setAttribute("aria-label",open?(isSettings?"Close configuration":window.CappetoI18n.text("bagClose")):(isSettings?"Open configuration":window.CappetoI18n.text("bagOpen")));
  document.getElementById("scrim").classList.toggle("show",open);
  document.body.style.overflow=open?"hidden":"";
  if(open)(isSettings?document.getElementById("closeMenu"):document.getElementById("closeBag")).focus();
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
renderProducts=function(){
  document.getElementById("results").textContent=filtered.length+" "+copy[language].available;
  document.getElementById("grid").innerHTML=filtered.length?filtered.map((p,index)=>{const name=window.CappetoI18n.productName(p);return `<article class="card"><div class="picture"><img src="${esc(p.imageUrl)}" alt="${esc(name)}" loading="${index<2?"eager":"lazy"}" decoding="async" width="900" height="900">${Number.isFinite(p.stock)?`<span class="stock">${p.stock} ${copy[language].available}</span>`:""}</div><div class="card-body">${p.category?`<span class="category">${esc(p.category)}</span>`:""}<h3>${esc(name)}</h3>${p.description?`<p class="description">${esc(p.description)}</p>`:""}<div class="card-bottom"><strong class="price">${money(p.priceCents)}</strong><div class="product-controls"><button data-remove="${esc(p.id)}" type="button" aria-label="${copy[language].removeOne}: ${esc(name)}">−</button><output class="product-quantity" data-qty="${esc(p.id)}" aria-label="${copy[language].quantity}">${bag[p.id]||0}</output><button class="add" data-add="${esc(p.id)}" type="button" aria-label="${copy[language].addOne}: ${esc(name)}">+</button></div></div></div></article>`}).join(""):`<p class="empty">${copy[language].empty}</p>`;
  requestAnimationFrame(updateCarouselButtons);
};
function syncProductQuantities(){document.querySelectorAll("[data-qty]").forEach(el=>el.textContent=bag[el.dataset.qty]||0)}
const originalSaveBag=saveBag;
saveBag=function(){originalSaveBag();syncProductQuantities()};
document.getElementById("grid").addEventListener("click",event=>{
  const remove=event.target.closest("[data-remove]");
  if(remove&&bag[remove.dataset.remove]){
    bag[remove.dataset.remove]--;
    if(bag[remove.dataset.remove]<=0)delete bag[remove.dataset.remove];
    saveBag();
  }
});
function activateChevron(button,direction){
  button.classList.remove("is-clicked");
  void button.offsetWidth;
  button.classList.add("is-clicked");
  moveProduct(direction);
  setTimeout(()=>button.classList.remove("is-clicked"),420);
}
function syncPreferences(){ window.CappetoI18n.render(); }
function fillSettings(){
  if(!customerSignedIn())return;
  const values={
    settingsEmail:sessionStorage.getItem("cappeto_consumer_email")||"",
    alternateEmail:sessionStorage.getItem("cappeto_alternate_email")||"",
    settingsFirstName:sessionStorage.getItem("cappeto_first_name")||"",
    settingsLastName:sessionStorage.getItem("cappeto_last_name")||"",
    settingsAddress:sessionStorage.getItem("cappeto_address")||"",
    settingsZip:sessionStorage.getItem("cappeto_zip")||"",
    settingsPhone:sessionStorage.getItem("cappeto_phone")||"",
    settingsNickname:sessionStorage.getItem("cappeto_nickname")||""
  };
  Object.entries(values).forEach(([id,value])=>document.getElementById(id).value=value);
  document.getElementById("settingsMfa").checked=sessionStorage.getItem("cappeto_mfa_preference")==="true";
  syncPreferences();
}
function saveSettings(event){
  event.preventDefault();
  if(!customerSignedIn())return;
  const mappings={
    settingsEmail:"cappeto_consumer_email",alternateEmail:"cappeto_alternate_email",
    settingsFirstName:"cappeto_first_name",settingsLastName:"cappeto_last_name",
    settingsAddress:"cappeto_address",settingsZip:"cappeto_zip",
    settingsPhone:"cappeto_phone",settingsNickname:"cappeto_nickname"
  };
  Object.entries(mappings).forEach(([id,key])=>{
    const value=document.getElementById(id).value.trim();
    if(value)sessionStorage.setItem(key,value);else sessionStorage.removeItem(key);
  });
  sessionStorage.setItem("cappeto_mfa_preference",String(document.getElementById("settingsMfa").checked));
  const picture=document.getElementById("settingsPicture").files[0];
  if(picture)sessionStorage.setItem("cappeto_picture_name",picture.name);
  const fullName=[document.getElementById("settingsFirstName").value.trim(),document.getElementById("settingsLastName").value.trim()].filter(Boolean).join(" ");
  if(fullName)sessionStorage.setItem(consumerNameKey,fullName);
  paintConsumer();
  toast(language==="es"?"Configuración guardada":"Settings saved");
}
document.getElementById("previousProduct").onclick=event=>activateChevron(event.currentTarget,-1);
document.getElementById("nextProduct").onclick=event=>activateChevron(event.currentTarget,1);
document.getElementById("grid").addEventListener("scroll",updateCarouselButtons,{passive:true});
document.getElementById("grid").addEventListener("keydown",event=>{if(event.key==="ArrowLeft")moveProduct(-1);if(event.key==="ArrowRight")moveProduct(1)});
document.getElementById("menuButton").onclick=()=>{if(customerSignedIn())setPanel("menu",document.getElementById("menuButton").getAttribute("aria-expanded")!=="true")};
document.getElementById("closeMenu").onclick=()=>setPanel("menu",false);
document.getElementById("bagButton").onclick=()=>setPanel("bag",true);
document.getElementById("closeBag").onclick=()=>setPanel("bag",false);
document.getElementById("scrim").onclick=()=>{setPanel("menu",false);setPanel("bag",false)};
document.getElementById("settingsForm").addEventListener("submit",saveSettings);
document.getElementById("removePicture").addEventListener("click",()=>{
  document.getElementById("settingsPicture").value="";
  sessionStorage.removeItem("cappeto_picture_name");
  toast(language==="es"?"Foto eliminada":"Picture removed");
});
document.getElementById("resetPassword").onclick=()=>toast(language==="es"?"Se requiere el servicio seguro de autenticación":"Secure authentication service required");
document.getElementById("updatePassword").onclick=()=>{
  document.getElementById("newPassword").value="";
  toast(language==="es"?"La contraseña no se guarda en este dispositivo":"Password is not stored on this device");
};
document.getElementById("fingerprintButton").onclick=()=>toast(language==="es"?"La biometría requiere autenticación segura":"Biometrics require secure authentication");
document.getElementById("faceprintButton").onclick=()=>toast(language==="es"?"La biometría requiere autenticación segura":"Biometrics require secure authentication");
document.addEventListener("keydown",event=>{if(event.key==="Escape"){setPanel("menu",false);setPanel("bag",false)}});
if(customerSignedIn()){paintConsumer();fillSettings()}else{syncPreferences()}
