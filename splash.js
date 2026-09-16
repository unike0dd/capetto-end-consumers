(()=>{
  const screen=document.getElementById("splashScreen");
  const welcome=document.getElementById("splashWelcome");
  const skip=document.getElementById("skipSplash");
  const explore=document.getElementById("exploreSplash");
  if(!screen||!customerSignedIn()||sessionStorage.getItem("cappeto_splash_seen")==="true"||localStorage.getItem("cappeto_hide_welcome")==="true")return;

  const languageButton=screen.querySelector('[data-splash-language="en"]');
  const themeButton=screen.querySelector('[data-splash-theme="light"]');
  const neverShow=document.getElementById("splashNeverShow");
  const name=localStorage.getItem("cappeto_consumer_name")||"Consumer";
  document.getElementById("splashConsumer").textContent=name;

  const content={
    en:{thanks:"Thank you for visiting Cappeto,",kicker:"A little joy,",fresh:"MADE FRESH",copy:"Coffee, something sweet, or a satisfying bite—find your favorite and enjoy.",question:"WHAT ARE YOU CRAVING?",menu:"Explore our menu",cta:"Explore the menu",welcome:"Welcome back, ",skip:"Skip welcome",never:"Do not show this welcome again"},
    es:{thanks:"Gracias por visitar Cappeto,",kicker:"Un poco de alegría,",fresh:"RECIÉN PREPARADO",copy:"Café, algo dulce o un bocado delicioso—encuentra tu favorito y disfrútalo.",question:"¿QUÉ SE TE ANTOJA?",menu:"Explora nuestro menú",cta:"Explorar el menú",welcome:"Qué gusto verte, ",skip:"Omitir bienvenida",never:"No volver a mostrar esta bienvenida"}
  };

  let selectedLanguage=localStorage.getItem("cappeto-language")==="es"?"es":"en";
  let selectedTheme=document.documentElement.dataset.theme==="dark"?"dark":"light";

  function translate(){
    const text=content[selectedLanguage];
    screen.querySelector(".splash-thanks").textContent=text.thanks;
    screen.querySelector(".splash-kicker").textContent=text.kicker;
    screen.querySelector("h1").textContent=text.fresh;
    screen.querySelector(".splash-copy").textContent=text.copy;
    screen.querySelector("h2").textContent=text.question;
    screen.querySelector(".splash-menu").textContent=text.menu;
    explore.textContent=text.cta;
    screen.querySelector(".splash-greeting").firstChild.textContent=text.welcome;
    skip.textContent=text.skip;
    neverShow.nextElementSibling.textContent=text.never;
    languageButton.textContent=selectedLanguage.toUpperCase();
    themeButton.textContent=selectedTheme==="dark"?(selectedLanguage==="es"?"Oscuro":"Dark"):(selectedLanguage==="es"?"Claro":"Light");
    document.documentElement.lang=selectedLanguage;
  }

  languageButton.addEventListener("click",()=>{
    selectedLanguage=selectedLanguage==="en"?"es":"en";
    language=selectedLanguage;
    localStorage.setItem("cappeto-language",selectedLanguage);
    setLanguage();
    syncPreferences();
    translate();
  });

  themeButton.addEventListener("click",()=>{
    selectedTheme=selectedTheme==="light"?"dark":"light";
    setTheme(selectedTheme);
    syncPreferences();
    translate();
  });

  explore.disabled=false;
  translate();
  screen.hidden=false;
  screen.setAttribute("aria-hidden","false");
  document.body.style.overflow="hidden";
  requestAnimationFrame(()=>explore.focus({preventScroll:true}));

  let finished=false;
  function dismiss(){
    if(finished)return;
    finished=true;
    sessionStorage.setItem("cappeto_splash_seen","true");
    if(neverShow.checked)localStorage.setItem("cappeto_hide_welcome","true");
    welcome.classList.add("is-fading");
    const reduced=matchMedia("(prefers-reduced-motion:reduce)").matches;
    setTimeout(()=>{
      screen.hidden=true;
      screen.setAttribute("aria-hidden","true");
      document.body.style.overflow="";
      document.getElementById("products")?.scrollIntoView({block:"start"});
    },reduced?50:380);
  }

  skip.addEventListener("click",dismiss);
  explore.addEventListener("click",dismiss);
})();