const DEMO_SESSION_KEY="cappeto_consumer_demo_session";
function customerSignedIn(){return sessionStorage.getItem(DEMO_SESSION_KEY)==="active"}
function updateCustomerSession(){
  const active=customerSignedIn(),es=language==="es";
  document.getElementById("signInLink")?.classList.toggle("hidden",active);
  document.getElementById("signOut")?.classList.toggle("hidden",!active);
  document.getElementById("publicAuthActions")?.toggleAttribute("hidden",active);
  document.getElementById("publicBrand")?.toggleAttribute("hidden",active);
  document.getElementById("publicLanding")?.toggleAttribute("hidden",active);
  document.getElementById("customerLabel")?.toggleAttribute("hidden",!active);
  document.getElementById("menuButton")?.toggleAttribute("hidden",!active);
  document.getElementById("categoryDrawer")?.toggleAttribute("hidden",!active);
  if(active&&!localStorage.getItem("cappeto_consumer_name"))document.getElementById("customerLabel").textContent=es?"Consumidor":"Consumer";
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
const copy={en:{eyebrow:"YOUR NEIGHBORHOOD CAFÉ",heroTitle:'A little joy,<br><strong>MADE FRESH</strong>',heroCopy:"Coffee; something sweet, or a satisfying bite—find your favorite and make it yours.",browse:"Browse the menu",fresh:"Fresh today",menuEyebrow:"WHAT ARE YOU CRAVING?",menuTitle:"Explore our menu",yourOrder:"YOUR ORDER",bagTitle:"Your bag",subtotal:"Subtotal",vat:"VAT",total:"Total",checkout:"Continue to checkout",footer:"Freshly prepared café favorites.",all:"All",available:"available",add:"Add",empty:"No products match your search.",added:"Added to your bag",emptyBag:"Your bag is ready for something delicious.",checkoutMsg:"Checkout connection is the next step."},es:{eyebrow:"TU CAFÉ DE CONFIANZA",heroTitle:'Un poco de alegría,<br><strong>RECIÉN PREPARADA</strong>',heroCopy:"Café, algo dulce o un bocado delicioso: encuentra tu favorito y hazlo tuyo.",browse:"Explorar el menú",fresh:"Fresco hoy",menuEyebrow:"¿QUÉ SE TE ANTOJA?",menuTitle:"Explora nuestro menú",yourOrder:"TU PEDIDO",bagTitle:"Tu bolsa",subtotal:"Subtotal",vat:"IVA",total:"Total",checkout:"Continuar al pago",footer:"Favoritos de cafetería recién preparados.",all:"Todos",available:"disponibles",add:"Agregar",empty:"Ningún producto coincide con tu búsqueda.",added:"Agregado a tu bolsa",emptyBag:"Tu bolsa está lista para algo delicioso.",checkoutMsg:"La conexión de pago es el siguiente paso."}};
let products=[],filtered=[],language=localStorage.getItem("cappeto-language")||"en",bag=JSON.parse(localStorage.getItem("cappeto-bag")||"{}");
const $=s=>document.querySelector(s), money=c=>new Intl.NumberFormat(language==="es"?"es-EC":"en-US",{style:"currency",currency:"USD"}).format(c/100);
async function loadProducts(){try{const r=await fetch(CATALOG_URL,{cache:"no-store"});if(!r.ok)throw 0;const d=await r.json();products=Array.isArray(d.products)?d.products:fallback}catch{products=fallback}products=products.filter(p=>p&&p.imageUrl&&Number.isFinite(p.priceCents)).map(p=>({...p,imageUrl:p.imageUrl.startsWith("http")?p.imageUrl:ASSET_BASE+p.imageUrl}));renderFilters();filterProducts();renderBag();updateCustomerSession()}
function renderFilters(){const filters=$("#filters");if(filters)filters.innerHTML=`<button class="filter active" aria-pressed="true">${copy[language].all}</button>`}
function filterProducts(){const q=$("#search").value.trim().toLowerCase();filtered=products.filter(p=>p.name.toLowerCase().includes(q));renderProducts()}
function renderProducts(){$("#results").textContent=`${filtered.length} ${language==="es"?"productos":"products"}`;$("#grid").innerHTML=filtered.length?filtered.map(p=>`<article class="card"><div class="picture"><img src="${p.imageUrl}" alt="${esc(p.name)}" loading="lazy" width="640" height="640"></div><div class="card-body"><h3>${esc(p.name)}</h3><div class="card-bottom"><strong class="price">${money(p.priceCents)}</strong><button class="add" data-add="${esc(p.id)}" type="button">${copy[language].add}</button></div></div></article>`).join(""):`<p class="empty">${copy[language].empty}</p>`}
function add(id){const p=products.find(x=>x.id===id);if(!p)return;bag[id]=Math.min((bag[id]||0)+1,99);saveBag();toast(copy[language].added)}
function saveBag(){localStorage.setItem("cappeto-bag",JSON.stringify(bag));renderBag()}
function renderBag(){const rows=Object.entries(bag).map(([id,q])=>[products.find(p=>p.id===id),q]).filter(([p,q])=>p&&q>0);$("#bagCount").textContent=rows.reduce((n,[,q])=>n+q,0);$("#bagLines").innerHTML=rows.length?rows.map(([p,q])=>`<div class="bag-line"><img src="${p.imageUrl}" alt=""><div><h3>${esc(p.name)}</h3><div class="quantity"><button data-minus="${esc(p.id)}" aria-label="Remove one">−</button><span>${q}</span><button data-plus="${esc(p.id)}" aria-label="Add one">+</button></div></div><b>${money(p.priceCents*q)}</b></div>`).join(""):`<p class="empty">${copy[language].emptyBag}</p>`;const total=rows.reduce((n,[p,q])=>n+p.priceCents*q,0);$("#subtotal").textContent=money(total);$("#total").textContent=money(total)}
function setDrawer(open){$("#drawer").classList.toggle("open",open);$("#scrim").classList.toggle("show",open);$("#drawer").setAttribute("aria-hidden",String(!open));if(open)$("#closeBag").focus()}
function setLanguage(){document.documentElement.lang=language;document.querySelectorAll("[data-copy]").forEach(el=>el.innerHTML=copy[language][el.dataset.copy]);renderFilters();filterProducts();renderBag()}
function setTheme(t){document.documentElement.dataset.theme=t;localStorage.setItem("cappeto-theme",t)}
function esc(v){return String(v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
let toastTimer;function toast(msg){$("#toast").textContent=msg;$("#toast").classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>$("#toast").classList.remove("show"),1800)}

$("#grid").addEventListener("click",e=>{const b=e.target.closest("[data-add]");if(b)add(b.dataset.add)});
$("#bagLines").addEventListener("click",e=>{const plus=e.target.closest("[data-plus]"),minus=e.target.closest("[data-minus]");if(plus)add(plus.dataset.plus);if(minus){bag[minus.dataset.minus]--;if(bag[minus.dataset.minus]<=0)delete bag[minus.dataset.minus];saveBag()}});
document.getElementById("search")?.addEventListener("input",filterProducts);
document.getElementById("signOut").onclick=()=>{
  sessionStorage.removeItem(DEMO_SESSION_KEY);
  sessionStorage.removeItem("cappeto_consumer_email");
  sessionStorage.removeItem("cappeto_consumer_initial");
  sessionStorage.removeItem("cappeto_splash_seen");
  localStorage.removeItem(DEMO_SESSION_KEY);
  location.reload();
};$("#bagButton").onclick=()=>setDrawer(true);$("#closeBag").onclick=()=>setDrawer(false);$("#scrim").onclick=()=>setDrawer(false);$("#checkout").onclick=()=>toast(copy[language].checkoutMsg);document.addEventListener("keydown",e=>{if(e.key==="Escape")setDrawer(false)});
updateCustomerSession();setTheme(localStorage.getItem("cappeto-theme")|| (matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light"));setLanguage();loadProducts();
