const DEMO_SESSION_KEY="cappeto_consumer_demo_session";
const LEGACY_PRIVATE_KEYS=["cappeto_consumer_email","cappeto_alternate_email","cappeto_first_name","cappeto_last_name","cappeto_address","cappeto_zip","cappeto_phone","cappeto_nickname","cappeto_picture_name","cappeto_mfa_preference","cappeto_consumer_name"];
function purgeLegacyPrivateStorage(){
  for(const key of LEGACY_PRIVATE_KEYS)localStorage.removeItem(key);
}

function customerSignedIn(){return false}
function updateCustomerSession(){
  const active=customerSignedIn(),es=language==="es";
  document.querySelector(".topbar")?.classList.toggle("is-authenticated",active);
  document.getElementById("signInLink")?.classList.toggle("hidden",active);
  document.getElementById("signOut")?.classList.toggle("hidden",!active);
  document.getElementById("publicAuthActions")?.toggleAttribute("hidden",active);
  document.getElementById("publicBrand")?.toggleAttribute("hidden",active);
  document.getElementById("publicLanding")?.toggleAttribute("hidden",active);
  document.getElementById("customerLabel")?.toggleAttribute("hidden",!active);
  document.getElementById("menuButton")?.toggleAttribute("hidden",!active);
  document.getElementById("carouselLabel")?.toggleAttribute("hidden",!active);
  document.getElementById("navProductSearch")?.removeAttribute("hidden");
  document.getElementById("categoryDrawer")?.toggleAttribute("hidden",!active);
  if(active&&!sessionStorage.getItem("cappeto_consumer_name"))document.getElementById("customerLabel").textContent=es?"Consumidor":"Consumer";
  if(!active){
    const drawer=document.getElementById("categoryDrawer");
    drawer?.classList.remove("open");
    drawer?.setAttribute("aria-hidden","true");
    document.getElementById("menuButton")?.setAttribute("aria-expanded","false");
  }
}
const CATALOG_URL="https://unike0dd.github.io/cappeto/data/storefront.json";
const ASSET_BASE="https://unike0dd.github.io/cappeto/";
const fallback=[{"id":"cafe-latte","name":"Café Latte","imageUrl":"assets/products/01-cappeto-cafe-latte.webp","priceCents":375},{"id":"double-espresso","name":"Double Espresso","imageUrl":"assets/products/02-cappeto-double-espresso.webp","priceCents":325},{"id":"iced-cappuccino","name":"Iced Cappuccino","imageUrl":"assets/products/03-cappeto-iced-cappuccino.webp","priceCents":425},{"id":"cafe-mocha","name":"Café Mocha","imageUrl":"assets/products/04-cappeto-cafe-mocha.webp","priceCents":450},{"id":"caramel-macchiato","name":"Caramel Macchiato","imageUrl":"assets/products/05-cappeto-caramel-macchiato.webp","priceCents":475},{"id":"cola-lime","name":"Cola & Lime","imageUrl":"assets/products/06-cappeto-cola-lime.webp","priceCents":250},{"id":"citrus-mint-soda","name":"Citrus Mint Soda","imageUrl":"assets/products/07-cappeto-citrus-mint-soda.webp","priceCents":295},{"id":"berry-rosemary-soda","name":"Berry Rosemary Soda","imageUrl":"assets/products/08-cappeto-berry-rosemary-soda.webp","priceCents":325},{"id":"fresh-orange-juice","name":"Fresh Orange Juice","imageUrl":"assets/products/09-cappeto-fresh-orange-juice.webp","priceCents":350},{"id":"mango-passion-juice","name":"Mango Passion Juice","imageUrl":"assets/products/10-cappeto-mango-passion-juice.webp","priceCents":395},{"id":"strawberry-watermelon-juice","name":"Strawberry Watermelon Juice","imageUrl":"assets/products/11-cappeto-strawberry-watermelon-juice.webp","priceCents":395},{"id":"butter-croissant","name":"Butter Croissant","imageUrl":"assets/products/12-cappeto-butter-croissant.webp","priceCents":295},{"id":"cinnamon-roll","name":"Cinnamon Roll","imageUrl":"assets/products/13-cappeto-cinnamon-roll.webp","priceCents":325},{"id":"banana-walnut-bread","name":"Banana Walnut Bread","imageUrl":"assets/products/14-cappeto-banana-walnut-bread.webp","priceCents":350},{"id":"chicken-avocado-wrap","name":"Chicken Avocado Wrap","imageUrl":"assets/products/15-cappeto-chicken-avocado-wrap.webp","priceCents":695},{"id":"roasted-vegetable-wrap","name":"Roasted Vegetable Wrap","imageUrl":"assets/products/16-cappeto-roasted-vegetable-wrap.webp","priceCents":625},{"id":"chicken-pesto-ciabatta","name":"Chicken Pesto Ciabatta","imageUrl":"assets/products/17-cappeto-chicken-pesto-ciabatta.webp","priceCents":725},{"id":"turkey-avocado-club","name":"Turkey Avocado Club","imageUrl":"assets/products/18-cappeto-turkey-avocado-club.webp","priceCents":750},{"id":"gourmet-cheeseburger","name":"Gourmet Cheeseburger","imageUrl":"assets/products/19-cappeto-gourmet-cheeseburger.webp","priceCents":895},{"id":"gourmet-hot-dog","name":"Gourmet Hot Dog","imageUrl":"assets/products/20-cappeto-gourmet-hot-dog.webp","priceCents":695}];
const copy = new Proxy({}, { get: () => new Proxy({}, { get: (_, key) => window.CappetoI18n.text(key) }) });
let language=window.CappetoI18n.language;
let products=[],filtered=[],bag=JSON.parse(localStorage.getItem("cappeto-bag")||"{}");
const $=s=>document.querySelector(s), money=c=>new Intl.NumberFormat(language==="es"?"es-EC":"en-US",{style:"currency",currency:"USD"}).format(c/100);
const searchAliases={
  "cafe-latte":"coffee cafe latte milk leche café con leche",
  "double-espresso":"coffee cafe espresso expreso double doble strong fuerte",
  "iced-cappuccino":"coffee cafe cappuccino capuchino iced cold frio fría helado",
  "cafe-mocha":"coffee cafe mocha moca chocolate cacao",
  "caramel-macchiato":"coffee cafe caramel caramelo macchiato macchiatto machiato",
  "cola-lime":"cola soda gaseosa refresco lime limon limón",
  "citrus-mint-soda":"soda gaseosa refresco citrus citrico cítrico mint menta hierbabuena",
  "berry-rosemary-soda":"soda gaseosa refresco berry berries frutos rojos rosemary romero",
  "fresh-orange-juice":"juice jugo zumo fresh fresco orange naranja",
  "mango-passion-juice":"juice jugo zumo mango passion maracuya maracuyá parchita",
  "strawberry-watermelon-juice":"juice jugo zumo strawberry fresa frutilla watermelon sandia sandía",
  "butter-croissant":"bakery pastry panaderia panadería butter mantequilla croissant croasan medialuna",
  "cinnamon-roll":"bakery pastry panaderia panadería cinnamon canela roll rollo",
  "banana-walnut-bread":"bakery bread panaderia panadería pan banana platano plátano walnut nuez",
  "chicken-avocado-wrap":"wrap burrito chicken pollo avocado aguacate palta",
  "roasted-vegetable-wrap":"wrap burrito roasted asado vegetable vegetables vegetal vegetales verdura verduras",
  "chicken-pesto-ciabatta":"sandwich bocadillo chicken pollo pesto ciabatta chapata",
  "turkey-avocado-club":"sandwich club turkey pavo avocado aguacate palta",
  "gourmet-cheeseburger":"burger hamburger hamburguesa gourmet cheese queso",
  "gourmet-hot-dog":"hot dog hotdog perro caliente salchicha gourmet"
};
const normalizeSearch=value=>String(value??"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/&/g," and ").replace(/[^a-z0-9]+/g," ").trim().replace(/\s+/g," ");
function editDistance(left,right){
  if(left===right)return 0;
  const previous=Array.from({length:right.length+1},(_,index)=>index);
  for(let row=1;row<=left.length;row++){
    let diagonal=previous[0];
    previous[0]=row;
    for(let column=1;column<=right.length;column++){
      const above=previous[column];
      previous[column]=Math.min(previous[column]+1,previous[column-1]+1,diagonal+(left[row-1]===right[column-1]?0:1));
      diagonal=above;
    }
  }
  return previous[right.length];
}
function looselyMatches(queryToken,candidate){
  if(candidate.includes(queryToken)||queryToken.includes(candidate))return true;
  if(queryToken.length<4||candidate.length<4)return false;
  const tolerance=Math.max(queryToken.length,candidate.length)>=8?2:1;
  return Math.abs(queryToken.length-candidate.length)<=tolerance&&editDistance(queryToken,candidate)<=tolerance;
}
function productMatches(product,query){
  const normalizedQuery=normalizeSearch(query);
  if(!normalizedQuery)return true;
  const searchable=normalizeSearch([product.name,product.category,product.description,searchAliases[product.id]].filter(Boolean).join(" "));
  if(searchable.includes(normalizedQuery))return true;
  const words=searchable.split(" ");
  return normalizedQuery.split(" ").every(token=>words.some(word=>looselyMatches(token,word)));
}
async function loadProducts(){try{const r=await fetch(CATALOG_URL,{cache:"no-store"});if(!r.ok)throw 0;const d=await r.json();products=Array.isArray(d.products)?d.products:fallback}catch{products=fallback}products=products.filter(p=>p&&p.imageUrl&&Number.isFinite(p.priceCents)).map(p=>{
  let candidate;
  try{candidate=p.imageUrl.startsWith("http")?new URL(p.imageUrl,location.href):new URL(ASSET_BASE+p.imageUrl,location.href)}catch{return null}
  if(candidate.protocol!=="https:"||candidate.origin!=="https://unike0dd.github.io")return null;
  return{...p,imageUrl:candidate.href};
}).filter(Boolean);filterProducts();renderBag();updateCustomerSession()}
function filterProducts(){const q=$("#search").value;filtered=products.filter(product=>productMatches(product,q));renderProducts()}
function renderProducts(){$("#results").textContent=`${filtered.length} ${language==="es"?"productos":"products"}`;$("#grid").innerHTML=filtered.length?filtered.map(p=>`<article class="card"><div class="picture"><img src="${p.imageUrl}" alt="${esc(p.name)}" loading="lazy" width="640" height="640"></div><div class="card-body"><h3>${esc(p.name)}</h3><div class="card-bottom"><strong class="price">${money(p.priceCents)}</strong><button class="add" data-add="${esc(p.id)}" type="button">${copy[language].add}</button></div></div></article>`).join(""):`<p class="empty">${copy[language].empty}</p>`}
function add(id){const p=products.find(x=>x.id===id);if(!p)return;bag[id]=Math.min((bag[id]||0)+1,99);saveBag();toast(copy[language].added)}
function saveBag(){localStorage.setItem("cappeto-bag",JSON.stringify(bag));renderBag()}
function clearBag(){
  Object.keys(bag).forEach(id=>delete bag[id]);
  saveBag();
  toast(window.CappetoI18n.text("clearedBag"));
  document.getElementById("clearBag")?.focus();
}
function renderBag(){const rows=Object.entries(bag).map(([id,q])=>[products.find(p=>p.id===id),q]).filter(([p,q])=>p&&q>0);$("#bagCount").textContent=rows.reduce((n,[,q])=>n+q,0);const clearButton=document.getElementById("clearBag");if(clearButton)clearButton.disabled=rows.length===0;$("#bagLines").innerHTML=rows.length?rows.map(([p,q])=>`<div class="bag-line"><img src="${p.imageUrl}" alt=""><div><h3>${esc(p.name)}</h3><div class="quantity"><button data-minus="${esc(p.id)}" aria-label="${copy[language].removeOne}">−</button><span>${q}</span><button data-plus="${esc(p.id)}" aria-label="${copy[language].addOne}">+</button></div></div><b>${money(p.priceCents*q)}</b></div>`).join(""):`<p class="empty">${copy[language].emptyBag}</p>`;const subtotal=rows.reduce((n,[p,q])=>n+p.priceCents*q,0),vat=0,delivery=0;$("#subtotal").textContent=money(subtotal);$("#vat").textContent=money(vat);$("#delivery").textContent=money(delivery);$("#total").textContent=money(subtotal+vat+delivery)}
function setDrawer(open){$("#drawer").classList.toggle("open",open);$("#scrim").classList.toggle("show",open);$("#drawer").setAttribute("aria-hidden",String(!open));if(open)$("#closeBag").focus()}
function setLanguage(){language=window.CappetoI18n.language;window.CappetoI18n.render();filterProducts();renderBag();document.title=window.CappetoI18n.text("titleHome")}
function setTheme(t){window.CappetoI18n.setTheme(t)}
function esc(v){return String(v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
let toastTimer;function toast(msg){$("#toast").textContent=msg;$("#toast").classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>$("#toast").classList.remove("show"),1800)}

$("#grid").addEventListener("click",e=>{const b=e.target.closest("[data-add]");if(b)add(b.dataset.add)});
$("#bagLines").addEventListener("click",e=>{const plus=e.target.closest("[data-plus]"),minus=e.target.closest("[data-minus]");if(plus)add(plus.dataset.plus);if(minus){bag[minus.dataset.minus]--;if(bag[minus.dataset.minus]<=0)delete bag[minus.dataset.minus];saveBag()}});
document.getElementById("search")?.addEventListener("input",filterProducts);
document.getElementById("clearBag")?.addEventListener("click",clearBag);
document.getElementById("signOut").onclick=()=>{
  sessionStorage.removeItem(DEMO_SESSION_KEY);
  sessionStorage.removeItem("cappeto_consumer_email");
  sessionStorage.removeItem("cappeto_consumer_initial");
  sessionStorage.removeItem("cappeto_splash_seen");
  localStorage.removeItem(DEMO_SESSION_KEY);
  location.reload();
};$("#checkout").onclick=()=>toast(copy[language].checkoutMsg);document.addEventListener("keydown",e=>{if(e.key==="Escape")setDrawer(false)});
if(!customerSignedIn())purgeLegacyPrivateStorage();updateCustomerSession();setLanguage();document.addEventListener("cappeto:languagechange",setLanguage);loadProducts();
