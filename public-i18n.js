(() => {
  "use strict";

  const LANGUAGE_KEY = "cappeto_language";
  const THEME_KEY = "cappeto_theme";
  const translations = {
    en: {
      skipProducts: "Skip to products", skipSignIn: "Skip to sign in", storefront: "Storefront",
      signIn: "Sign in", createAccount: "Create account", languageGroup: "Language and appearance",
      switchLanguage: "Switch to Spanish", light: "Light", dark: "Dark", switchLight: "Switch to light mode", switchDark: "Switch to dark mode",
      welcomeTo: "WELCOME TO CAPPETO", landingTitle: "Fresh local favorites, ready when you are.",
      landingCopy: "Browse the menu freely. Sign in when you are ready to manage your personal settings and continue your customer experience.",
      localBusiness: "YOUR LOCAL FOOD BUSINESS", searchPlaceholder: "Search Cappeto", searchLabel: "Search products",
      bagOpen: "Open shopping bag", bagClose: "Close shopping bag", shoppingBag: "Shopping bag",
      previousProduct: "Previous product", nextProduct: "Next product", yourOrder: "YOUR ORDER", bagTitle: "Your bag", clearBag: "Clear", clearBagLabel: "Clear all items from the order", clearedBag: "Order cleared.",
      closeOrder: "Close order", subtotal: "Subtotal", vat: "VAT", delivery: "Delivery", total: "Total", checkout: "Continue to checkout",
      footer: "Freshly prepared local favorites.", available: "available", products: "products", add: "Add", addOne: "Add one", removeOne: "Remove one", quantity: "Quantity",
      empty: "No products match your search.", added: "Added to your bag", emptyBag: "Your bag is ready for something delicious.", checkoutMsg: "Checkout connection is the next step.",
      welcomeBack: "WELCOME BACK", welcomeTitle: "Your Cappeto favorites are waiting.",
      welcomeCopy: "Sign in will be enabled when the trusted customer identity service is connected.", customerAccount: "CUSTOMER ACCOUNT",
      instruction: "Secure account access is not active in this static preview.", email: "Email address", password: "Password", unavailablePlaceholder: "Unavailable",
      show: "Show", hide: "Hide", showPassword: "Show password", hidePassword: "Hide password", forgot: "Forgot password?",
      sessionOnly: "No password is processed or stored by this preview.", continue: "Continue", continueWith: "CONTINUE WITH", google: "Google", phone: "Phone number",
      createCustomer: "Create a customer account", justBrowsing: "Just browsing?", continueMenu: "Continue to the menu", backMenu: "Back to menu",
      otherMethods: "Other sign-in methods", mochaAlt: "Cappeto café mocha", homeLabel: "Cappeto home",
      recovery: "Password recovery requires the trusted customer identity service.", registration: "Account creation requires the trusted customer identity service.",
      provider: "This sign-in provider requires the trusted identity service.", unavailable: "Sign-in is disabled until the trusted identity service is connected.",
      previewCustomer: "Preview customer account", previewCustomerNotice: "Preview access is session-only and is not production authentication.", previewCustomerName: "Preview customer",
      titleHome: "Cappeto · Order your favorites", titleLogin: "Cappeto · Sign in preview"
    },
    es: {
      skipProducts: "Ir a los productos", skipSignIn: "Ir al inicio de sesión", storefront: "Tienda",
      signIn: "Iniciar sesión", createAccount: "Crear cuenta", languageGroup: "Idioma y apariencia",
      switchLanguage: "Cambiar a inglés", light: "Claro", dark: "Oscuro", switchLight: "Cambiar a modo claro", switchDark: "Cambiar a modo oscuro",
      welcomeTo: "TE DAMOS LA BIENVENIDA A CAPPETO", landingTitle: "Tus favoritos locales, recién preparados para ti.",
      landingCopy: "Explora el menú libremente. Inicia sesión cuando quieras administrar tus preferencias y continuar tu experiencia como cliente.",
      localBusiness: "TU NEGOCIO LOCAL DE ALIMENTOS", searchPlaceholder: "Buscar en Cappeto", searchLabel: "Buscar productos",
      bagOpen: "Abrir bolsa de compras", bagClose: "Cerrar bolsa de compras", shoppingBag: "Bolsa de compras",
      previousProduct: "Producto anterior", nextProduct: "Producto siguiente", yourOrder: "TU PEDIDO", bagTitle: "Tu bolsa", clearBag: "Vaciar", clearBagLabel: "Vaciar todos los artículos del pedido", clearedBag: "Pedido vaciado.",
      closeOrder: "Cerrar pedido", subtotal: "Subtotal", vat: "IVA", delivery: "Entrega", total: "Total", checkout: "Continuar al pago",
      footer: "Favoritos locales recién preparados.", available: "disponibles", products: "productos", add: "Agregar", addOne: "Agregar uno", removeOne: "Quitar uno", quantity: "Cantidad",
      empty: "Ningún producto coincide con tu búsqueda.", added: "Agregado a tu bolsa", emptyBag: "Tu bolsa está lista para algo delicioso.", checkoutMsg: "El próximo paso es conectar el proceso de pago.",
      welcomeBack: "QUÉ GUSTO VERTE", welcomeTitle: "Tus favoritos de Cappeto te esperan.",
      welcomeCopy: "El inicio de sesión se habilitará cuando se conecte el servicio confiable de identidad del cliente.", customerAccount: "CUENTA DEL CLIENTE",
      instruction: "El acceso seguro a la cuenta no está activo en esta vista previa estática.", email: "Correo electrónico", password: "Contraseña", unavailablePlaceholder: "No disponible",
      show: "Mostrar", hide: "Ocultar", showPassword: "Mostrar contraseña", hidePassword: "Ocultar contraseña", forgot: "¿Olvidaste tu contraseña?",
      sessionOnly: "Esta vista previa no procesa ni guarda contraseñas.", continue: "Continuar", continueWith: "CONTINUAR CON", google: "Google", phone: "Número de teléfono",
      createCustomer: "Crear una cuenta de cliente", justBrowsing: "¿Solo estás mirando?", continueMenu: "Continuar al menú", backMenu: "Volver al menú",
      otherMethods: "Otros métodos de inicio de sesión", mochaAlt: "Moca de Cappeto", homeLabel: "Inicio de Cappeto",
      recovery: "La recuperación de contraseña requiere el servicio confiable de identidad del cliente.", registration: "La creación de cuentas requiere el servicio confiable de identidad del cliente.",
      provider: "Este proveedor de acceso requiere el servicio confiable de identidad.", unavailable: "El inicio de sesión está deshabilitado hasta que se conecte el servicio confiable de identidad.",
      previewCustomer: "Vista previa de la cuenta del cliente", previewCustomerNotice: "El acceso de vista previa existe solo durante esta sesión y no es autenticación de producción.", previewCustomerName: "Cliente de prueba",
      titleHome: "Cappeto · Pide tus favoritos", titleLogin: "Cappeto · Vista previa de inicio de sesión"
    }
  };

  const validLanguage = value => value === "es" ? "es" : "en";
  const validTheme = value => value === "dark" ? "dark" : "light";
  const spanishProductNames = {
    "cafe-latte": "Café con leche", "double-espresso": "Espresso doble", "iced-cappuccino": "Capuchino frío",
    "cafe-mocha": "Café moca", "caramel-macchiato": "Macchiato de caramelo", "cola-lime": "Cola con limón",
    "citrus-mint-soda": "Refresco cítrico con menta", "berry-rosemary-soda": "Refresco de frutos rojos y romero",
    "fresh-orange-juice": "Jugo de naranja fresco", "mango-passion-juice": "Jugo de mango y maracuyá",
    "strawberry-watermelon-juice": "Jugo de fresa y sandía", "butter-croissant": "Croissant de mantequilla",
    "cinnamon-roll": "Rollo de canela", "banana-walnut-bread": "Pan de banana y nuez",
    "chicken-avocado-wrap": "Wrap de pollo y aguacate", "roasted-vegetable-wrap": "Wrap de vegetales asados",
    "chicken-pesto-ciabatta": "Chapata de pollo al pesto", "turkey-avocado-club": "Club de pavo y aguacate",
    "gourmet-cheeseburger": "Hamburguesa gourmet con queso", "gourmet-hot-dog": "Perro caliente gourmet"
  };
  let language = validLanguage(localStorage.getItem(LANGUAGE_KEY));
  let theme = validTheme(localStorage.getItem(THEME_KEY) || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
  const text = key => translations[language][key] || key;

  function render() {
    document.documentElement.lang = language;
    document.documentElement.dataset.theme = theme;
    document.querySelectorAll("[data-i18n]").forEach(element => { element.textContent = text(element.dataset.i18n); });
    document.querySelectorAll("[data-i18n-aria-label]").forEach(element => element.setAttribute("aria-label", text(element.dataset.i18nAriaLabel)));
    document.querySelectorAll("[data-i18n-title]").forEach(element => element.setAttribute("title", text(element.dataset.i18nTitle)));
    document.querySelectorAll("[data-i18n-placeholder]").forEach(element => element.setAttribute("placeholder", text(element.dataset.i18nPlaceholder)));
    document.querySelectorAll("[data-i18n-alt]").forEach(element => element.setAttribute("alt", text(element.dataset.i18nAlt)));
    document.querySelectorAll("[data-language-control]").forEach(button => {
      button.textContent = language.toUpperCase();
      button.setAttribute("aria-label", text("switchLanguage"));
      button.setAttribute("title", text("switchLanguage"));
      button.setAttribute("aria-pressed", String(language === "es"));
    });
    document.querySelectorAll("[data-theme-control]").forEach(button => {
      button.textContent = text(theme);
      button.setAttribute("aria-label", text(theme === "dark" ? "switchLight" : "switchDark"));
      button.setAttribute("title", text(theme === "dark" ? "switchLight" : "switchDark"));
      button.setAttribute("aria-pressed", String(theme === "dark"));
    });
    const color = document.querySelector('meta[name="theme-color"]');
    if (color) color.content = theme === "dark" ? "#101812" : "#f7f4eb";
  }
  function setLanguage(next) {
    language = validLanguage(next); localStorage.setItem(LANGUAGE_KEY, language); render();
    document.dispatchEvent(new CustomEvent("cappeto:languagechange", { detail: { language } }));
  }
  function setTheme(next) {
    theme = validTheme(next); localStorage.setItem(THEME_KEY, theme); render();
    document.dispatchEvent(new CustomEvent("cappeto:themechange", { detail: { theme } }));
  }
  document.addEventListener("click", event => {
    if (event.target.closest("[data-language-control]")) setLanguage(language === "en" ? "es" : "en");
    if (event.target.closest("[data-theme-control]")) setTheme(theme === "dark" ? "light" : "dark");
  });
  const productName = product => language === "es" ? (spanishProductNames[product.id] || product.name) : product.name;
  window.CappetoI18n = { get language() { return language; }, get theme() { return theme; }, text, productName, render, setLanguage, setTheme };
  render();
})();
