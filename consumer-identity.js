document.getElementById("loginCard")?.addEventListener("submit",()=>{
  const email=document.getElementById("email")?.value.trim().toLowerCase();
  if(!email)return;
  sessionStorage.setItem("cappeto_consumer_email",email);
  if(document.getElementById("remember")?.checked)localStorage.setItem("cappeto_consumer_email",email);
});
