# NutriAmigo — Especificación completa del proyecto

Este documento reúne todo lo pedido a lo largo del desarrollo y el estado actual de cada parte, para que sirva como referencia única del proyecto.

## 1. Concepto

NutriAmigo es una aplicación web (con app móvil vía PWA) de nutrición y entrenamiento. La mecánica central, base de toda la aplicación — no una función más de "Entrenamiento" — es:

> El usuario ingresa **peso, altura, género, edad y nivel de actividad física**, y con eso la app calcula automáticamente su **índice de masa corporal (IMC)**, su **meta calórica diaria** (fórmula Mifflin-St Jeor) y su **distribución de macronutrientes** (proteína, carbohidratos, grasas). A partir de ahí se genera un **plan de alimentación** y un **plan de entrenamiento**, ambos personalizados según esos datos y el objetivo elegido (Definir / Mantener / Subir de peso).

Esto se pide una sola vez, justo después de registrarse, en un flujo de onboarding — no está escondido dentro de una sola sección.

## 2. Flujo de usuario

1. **Landing pública** (`index.html`): explica el producto, la mecánica, la comunidad y la historia de la empresa. Botón "Continuar con Google".
2. **Registro**: login con Google (OAuth) para la cuenta real, más un primer paso del onboarding con nombre, apellido y correo de demostración (visual, para que el flujo se sienta como un registro completo dentro de este prototipo).
3. **Onboarding** (`onboarding.html`): asistente de 4 pasos — (1) nombre/apellido/correo, (2) peso y altura, (3) género, edad y nivel de actividad, (4) objetivo. Aparece automáticamente si el usuario no ha completado sus datos (verificado en el servidor y en el cliente).
4. **Panel principal / resultados** (`dashboard.html`): IMC, meta calórica diaria y macros en gramos y porcentaje, gráfico de progreso de peso, racha de días consecutivos, accesos rápidos, botón para descargar el resumen en PDF.
5. **Plan de alimentación** (`alimentacion.html`) y **plan de entrenamiento** (`entrenamiento.html`): planes semanales (lunes a domingo, 2 opciones por comida/día), calculados según el objetivo (y, en entrenamiento, con una nota de intensidad según el nivel de actividad). Ambos con botón "Descargar en PDF" y botón "Personalizar" (premium).
6. **Comunidad** (`comunidad.html`): chat en tiempo real por país + sala global, con traducción automática.
7. **Premium** (`premium.html`): comparación de planes y activación.

## 3. Planes gratis vs. Premium

**Gratis (para todos):**
- Cálculo de IMC, calorías y macros a partir de los datos base.
- Plan de alimentación y de entrenamiento semanal, ya personalizados por objetivo y actividad.
- Seguimiento de peso con gráfico y racha de constancia.
- Comunidad con chat traducido.
- Incluye anuncios simulados (aparecen tras un tiempo de uso, se pueden cerrar, con botón "Quitar anuncios").

**Premium ($3.000 COP/mes, o $30.000 COP/año):**
- Sin anuncios.
- Personalización de alimentación: tipo de proteína (pollo, pescado, carne, vegetariano, vegano) + campo de texto libre para restricciones o alergias.
- Personalización de entrenamiento: frecuencia semanal, distancia a correr, enfoque muscular (piernas, brazos, espalda, cuerpo completo).
- Sistema de rangos (pendiente de diseño a futuro).
- Soporte prioritario.

En este prototipo, "Activar Premium" es un botón de demostración (no cobra de verdad) para poder mostrarle al cliente cómo se ve la experiencia paga.

## 4. Chat de soporte (sin IA de pago)

Un bot de reconocimiento de palabras clave (`js/faq-bot.js` + `data/faq.json`) responde 50 preguntas frecuentes predefinidas, incluyendo distintas formas de preguntar lo mismo. El documento `50-preguntas-frecuentes.md` es el entregable legible de esas 50 preguntas, respuestas y palabras clave. No usa ningún modelo de lenguaje ni API paga.

## 5. Comunidad y traducción

Chat en tiempo real con Socket.io: una sala por país (Colombia, México, Argentina, España, Chile, Perú, Estados Unidos, Otros) más una sala Global. Cada mensaje se traduce automáticamente a español/inglés/portugués con la API gratuita MyMemory. El usuario puede elegir mostrar u ocultar su país.

## 6. Autenticación y datos

- Login exclusivo con Google (`passport-google-oauth20`).
- Base de datos SQLite (`better-sqlite3`): usuarios, progreso de peso, racha, datos base (biometrics) y preferencias premium, en tablas separadas — los datos base son gratis para todos, las preferencias avanzadas requieren Premium.

## 7. App móvil

