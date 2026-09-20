const messages={
  en:{skip:"Skip to sign in",eyebrow:"WELCOME BACK",welcome:"Your Cappeto favorites are waiting.",welcomeCopy:"Sign in will be enabled when the trusted customer identity service is connected.",account:"CUSTOMER ACCOUNT",signIn:"Sign in",instruction:"Secure account access is not active in this static preview.",email:"Email address",password:"Password",show:"Show",hide:"Hide",forgot:"Forgot password?",sessionOnly:"No password is processed or stored by this preview.",continue:"Continue",continueWith:"CONTINUE WITH",google:"Google",phone:"Phone Number",create:"Create a customer account",noAccount:"Just browsing?",menu:"Continue to the menu",back:"Back to menu",required:"Secure sign-in is not available in the static preview.",recovery:"Password recovery requires the trusted customer identity service.",registration:"Account creation requires the trusted customer identity service.",provider:"This sign-in provider requires the trusted identity service.",unavailable:"Sign-in is disabled until the trusted identity service is connected.",dark:"Switch to dark mode",light:"Switch to light mode"},
  es:{skip:"Ir al inicio de sesión",eyebrow:"QUÉ GUSTO VERTE",welcome:"Tus favoritos de Cappeto te esperan.",welcomeCopy:"El acceso se habilitará cuando se conecte el servicio confiable de identidad.",account:"CUENTA DEL CLIENTE",signIn:"Iniciar sesión",instruction:"El acceso seguro no está activo en esta vista previa.",email:"Correo electrónico",password:"Contraseña",show:"Mostrar",hide:"Ocultar",forgot:"¿Olvidaste tu contraseña?",sessionOnly:"Esta vista previa no procesa ni guarda contraseñas.",continue:"Continuar",continueWith:"CONTINUAR CON",google:"Google",phone:"Número Telefónico",create:"Crear una cuenta de cliente",noAccount:"¿Solo estás mirando?",menu:"Continuar al menú",back:"Volver al menú",required:"El acceso seguro no está disponible en la vista previa.",recovery:"La recuperación requiere el servicio confiable de identidad.",registration:"La creación de cuentas requiere el servicio confiable de identidad.",provider:"Este proveedor requiere el servicio confiable de identidad.",unavailable:"El acceso está deshabilitado hasta conectar el servicio confiable de identidad.",dark:"Cambiar a modo oscuro",light:"Cambiar a modo claro"}
};
let lang=localStorage.getItem("cappeto-language")==="es"?"es":"en";
const $=selector=>document.querySelector(selector),t=key=>messages[lang][key];
function translate(){
  document.documentElement.lang=lang;
  document.title=lang==="es"?"Cappeto · Acceso no disponible":"Cappeto · Sign in unavailable";
  document.querySelectorAll("[data-i18n]").forEach(element=>element.textContent=t(element.dataset.i18n));
  $("#language").textContent=lang.toUpperCase();
  $("#language").setAttribute("aria-pressed",String(lang==="es"));
  $("#language").setAttribute("aria-label",lang==="en"?"Cambiar a español":"Switch to English");
  $("#theme").setAttribute("aria-label",t(document.documentElement.dataset.theme==="dark"?"light":"dark"));
  $("#email").placeholder=lang==="es"?"No disponible":"Unavailable";
  $("#password").placeholder=lang==="es"?"No disponible":"Unavailable";
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
$("#showPassword").onclick=()=>$("#message").textContent=t("unavailable");
const unavailable=()=>$("#message").textContent=t("unavailable");
$("#forgot").onclick=()=>$("#message").textContent=t("recovery");
$("#create").onclick=()=>$("#message").textContent=t("registration");
$("#googleLogin").onclick=unavailable;
$("#phoneLogin").onclick=unavailable;
$("#loginCard").onsubmit=event=>{
  event.preventDefault();
  $("#email").value="";
  $("#password").value="";
  unavailable();
};
setTheme(localStorage.getItem("cappeto-theme")||(matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light"));
translate();
if(location.hash==="#register"){$("#message").textContent=t("registration");$("#create").focus()}
