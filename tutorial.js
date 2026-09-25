(() => {
  "use strict";
  const KEY = "cappeto_consumer_tutorial_seen_v2";
  const i18n = window.CappetoI18n;
  const steps = [
    { target: ".header-fabs", title: ["Your dashboard controls", "Los controles de tu panel"], body: ["Across the top: the magnifying glass searches, EN changes language, Light changes appearance, the bag holds your items, and the gear opens your settings. We will try each control.", "En la barra superior: la lupa busca, EN cambia el idioma, Claro cambia la apariencia, la bolsa guarda tus artículos y el engranaje abre la configuración. Vamos a conocer cada control."] },
    { target: "#searchToggle", icon: "#searchToggle", title: ["The search button", "El botón de búsqueda"], body: ["The magnifying glass opens search. Enter a product or seller name. The final screen begins empty so you can tell us what you are looking for.", "La lupa abre la búsqueda. Escribe un producto o vendedor. La pantalla final comienza vacía para que nos digas qué estás buscando."] },
    { target: "#headerLanguage", icon: "#headerLanguage", title: ["The language button", "El botón de idioma"], body: ["EN switches the dashboard to Spanish. Select it now or Continue to see ES. You can switch back at any time.", "EN cambia el panel a español. Selecciónalo ahora o pulsa Continuar para ver ES. Puedes volver a inglés cuando quieras."], action: () => { if (i18n.language !== "es") i18n.setLanguage("es"); } },
    { target: "#headerTheme", icon: "#headerTheme", title: ["The appearance button", "El botón de apariencia"], body: ["Light switches the background to Dark. Select it now or Continue to try it. Your choice stays on this device.", "Claro cambia el fondo a Oscuro. Selecciónalo ahora o pulsa Continuar para probarlo. La preferencia permanece en este dispositivo."], action: () => { if (i18n.theme !== "dark") i18n.setTheme("dark"); } },
    { target: "#bagButton", icon: "#bagButton", title: ["The shopping bag", "La bolsa de compras"], body: ["This bag holds the items you select. Its number shows how many you have added. We will open the order panel after the icon introductions.", "Esta bolsa guarda los artículos que seleccionas. El número indica cuántos agregaste. Abriremos el panel del pedido después de presentar los iconos."] },
    { target: "#menuButton", icon: "#menuButton", title: ["The settings gear", "El engranaje de configuración"], body: ["This gear opens your account and preferences. Continue to open its sliding panel and explore each section.", "Este engranaje abre tu cuenta y preferencias. Pulsa Continuar para abrir su panel deslizante y explorar cada sección."] },
    { target: "#categoryTitle", panel: "menu", icon: "#menuButton", title: ["Inside configuration", "Dentro de configuración"], body: ["The sliding panel has your contact details, delivery information and personal settings. Scroll to see every section. The X or shaded area closes it.", "El panel deslizante contiene tus datos de contacto, información de entrega y preferencias personales. Desplázate para ver cada sección. La X o el área sombreada lo cierran."] },
    { target: "#settingsEmail", panel: "menu", title: ["Primary email", "Correo principal"], body: ["Enter the email you want associated with this preview. This prototype saves it only for this browser tab; it does not create an account.", "Ingresa el correo que deseas asociar con esta vista previa. Este prototipo lo guarda solo en esta pestaña; no crea una cuenta."] },
    { target: "#alternateEmail", panel: "menu", title: ["Alternate email", "Correo alternativo"], body: ["Add a second contact address if you use one. It is optional in this preview.", "Añade una segunda dirección de contacto si la utilizas. Es opcional en esta vista previa."] },
    { target: "#settingsFirstName", panel: "menu", title: ["Your name appears above", "Tu nombre aparece arriba"], body: ["Enter your first and last name, then select Save settings. The name in the center of the header changes to your name.", "Ingresa tu nombre y apellido y selecciona Guardar configuración. El nombre en el centro de la barra superior cambiará al tuyo."] },
    { target: "#settingsAddress", panel: "menu", title: ["Delivery information", "Datos de entrega"], body: ["Address, zip code and phone help a future seller prepare delivery and contact you. Fill in relevant details for a better experience. In this preview, they remain in this browser tab.", "La dirección, el código postal y el teléfono ayudarán a un futuro vendedor a preparar la entrega y contactarte. Completa los datos relevantes. En esta vista previa permanecen en esta pestaña."] },
    { target: "#settingsTitle", panel: "menu", title: ["Personal settings", "Preferencias personales"], body: ["Choose a picture and nickname, then Save settings. Language and theme also appear at the bottom of this panel. Picture upload is only a local preview.", "Elige una foto y un apodo y luego guarda la configuración. El idioma y el tema también aparecen al pie de este panel. La foto es solo una vista previa local."] },
    { target: "#settingsMfa", panel: "menu", title: ["Security options", "Opciones de seguridad"], body: ["MFA, fingerprint, faceprint and password controls are design previews. They cannot secure this temporary dashboard or change a real password.", "MFA, huella, rostro y contraseña son demostraciones de diseño. No protegen este panel temporal ni cambian una contraseña real."] },
    { target: "#bagTitle", panel: "bag", icon: "#bagButton", title: ["Inside your bag", "Dentro de tu bolsa"], body: ["Review items, quantities, subtotal, VAT, delivery and total. Clear removes all items. Continue to checkout is a preview; it does not collect payment.", "Revisa artículos, cantidades, subtotal, IVA, entrega y total. Vaciar elimina los artículos. Continuar al pago es una vista previa; no cobra dinero."] },
    { target: ".card .add", title: ["Select items", "Selecciona artículos"], body: ["Use + on a product to add one. Use − to remove one. The number beside them and the shopping bag update together.", "Usa + en un producto para agregar uno. Usa − para quitar uno. El número junto a ellos y la bolsa se actualizan a la vez."] }
  ];
  const firstPanelStep = steps.findIndex(step => step.panel);
  let index = 0, active = false, overlay, spotlight, card, empty, hint;
  const t = pair => pair[i18n.language === "es" ? 1 : 0];
  const byId = id => document.getElementById(id);

  function makeUI() {
    if (overlay) return;
    overlay = document.createElement("div");
    overlay.className = "guided-tutorial";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "false");
    overlay.setAttribute("aria-labelledby", "tutorialTitle");
    overlay.innerHTML = '<div class="guided-tutorial__spotlight"></div><section class="guided-tutorial__card"><div class="guided-tutorial__heading"><small id="tutorialProgress"></small><span class="guided-tutorial__icon" id="tutorialIcon" aria-hidden="true" hidden></span></div><h2 id="tutorialTitle"></h2><p id="tutorialDescription"></p><div class="guided-tutorial__actions"><button type="button" id="tutorialSkip"></button><button type="button" id="tutorialNext"></button></div></section>';
    document.body.appendChild(overlay);
    spotlight = overlay.querySelector(".guided-tutorial__spotlight");
    card = overlay.querySelector(".guided-tutorial__card");
    byId("tutorialNext").addEventListener("click", next);
    byId("tutorialSkip").addEventListener("click", finish);
    // During the icon introductions, Continue controls when drawers first open.
    document.addEventListener("click", event => {
      if (!active || index >= firstPanelStep) return;
      if (!event.target.closest("#bagButton, #menuButton")) return;
      event.preventDefault();
      event.stopImmediatePropagation();
    }, true);
    empty = document.createElement("div");
    empty.id = "tutorialEmpty";
    empty.className = "tutorial-empty";
    empty.hidden = true;
    document.getElementById("products").appendChild(empty);
    hint = document.createElement("div");
    hint.className = "tutorial-search-hint";
    hint.hidden = true;
    document.body.appendChild(hint);
    byId("search").addEventListener("input", event => {
      if (event.target.value.trim()) showProducts();
    });
    window.addEventListener("resize", position, {passive: true});
    document.addEventListener("scroll", position, {passive: true, capture: true});
    document.addEventListener("cappeto:languagechange", refresh);
    document.addEventListener("cappeto:themechange", position);
  }
  function position() {
    if (!active) {
      if (hint && !hint.hidden) {
        const r = byId("searchToggle").getBoundingClientRect();
        const left = r.left - hint.offsetWidth - 16;
        hint.style.left = (left >= 12 ? left : Math.max(12, Math.min(innerWidth - hint.offsetWidth - 12, r.left))) + "px";
        hint.style.top = (left >= 12
          ? Math.max(12, Math.min(innerHeight - hint.offsetHeight - 12, r.top + (r.height - hint.offsetHeight) / 2))
          : Math.max(12, Math.min(innerHeight - hint.offsetHeight - 12, r.bottom + 16))) + "px";
      }
      return;
    }
    const target = document.querySelector(steps[index].target);
    if (!target) return;
    const r = target.getBoundingClientRect(), pad = 7;
    Object.assign(spotlight.style, {left: Math.max(0, r.left - pad) + "px", top: Math.max(0, r.top - pad) + "px", width: r.width + pad * 2 + "px", height: r.height + pad * 2 + "px"});
    const w = card.offsetWidth, h = card.offsetHeight;
    let left, top;
    if (innerWidth > 760 && r.left > w + 36) {
      left = r.left - w - 24;
      top = Math.max(12, Math.min(innerHeight - h - 12, r.top + r.height / 2 - h / 2));
    } else {
      left = Math.max(12, Math.min(innerWidth - w - 12, r.left + r.width / 2 - w / 2));
      top = r.bottom + 24;
      if (top + h > innerHeight - 12) top = Math.max(12, r.top - h - 24);
    }
    card.style.left = left + "px";
    card.style.top = top + "px";
  }
  function render() {
    if (!active) return;
    const step = steps[index];
    if (step.panel === "menu") setPanel("menu", true);
    else if (step.panel === "bag") setPanel("bag", true);
    else { setPanel("menu", false); setPanel("bag", false); }
    const target = document.querySelector(step.target);
    if (target && step.panel) target.scrollIntoView({block: "nearest", behavior: "auto"});
    byId("tutorialProgress").textContent = t(["STEP ", "PASO "]) + String(index + 1).padStart(2, "0") + " / " + steps.length;
    const icon = byId("tutorialIcon");
    icon.replaceChildren();
    icon.hidden = !step.icon;
    if (step.icon) {
      const source = document.querySelector(step.icon);
      const svg = source?.querySelector("svg");
      if (svg) icon.appendChild(svg.cloneNode(true));
      else icon.textContent = source?.textContent.trim() || "";
    }
    byId("tutorialTitle").textContent = t(step.title);
    byId("tutorialDescription").textContent = t(step.body);
    byId("tutorialNext").textContent = index === steps.length - 1 ? t(["Finish", "Terminar"]) : t(["Continue", "Continuar"]);
    byId("tutorialSkip").textContent = t(["Skip tutorial", "Omitir tutorial"]);
    requestAnimationFrame(() => {position(); byId("tutorialNext").focus({preventScroll: true});});
  }
  function refresh() {
    if (active) render();
    else if (empty && !empty.hidden) {
      empty.textContent = t(["Let us know what you are looking for. Select the magnifying glass to search products or sellers.", "Dinos qué estás buscando. Selecciona la lupa para buscar productos o vendedores."]);
      hint.textContent = t(["What are you looking for?", "¿Qué estás buscando?"]);
      position();
    }
  }
  function next() {
    const action = steps[index].action;
    if (action) action();
    if (index === steps.length - 1) { finish(); return; }
    index++;
    render();
  }
  function showProducts() {
    document.body.classList.remove("tutorial-search-ready");
    if (empty) empty.hidden = true;
    if (hint) hint.hidden = true;
    byId("searchToggle").classList.remove("tutorial-search-target");
  }
  function finish() {
    if (!customerSignedIn()) return;
    active = false;
    if (overlay) overlay.hidden = true;
    setPanel("menu", false);
    setPanel("bag", false);
    const firstCompletion = sessionStorage.getItem(KEY) !== "true";
    sessionStorage.setItem(KEY, "true");
    if (firstCompletion && typeof clearBag === "function" && Object.keys(bag).length) clearBag();
    byId("search").value = "";
    filterProducts();
    document.body.classList.add("tutorial-search-ready");
    empty.hidden = false;
    hint.hidden = false;
    byId("searchToggle").classList.add("tutorial-search-target");
    refresh();
    window.scrollTo({top: 0, behavior: "auto"});
    requestAnimationFrame(position);
  }
  function start() {
    if (!customerSignedIn() || active) return;
    makeUI();
    if (sessionStorage.getItem(KEY) === "true") { finish(); return; }
    active = true;
    index = 0;
    overlay.hidden = false;
    render();
  }
  document.addEventListener("cappeto:splashcomplete", start);
  document.addEventListener("cappeto:previewenter", start);
  queueMicrotask(() => {
    if (customerSignedIn() && byId("splashScreen")?.hidden) start();
  });
})();