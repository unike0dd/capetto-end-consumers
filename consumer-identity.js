document.getElementById("loginCard")?.addEventListener("submit",()=>{
  const email=document.getElementById("email")?.value.trim().toLowerCase();
  if(!email)return;
  sessionStorage.removeItem("cappeto_splash_seen");
  sessionStorage.setItem("cappeto_consumer_email",email);
  sessionStorage.setItem("cappeto_consumer_initial",(email.charAt(0)||"C").toUpperCase());
  if(document.getElementById("remember")?.checked)localStorage.setItem("cappeto_consumer_email",email);
  if(document.getElementById("remember")?.checked)localStorage.setItem("cappeto_consumer_initial",(email.charAt(0)||"C").toUpperCase());
});
