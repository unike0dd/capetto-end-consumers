const messages={
  en:{skip:"Skip to sign in",eyebrow:"WELCOME BACK",welcome:"Your Cappeto favorites are waiting.",welcomeCopy:"Sign in to review your bag, personal settings, and customer experience.",account:"CUSTOMER ACCOUNT",signIn:"Sign in",instruction:"Enter the email and password connected to your account.",email:"Email address",password:"Password",show:"Show",hide:"Hide",forgot:"Forgot password?",sessionOnly:"For your protection, sign-in lasts for this browser session only.",continue:"Continue",continueWith:"CONTINUE WITH",google:"Google",phone:"Phone Number",create:"Create a customer account",noAccount:"Just browsing?",menu:"Continue to the menu",back:"Back to menu",required:"Enter a valid email and a password of at least 8 characters.",recovery:"Password recovery requires the secure customer identity service.",registration:"Account creation requires the secure customer identity service.",provider:"This sign-in provider requires the secure identity backend connection.",signedIn:"Sign-in successful. Opening your customer storefront…",invalid:"Sign-in was unsuccessful. Check your information and try again.",limited:"Too many attempts. Wait 30 seconds and try again.",dark:"Switch to dark mode",light:"Switch to light mode"},
  es:{skip:"Ir al inicio de sesión",eyebrow:"QUÉ GUSTO VERTE",welcome:"Tus favoritos de Cappeto te esperan.",welcomeCopy:"Inicia sesión para revisar tu bolsa, configuración personal y experiencia de cliente.",account:"CUENTA DEL CLIENTE",signIn:"Iniciar sesión",instruction:"Ingresa el correo y la contraseña conectados a tu cuenta.",email:"Correo electrónico",password:"Contraseña",show:"Mostrar",hide:"Ocultar",forgot:"¿Olvidaste tu contraseña?",sessionOnly:"Para tu protección, el acceso dura solo durante esta sesión del navegador.",continue:"Continuar",continueWith:"CONTINUAR CON",google:"Google",phone:"Número Telefónico",create:"Crear una cuenta de cliente",noAccount:"¿Solo estás mirando?",menu:"Continuar al menú",back:"Volver al menú",required:"Ingresa un correo válido y una contraseña de al menos 8 caracteres.",recovery:"La recuperación requiere el servicio seguro de identidad del cliente.",registration:"La creación de cuentas requiere el servicio seguro de identidad del cliente.",provider:"Este proveedor requiere la conexión segura al servicio de identidad.",signedIn:"Inicio de sesión correcto. Abriendo tu tienda…",invalid:"No se pudo iniciar sesión. Revisa la información e inténtalo nuevamente.",limited:"Demasiados intentos. Espera 30 segundos e inténtalo nuevamente.",dark:"Cambiar a modo oscuro",light:"Cambiar a modo claro"}
};
let lang=localStorage.getItem("cappeto-language")==="es"?"es":"en";
const $=selector=>document.querySelector(selector),t=key=>messages[lang][key];
function translate(){
  document.documentElement.lang=lang;
  document.title=lang==="es"?"Cappeto · Iniciar sesión":"Cappeto · Customer sign in";
  document.querySelectorAll("[data-i18n]").forEach(element=>element.textContent=t(element.dataset.i18n));
  $("#language").textContent=lang.toUpperCase();
  $("#language").setAttribute("aria-pressed",String(lang==="es"));
  $("#language").setAttribute("aria-label",lang==="en"?"Cambiar a español":"Switch to English");
  $("#theme").setAttribute("aria-label",t(document.documentElement.dataset.theme==="dark"?"light":"dark"));
  $("#email").placeholder=lang==="es"?"tu@ejemplo.com":"you@example.com";
  $("#password").placeholder=lang==="es"?"Ingresa tu contraseña":"Enter your password";
  $("#showPassword").textContent=t($("#password").type==="password"?"show":"hide");
}
function setTheme(theme){
  document.documentElement.dataset.theme=theme;
  $("#theme").textContent=theme==="dark"?"Light":"Dark";
  $("#theme").setAttribute("aria-pressed",String(theme==="dark"));
  $("#theme").setAttribute("aria-label",t(theme==="dark"?"light":"dark"));
  document.querySelector('meta[name="theme-color"]').content=theme==="dark"?"#101812":"#f7f4eb";
  localStorage.setItem("cappeto-theme",theme);
}
$("#language").onclick=()=>{lang=lang==="en"?"es":"en";localStorage.setItem("cappeto-language",lang);translate()};
$("#theme").onclick=()=>setTheme(document.documentElement.dataset.theme==="dark"?"light":"dark");
$("#showPassword").onclick=()=>{
  const password=$("#password");
  password.type=password.type==="password"?"text":"password";
  $("#showPassword").textContent=t(password.type==="password"?"show":"hide");
  password.focus();
};
async function sha256(value){
  const bytes=new TextEncoder().encode(value);
  const hash=await crypto.subtle.digest("SHA-256",bytes);
  return[...new Uint8Array(hash)].map(byte=>byte.toString(16).padStart(2,"0")).join("");
}
function providerUnavailable(){$("#message").textContent=t("provider")}
$("#forgot").onclick=()=>$("#message").textContent=t("recovery");
$("#create").onclick=()=>$("#message").textContent=t("registration");
$("#googleLogin").onclick=providerUnavailable;
$("#phoneLogin").onclick=providerUnavailable;
$("#loginCard").onsubmit=async event=>{
  event.preventDefault();
  const email=$("#email"),password=$("#password");
  const blockedUntil=Number(sessionStorage.getItem("cappeto_login_blocked_until")||0);
  if(Date.now()<blockedUntil){$("#message").textContent=t("limited");return}
  if(!email.validity.valid||password.value.length<8){
    $("#message").textContent=t("required");
    (email.validity.valid?password:email).focus();
    return;
  }
  const validEmail=email.value.trim().toLowerCase()==="consumer@cappeto.demo";
  const validPassword=await sha256(password.value)==="324196a29ba79e8876c038b3e8495b78059e8382dc7977fe88a1c99aa938e421";
  if(!validEmail||!validPassword){
    const failures=Number(sessionStorage.getItem("cappeto_login_failures")||0)+1;
    sessionStorage.setItem("cappeto_login_failures",String(failures));
    if(failures>=5){
      sessionStorage.setItem("cappeto_login_blocked_until",String(Date.now()+30000));
      sessionStorage.removeItem("cappeto_login_failures");
      $("#message").textContent=t("limited");
    }else $("#message").textContent=t("invalid");
    password.value="";
    password.focus();
    return;
  }
  sessionStorage.removeItem("cappeto_login_failures");
  sessionStorage.removeItem("cappeto_login_blocked_until");
  sessionStorage.removeItem("cappeto_splash_seen");
  sessionStorage.setItem("cappeto_consumer_email",email.value.trim().toLowerCase());
  sessionStorage.setItem("cappeto_consumer_initial",(email.value.trim().charAt(0)||"C").toUpperCase());
  sessionStorage.setItem("cappeto_consumer_demo_session","active");
  password.value="";
  $("#message").textContent=t("signedIn");
  setTimeout(()=>location.href="./",550);
};
setTheme(localStorage.getItem("cappeto-theme")||(matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light"));
translate();
if(location.hash==="#register"){$("#message").textContent=t("registration");$("#create").focus()}
