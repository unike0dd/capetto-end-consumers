const DEMO_SESSION_KEY = "cappeto_consumer_demo_session";
const i18n = window.CappetoI18n;
const $ = selector => document.querySelector(selector);
const showMessage = key => { $("#message").textContent = i18n.text(key); };

function updateLoginPage() {
  document.title = i18n.text("titleLogin");
  const password = $("#password");
  const visible = password.type === "text";
  $("#showPassword").textContent = i18n.text(visible ? "hide" : "show");
  $("#showPassword").setAttribute("aria-label", i18n.text(visible ? "hidePassword" : "showPassword"));
  if ($("#message").dataset.messageKey) showMessage($("#message").dataset.messageKey);
}
function setMessage(key) {
  $("#message").dataset.messageKey = key;
  showMessage(key);
}

$("#showPassword").addEventListener("click", () => {
  $("#password").type = $("#password").type === "password" ? "text" : "password";
  updateLoginPage();
});
$("#forgot").addEventListener("click", () => setMessage("recovery"));
$("#create").addEventListener("click", () => setMessage("registration"));
$("#googleLogin").addEventListener("click", () => setMessage("provider"));
$("#phoneLogin").addEventListener("click", () => setMessage("provider"));
$("#previewCustomer").addEventListener("click", () => {
  const previewKeys=[DEMO_SESSION_KEY,"cappeto_consumer_email","cappeto_alternate_email","cappeto_first_name","cappeto_last_name","cappeto_address","cappeto_zip","cappeto_phone","cappeto_nickname","cappeto_picture_name","cappeto_mfa_preference","cappeto_consumer_name","cappeto_consumer_initial","cappeto_splash_seen"];
  for(const key of previewKeys){sessionStorage.removeItem(key);} 
  sessionStorage.setItem(DEMO_SESSION_KEY, "preview");
  sessionStorage.setItem("cappeto_consumer_name", i18n.text("previewCustomerName"));
  location.href = "./";
});
$("#loginCard").addEventListener("submit", event => {
  event.preventDefault();
  $("#email").value = "";
  $("#password").value = "";
  setMessage("unavailable");
});
document.addEventListener("cappeto:languagechange", updateLoginPage);
updateLoginPage();
if (location.hash === "#register") { setMessage("registration"); $("#create").focus(); }
