(()=>{
  const screen=document.getElementById("splashScreen");
  const grid=document.getElementById("splashGrid");
  const welcome=document.getElementById("splashWelcome");
  const skip=document.getElementById("skipSplash");
  const explore=document.getElementById("exploreSplash");
  if(!screen||!customerSignedIn()||sessionStorage.getItem("cappeto_splash_seen")==="true")return;

  const languageButtons=[...screen.querySelectorAll("[data-splash-language]")];
  const themeButtons=[...screen.querySelectorAll("[data-splash-theme]")];
  const hint=document.getElementById("splashChoiceHint");
  const languageLegend=document.getElementById("splashLanguageLegend");
  const themeLegend=document.getElementById("splashThemeLegend");
  const name=localStorage.getItem("cappeto_consumer_name")||"Consumer";
  document.getElementById("splashConsumer").textContent=name;

  const content={
    en:{thanks:"Thank you for choosing Cappeto,",kicker:"A little joy,",fresh:"MADE FRESH",copy:"Coffee; something sweet, or a satisfying bite—find your favorite and make it yours.",question:"WHAT ARE YOU CRAVING?",menu:"Explore our menu",cta:"Explore the menu",welcome:"Welcome back, ",skip:"Skip welcome",languageLegend:"Choose your language",themeLegend:"Choose your theme",light:"Light",dark:"Dark",hint:"Choose a language and theme to continue.",ready:"Your choices are set. Explore when you’re ready."},
    es:{thanks:"Gracias por elegir Cappeto,",kicker:"Un poco de alegría,",fresh:"RECIÉN PREPARADA",copy:"Café; algo dulce o un bocado delicioso—encuentra tu favorito y hazlo tuyo.",question:"¿QUÉ SE TE ANTOJA?",menu:"Explora nuestro menú",cta:"Explorar el menú",welcome:"Qué gusto verte, ",skip:"Omitir bienvenida",languageLegend:"Elige tu idioma",themeLegend:"Elige tu tema",light:"Claro",dark:"Oscuro",hint:"Elige un idioma y un tema para continuar.",ready:"Tus preferencias están listas. Explora cuando quieras."}
  };

  let selectedLanguage=null;
  let selectedTheme=null;

  function currentCopyLanguage(){
    return selectedLanguage||(localStorage.getItem("cappeto-language")==="es"?"es":"en");
  }

  function translate(){
    const lang=currentCopyLanguage();
    const text=content[lang];
    screen.querySelector(".splash-thanks").textContent=text.thanks;
    screen.querySelector(".splash-kicker").textContent=text.kicker;
    screen.querySelector("h1").textContent=text.fresh;
    screen.querySelector(".splash-copy").textContent=text.copy;
    screen.querySelector("h2").textContent=text.question;
    screen.querySelector(".splash-menu").textContent=text.menu;
    explore.textContent=text.cta;
    screen.querySelector(".splash-greeting").firstChild.textContent=text.welcome;
    skip.textContent=text.skip;
    languageLegend.textContent=text.languageLegend;
    themeLegend.textContent=text.themeLegend;
    screen.querySelector('[data-splash-theme="light"]').textContent=text.light;
    screen.querySelector('[data-splash-theme="dark"]').textContent=text.dark;
    hint.textContent=selectedLanguage&&selectedTheme?text.ready:text.hint;
    document.documentElement.lang=lang;
  }

  function updateContinue(){
    const ready=Boolean(selectedLanguage&&selectedTheme);
    explore.disabled=!ready;
    languageButtons.forEach(button=>button.setAttribute("aria-pressed",String(button.dataset.splashLanguage===selectedLanguage)));
    themeButtons.forEach(button=>button.setAttribute("aria-pressed",String(button.dataset.splashTheme===selectedTheme)));
    translate();
  }

  languageButtons.forEach(button=>button.addEventListener("click",()=>{
    selectedLanguage=button.dataset.splashLanguage;
    language=selectedLanguage;
    localStorage.setItem("cappeto-language",selectedLanguage);
    setLanguage();
    syncPreferences();
    updateContinue();
  }));

  themeButtons.forEach(button=>button.addEventListener("click",()=>{
    selectedTheme=button.dataset.splashTheme;
    setTheme(selectedTheme);
    syncPreferences();
    updateContinue();
  }));

  const columns=matchMedia("(max-width:600px)").matches?8:12;
  const rows=10;
  grid.style.gridTemplateColumns=`repeat(${columns},1fr)`;
  grid.style.gridTemplateRows=`repeat(${rows},1fr)`;
  const fragment=document.createDocumentFragment();
  const tiles=[];
  for(let i=0;i<columns*rows;i++){
    const tile=document.createElement("span");
    tile.className="splash-tile";
    fragment.appendChild(tile);
    tiles.push(tile);
  }
  grid.appendChild(fragment);
  updateContinue();
  screen.hidden=false;
  screen.setAttribute("aria-hidden","false");
  document.body.style.overflow="hidden";

  let finished=false;
  function dismiss(){
    if(finished)return;
    finished=true;
    sessionStorage.setItem("cappeto_splash_seen","true");
    welcome.classList.add("is-fading");
    const reduced=matchMedia("(prefers-reduced-motion:reduce)").matches;
    tiles.forEach((tile,index)=>setTimeout(()=>tile.classList.add("is-dissolving"),reduced?0:((index*47)%680)));
    setTimeout(()=>{
      screen.hidden=true;
      screen.setAttribute("aria-hidden","true");
      document.body.style.overflow="";
      document.getElementById("products")?.scrollIntoView({block:"start"});
    },reduced?50:1250);
  }

  skip.addEventListener("click",dismiss);
  explore.addEventListener("click",()=>{if(!explore.disabled)dismiss()});
})();