Implementada como **Progressive Web App** (`manifest.json` + `service-worker.js`): instalable desde el navegador en Android y iPhone, funciona en pantalla completa como una app nativa. No es una app publicada en Play Store/App Store — esa sería una app aparte (React Native, Flutter o Capacitor).

## 8. Modo demo sin backend

`js/demo-mode.js` detecta si el backend no está corriendo (o no responde) y simula automáticamente todo el backend dentro del navegador usando `localStorage`: registro con solo un nombre, onboarding, planes, activar Premium, y hasta el chat de comunidad (con un Socket.io simulado). Permite mostrar el prototipo completo sin configurar Google OAuth ni levantar el servidor. Los datos de este modo no se sincronizan con la base de datos real.

## 9. Descarga en PDF

Tres botones de descarga (usando el diálogo de impresión del navegador, sin librerías externas):
- Panel principal: resumen de IMC, calorías y macros.
- Alimentación: plan de comidas completo de la semana.
- Entrenamiento: plan de ejercicio completo de la semana.

## 10. Paleta y diseño

Verde claro y blanco como colores base, sin negro puro ni verde oscuro (definido en `css/styles.css`, tokens en `:root`). Estilo tipo Apple: minimalista, tipografía Manrope + Inter, componentes con feedback visual (pills, tarjetas, modales).

## 11. Bugs corregidos durante el desarrollo

- El chat de ayuda y el modal de "Personalizar" no se podían cerrar de verdad: `.chat-panel` y `.modal-overlay` tenían `display: flex` fijo que le ganaba al atributo `hidden`. Se corrigió agregando `[hidden] { display: none; }`.
- Rutas absolutas (`/dashboard.html`, `fetch('/api/me')`, etc.) rompían la navegación fuera del servidor Node en la raíz exacta. Se convirtieron todas a rutas relativas (`./`) en HTML, JS, `manifest.json` y `service-worker.js` — el backend (`server.js`) mantiene rutas absolutas porque ahí sí son correctas (es código de servidor, no del navegador).
- El "telefonito" (mockup de teléfono) de la portada se había perdido en una reescritura; se restauró con la paleta nueva.
- El plan de alimentación y de entrenamiento eran genéricos (un solo plan para todos); ahora varían según el objetivo (3 planes de comida distintos: definir/mantener/volumen, con porciones y densidad calórica diferentes) y el entrenamiento agrega una nota de intensidad según el nivel de actividad.
- La función de descargar el plan en PDF se había perdido en una reescritura anterior; se volvió a agregar en las tres pantallas correspondientes.
- El aviso "Conocer Premium" (en Alimentación y Entrenamiento) seguía apareciendo después de activar Premium: `.premium-lock` tenía `display: flex` fijo, el mismo problema del chat y el modal. Se agregó una regla global `[hidden] { display: none !important; }` para que este tipo de bug no pueda repetirse con ningún componente futuro.
- La página de Premium exigía sesión iniciada solo para poder verla, así que quien entraba ahí sin haberse registrado quedaba rebotado de inmediato al inicio — se sentía como un ciclo sin salida. Ahora Premium es una página pública (se puede ver sin sesión) y solo pide iniciar sesión con Google en el momento de activar la membresía.
- Se quitó el cuadro de diálogo "¿Cuál es tu nombre?" que aparecía en modo demo al iniciar sesión (quedaba redundante frente al paso de registro del onboarding).
- El chat de preguntas frecuentes ahora también está disponible en Premium y Comunidad (antes solo estaba en Inicio, el panel, Alimentación y Entrenamiento).
- Se agregó la posibilidad de cambiar libremente entre Gratis y Premium desde la página de Premium (antes solo se podía activar Premium, no volver a Gratis) — útil para mostrarle ambas versiones a un cliente en una misma sesión. También se agregó "Gestionar suscripción" al menú del perfil, visible solo para usuarios Premium.
- Se quitó el organigrama de la portada.
- Corregido el chat de preguntas frecuentes: comparaba la pregunta completa como frase exacta, así que escribir una sola palabra (ej. "objetivo") nunca coincidía con nada. Ahora compara palabra por palabra además de por frase completa.
- Los anuncios simulados ya no aparecen una sola vez a los 25 segundos: ahora, cada 5 minutos, hay un 5% de probabilidad de que aparezca uno (solo para usuarios gratuitos).
- La gráfica de progreso de peso ahora muestra la fecha de cada registro, y se puede ver por semana, mes (un punto por día) o año (promedio por mes), con pestañas debajo de la gráfica.
- Se quitó el enlace suelto "Editar mis datos" de Inicio, Alimentación y Entrenamiento. Ahora vive dentro de "Configuración", una opción nueva en el menú del perfil que abre un panel (no una pantalla completa) donde se puede cambiar nombre, apellido, peso, estatura, edad y nivel de actividad, además de elegir el tema claro/oscuro y borrar la cuenta.

