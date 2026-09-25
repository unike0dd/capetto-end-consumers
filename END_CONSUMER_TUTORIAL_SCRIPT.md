# End Consumer Tutorial Script

This is the explicit English and Spanish script for the temporary End Consumer dashboard. The live behavior is in `tutorial.js`; styles are in `tutorial.css`. Keep this text synchronized with the application.

## Presentation order

After **Open dashboard**, the welcome tiles disappear and the tutorial starts. First, the card identifies the header controls **one at a time**: magnifying glass, language, appearance, shopping bag and configuration gear. It keeps both drawers closed during these introductions, even if the bag or gear is clicked. Continue from the gear card opens Configuration on the next card. Then the configuration drawer opens for account and settings details. The shopping bag drawer and item selection follow.

Every card displays a consistently aligned step number and offers **Continue / Continuar** and **Skip tutorial / Omitir tutorial**. An icon card displays a copy of its real control icon. The card highlights the live target without displaying screenshots.

## Tutorial cards

### 01 / 15 — Your dashboard controls / Los controles de tu panel
- **Target:** `.header-fabs`
- **English:** Across the top: the magnifying glass searches, EN changes language, Light changes appearance, the bag holds your items, and the gear opens your settings. We will try each control.
- **Español:** En la barra superior: la lupa busca, EN cambia el idioma, Claro cambia la apariencia, la bolsa guarda tus artículos y el engranaje abre la configuración. Vamos a conocer cada control.

### 02 / 15 — The search button / El botón de búsqueda
- **Target/icon:** `#searchToggle`
- **English:** The magnifying glass opens search. Enter a product or seller name. The final screen begins empty so you can tell us what you are looking for.
- **Español:** La lupa abre la búsqueda. Escribe un producto o vendedor. La pantalla final comienza vacía para que nos digas qué estás buscando.

### 03 / 15 — The language button / El botón de idioma
- **Target/icon:** `#headerLanguage`
- **English:** EN switches the dashboard to Spanish. Select it now or Continue to see ES. You can switch back at any time.
- **Español:** EN cambia el panel a español. Selecciónalo ahora o pulsa Continuar para ver ES. Puedes volver a inglés cuando quieras.

### 04 / 15 — The appearance button / El botón de apariencia
- **Target/icon:** `#headerTheme`
- **English:** Light switches the background to Dark. Select it now or Continue to try it. Your choice stays on this device.
- **Español:** Claro cambia el fondo a Oscuro. Selecciónalo ahora o pulsa Continuar para probarlo. La preferencia permanece en este dispositivo.

### 05 / 15 — The shopping bag / La bolsa de compras
- **Target/icon:** `#bagButton`
- **English:** This bag holds the items you select. Its number shows how many you have added. We will open the order panel after the icon introductions.
- **Español:** Esta bolsa guarda los artículos que seleccionas. El número indica cuántos agregaste. Abriremos el panel del pedido después de presentar los iconos.

### 06 / 15 — The settings gear / El engranaje de configuración
- **Target/icon:** `#menuButton`
- **English:** This gear opens your account and preferences. Continue to open its sliding panel and explore each section.
- **Español:** Este engranaje abre tu cuenta y preferencias. Pulsa Continuar para abrir su panel deslizante y explorar cada sección.

### 07 / 15 — Inside configuration / Dentro de configuración
- **Target:** `#categoryTitle`; **icon:** `#menuButton`; **panel:** Configuration open
- **English:** The sliding panel has your contact details, delivery information and personal settings. Scroll to see every section. The X or shaded area closes it.
- **Español:** El panel deslizante contiene tus datos de contacto, información de entrega y preferencias personales. Desplázate para ver cada sección. La X o el área sombreada lo cierran.

### 08 / 15 — Primary email / Correo principal
- **Target:** `#settingsEmail`; **panel:** Configuration open
- **English:** Enter the email you want associated with this preview. This prototype saves it only for this browser tab; it does not create an account.
- **Español:** Ingresa el correo que deseas asociar con esta vista previa. Este prototipo lo guarda solo en esta pestaña; no crea una cuenta.

### 09 / 15 — Alternate email / Correo alternativo
- **Target:** `#alternateEmail`; **panel:** Configuration open
- **English:** Add a second contact address if you use one. It is optional in this preview.
- **Español:** Añade una segunda dirección de contacto si la utilizas. Es opcional en esta vista previa.

### 10 / 15 — Your name appears above / Tu nombre aparece arriba
- **Target:** `#settingsFirstName`; **panel:** Configuration open
- **English:** Enter your first and last name, then select Save settings. The name in the center of the header changes to your name.
- **Español:** Ingresa tu nombre y apellido y selecciona Guardar configuración. El nombre en el centro de la barra superior cambiará al tuyo.

### 11 / 15 — Delivery information / Datos de entrega
- **Target:** `#settingsAddress`; **panel:** Configuration open
- **English:** Address, zip code and phone help a future seller prepare delivery and contact you. Fill in relevant details for a better experience. In this preview, they remain in this browser tab.
- **Español:** La dirección, el código postal y el teléfono ayudarán a un futuro vendedor a preparar la entrega y contactarte. Completa los datos relevantes. En esta vista previa permanecen en esta pestaña.

### 12 / 15 — Personal settings / Preferencias personales
- **Target:** `#settingsTitle`; **panel:** Configuration open
- **English:** Choose a picture and nickname, then Save settings. Language and theme also appear at the bottom of this panel. Picture upload is only a local preview.
- **Español:** Elige una foto y un apodo y luego guarda la configuración. El idioma y el tema también aparecen al pie de este panel. La foto es solo una vista previa local.

### 13 / 15 — Security options / Opciones de seguridad
- **Target:** `#settingsMfa`; **panel:** Configuration open
- **English:** MFA, fingerprint, faceprint and password controls are design previews. They cannot secure this temporary dashboard or change a real password.
- **Español:** MFA, huella, rostro y contraseña son demostraciones de diseño. No protegen este panel temporal ni cambian una contraseña real.

### 14 / 15 — Inside your bag / Dentro de tu bolsa
- **Target:** `#bagTitle`; **icon:** `#bagButton`; **panel:** Shopping bag open
- **English:** Review items, quantities, subtotal, VAT, delivery and total. Clear removes all items. Continue to checkout is a preview; it does not collect payment.
- **Español:** Revisa artículos, cantidades, subtotal, IVA, entrega y total. Vaciar elimina los artículos. Continuar al pago es una vista previa; no cobra dinero.

### 15 / 15 — Select items / Selecciona artículos
- **Target:** `.card .add`
- **English:** Use + on a product to add one. Use − to remove one. The number beside them and the shopping bag update together.
- **Español:** Usa + en un producto para agregar uno. Usa − para quitar uno. El número junto a ellos y la bolsa se actualizan a la vez.

## Button and completion behavior

- **Continue** advances one card. On the language card it switches to ES if needed; on the appearance card it switches to Dark if needed. The last card says **Finish / Terminar**.
- **Skip tutorial** immediately ends the walkthrough.
- On first completion, close any drawer, restore the bag to its pre-tutorial quantities so existing selections are preserved, and show an empty dashboard. Later cart selections are not cleared on reload.
- The final prompt is **What are you looking for? / ¿Qué estás buscando?**. It sits beside the highlighted magnifying glass when room permits, or below on narrow screens. A search reveals matching products and catalog seller names when available.

## Preview boundaries

Contact and delivery fields remain in this browser tab. Picture selection, MFA, fingerprint, faceprint and password controls are design previews. Checkout does not collect payment.