## 12. Pendientes / próximos pasos

- Conectar una pasarela de pago real (Wompi, PayU, ePayco o Mercado Pago) para cobrar Premium de verdad — ver la guía paso a paso ya entregada sobre requisitos legales y pasos técnicos.
- Si se quiere migrar de SQLite a una base de datos en la nube: Supabase es la recomendación (Postgres, migración más simple desde SQL) sobre Firebase (NoSQL, requeriría reescribir la capa de datos).
- Migrar de la traducción gratuita (MyMemory) a Google Cloud Translation API si se necesita mayor cuota o calidad.
- Diseñar el sistema de "rangos" premium.
- Moderación real del chat de comunidad y función de reportar usuarios.
- Persistir el historial del chat de comunidad (hoy es solo en vivo, no se guarda).

## 13. Comunidad ampliada: Chat, Reels y Friends

La sección Comunidad ahora tiene tres pestañas:

- **Chat:** el chat en tiempo real ahora es por regiones (Global, Norteamérica, Sudamérica, Europa, Asia, África, Oceanía) en vez de países individuales — traducción automática igual que antes. Junto al nombre de la sala hay un ícono de engranaje que abre un panel para elegir qué país mostrar junto a tus mensajes, independiente de la región en la que estás chateando.
- **Reels:** un muro de publicaciones estilo Reddit — cualquier usuario puede publicar un texto (y opcionalmente una imagen por URL), y los demás pueden votar ▲ arriba, ▼ abajo, o darle ♥. Los votos quedan guardados por usuario para que no se puedan repetir.
- **Friends:** una lista de amigos con chat privado en tiempo real, con un estilo visual inspirado en Snapchat (colores vivos, burbujas redondeadas). Agregar un amigo en este prototipo es tan simple como escribir su nombre — no hay todavía un sistema de solicitudes ni de verificación de identidad entre cuentas reales; es una simulación pensada para mostrar la mecánica.

## 14. Sugerencia de objetivo, contacto y borrado de publicaciones

- En el paso final del onboarding (elegir objetivo), ahora aparece una sugerencia calculada a partir del IMC: bajo peso → sugiere "Subir de peso", peso saludable → "Mantener", sobrepeso o rango alto → "Definir", cada una con una nota de "entrenamiento sugerido". El objetivo sugerido queda preseleccionado, pero el usuario puede cambiarlo libremente.
- Se agregó "Contáctanos" (WhatsApp, Instagram, TikTok y el correo nutriamigo@gmail.com) al final del panel de Configuración y en la portada, dentro de la sección "Quiénes somos".
- En Reels, ahora se puede eliminar una publicación propia (botón "Eliminar", solo visible en tus propias publicaciones).

## 15. Rediseño de Friends, Configuración y nuevas funciones diarias

- **Friends** cambió de un estilo tipo Snapchat a uno inspirado en apps de mensajería tipo WhatsApp (burbujas verdes/blancas, fondo con textura sutil), sin nombrar ninguna marca — y el panel de "agregar amigo" ahora es una tarjeta completa, no un input suelto.
- **Sugerencia de IA junto al IMC**: el panel principal ahora muestra, junto al IMC, la sugerencia de objetivo (Definir/Mantener/Subir de peso) calculada a partir del IMC — la misma lógica que ya se usaba en el onboarding, ahora compartida entre ambas pantallas.
- **Objetivo se mueve a Configuración**: ya no se cambia desde Entrenamiento (que ahora solo lo muestra como texto de solo lectura); se cambia desde el panel de Configuración, junto con el nuevo selector de perfil público/privado.
- **Menú del perfil rediseñado**: en vez de un desplegable delgado, ahora abre como un panel centrado y organizado (con tu foto, nombre y racha arriba), sin salir de la página.
- **Registro diario**: contador de vasos de agua y kilómetros recorridos en el panel principal, guardado por día.
- **Marcar como hecho**: cada comida y cada rutina del día tiene un botón "Ya lo hice" que registra el cumplimiento diario.
- **Aviso al cambiar de peso**: si registras un peso distinto al que tenías guardado (diferencia de 1 kg o más), la app te pregunta si quieres actualizar tu plan con el nuevo peso.
- **Logros**: insignias desbloqueables según tu racha, tus registros de peso, tus tareas completadas y si eres Premium.
- **Exportar historial de peso a Excel**: botón que descarga un CSV (compatible con Excel/Sheets) con todos tus registros de peso y fecha.
- **Anuncios**: ahora la probabilidad del 5% se evalúa una vez por carga de página, no cada 5 minutos.
- Se descartaron, por pedido explícito: encuestas y retos semanales en la Comunidad.
