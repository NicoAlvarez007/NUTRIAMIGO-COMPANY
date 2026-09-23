# NutriAmigo — App web completa (login, planes, comunidad, premium)

Proyecto en **HTML + CSS + JavaScript puro** en el frontend, con un **backend real en Node.js** (Google OAuth, base de datos SQLite y chat en tiempo real). Listo para abrir en Visual Studio Code.

## Estructura del proyecto

```
nutriamigo-web/
├── index.html            → landing pública (marketing + login con Google)
├── dashboard.html         → panel principal tras iniciar sesión
├── alimentacion.html      → plan de alimentación semanal
├── entrenamiento.html     → plan de entrenamiento semanal
├── comunidad.html         → chat en tiempo real por país + traducción
├── premium.html           → beneficios y activación de membresía
├── manifest.json / service-worker.js → hacen la web instalable como app (PWA)
├── css/
│   ├── styles.css         → tokens de marca (verde claro + blanco) y landing
│   ├── app.css            → componentes del área logueada (dashboard, planes, chat)
│   └── chat.css           → widget del chat de ayuda (preguntas frecuentes)
├── js/
│   ├── script.js          → navegación de la landing
│   ├── app.js             → sesión, perfil y menú (compartido por las páginas internas)
│   ├── dashboard.js        → gráfico de progreso de peso
│   ├── alimentacion.js     → render del plan semanal + personalización premium
│   ├── entrenamiento.js    → render de la rutina semanal + personalización premium
│   ├── comunidad.js        → cliente de chat en tiempo real (Socket.io)
│   ├── faq-bot.js          → bot de palabras clave (sin IA de pago)
│   └── pwa.js              → registro del service worker
├── data/
│   ├── faq.json            → las 50 preguntas frecuentes que usa el bot
│   ├── meals.json          → plan de comidas semanal
│   └── workouts.json       → plan de entrenamiento semanal por objetivo
├── 50-preguntas-frecuentes.md → entregable legible de las 50 preguntas y respuestas
├── assets/                 → logo, organigrama e íconos de la PWA
└── backend/
    ├── server.js           → Express + Google OAuth + Socket.io + rutas de la API
    ├── db.js                → esquema y consultas de SQLite
    ├── translate.js         → traducción automática del chat (API gratuita)
    ├── package.json
    └── .env.example
```

## Antes de empezar: crea tus credenciales de Google OAuth

1. Ve a [Google Cloud Console](https://console.cloud.google.com/) → crea un proyecto (o usa uno existente).
2. Ve a **APIs y servicios → Pantalla de consentimiento OAuth** y configúrala en modo "Externo" (basta con datos básicos para pruebas).
3. Ve a **Credenciales → Crear credenciales → ID de cliente de OAuth**.
   - Tipo de aplicación: **Aplicación web**.
   - Orígenes autorizados de JavaScript: `http://localhost:3000`
   - URI de redirección autorizados: `http://localhost:3000/auth/google/callback`
4. Copia el **Client ID** y el **Client Secret** que te genera.

## Instalación y ejecución

```bash
cd nutriamigo-web/backend
npm install
cp .env.example .env
```

Abre `.env` y completa:

```
GOOGLE_CLIENT_ID=el_client_id_que_copiaste
GOOGLE_CLIENT_SECRET=el_client_secret_que_copiaste
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
SESSION_SECRET=cualquier_cadena_larga_y_aleatoria
PORT=3000
```

Inicia el servidor:

```bash
npm start
```

Abre **http://localhost:3000** — ahí puedes iniciar sesión con Google y usar la app completa (planes, comunidad, premium). La base de datos SQLite (`backend/nutriamigo.db`) se crea sola la primera vez que corres el servidor.

> Sin este servidor corriendo, solo funciona la landing pública (`index.html` con Live Server); el login, los planes, la comunidad y el premium necesitan el backend porque dependen de tu sesión y de la base de datos.

### Modo demo (sin backend)

Si abres la página y el servidor de `backend/` no está corriendo, `js/demo-mode.js` lo detecta automáticamente y simula todo el backend dentro del navegador (usando `localStorage`): registro con solo un nombre, onboarding, planes, activar Premium y hasta el chat de comunidad. Es útil para mostrarle el prototipo a alguien sin tener que configurar Google OAuth ni levantar el servidor primero. Los datos de ese modo no se comparten entre navegadores ni se sincronizan con la base de datos real — es solo para demostraciones.

## Cómo funciona cada pieza

### Login con Google
Usa `passport-google-oauth20`. Al iniciar sesión por primera vez, se crea un usuario en la base de datos con su nombre, correo y fecha de creación de cuenta (`backend/db.js`). Las siguientes veces, se reconoce por su `google_id`.

### Planes de alimentación y entrenamiento
- **Gratis:** el plan semanal se muestra completo (2 opciones por comida/día), y en entrenamiento puedes elegir tu objetivo general (Definir, Mantener, Aumentar volumen).
- **Premium:** el botón "Personalizar" abre un formulario (tipo de proteína, restricciones alimentarias, frecuencia de entrenamiento, distancia a correr, enfoque muscular). Las preferencias se guardan en la base de datos y el plan se ajusta con sustituciones de texto automáticas.
- Activar Premium en este proyecto es un botón de demostración (`/api/premium/activate`) — no está conectado a una pasarela de pagos real. Para producción real necesitarías integrar Stripe, PayU, Wompi u otra pasarela.
- **Página Premium pública:** se puede ver sin haber iniciado sesión (es una página de precios, como en cualquier producto real); solo pide iniciar sesión con Google en el momento de darle clic a "Activar Premium".
- **Insignia de plan:** en la esquina superior de cada pantalla de la app aparece "Gratis" o "Premium" según tu cuenta, y el enlace "Premium" del menú desaparece automáticamente una vez que ya lo activaste.
- **PDF completo del panel principal:** el botón "Descargar mi plan completo" en el panel principal incluye tus datos, tu IMC, tus calorías, tus macros, tu semana completa de alimentación y tu semana completa de entrenamiento — todo en un solo PDF.

### Racha y progreso
Cada inicio de sesión actualiza tu racha de días consecutivos (`backend/db.js`, función `touchStreak`). El progreso de peso se guarda por usuario en la tabla `progress` y se dibuja con un gráfico hecho en `<canvas>`, sin librerías externas.

### Comunidad (chat en tiempo real)
Usa **Socket.io**. Hay una sala por país y una sala "Global". Cada mensaje se traduce automáticamente a español, inglés y portugués usando la API gratuita **MyMemory Translation** (`backend/translate.js`) — el destinatario ve el mensaje en el idioma que tenga seleccionado en su propio chat. Puedes elegir mostrar u ocultar tu país en cada mensaje.

> La API de MyMemory es gratuita pero tiene un límite diario de uso (aprox. 5.000 palabras/día sin registrarte). Para un uso más intensivo, se recomienda registrarse en su sitio o migrar a un servicio de traducción de pago con mayor cuota.
>
> Los mensajes del chat no se guardan en la base de datos: solo viven mientras la sala está activa. Persistir el historial es un buen "próximo paso" si quieres ampliarlo.

### Chat de ayuda (sin IA de pago)
El botón flotante con el logo abre un chat que **no usa ningún modelo de lenguaje**: compara tu pregunta contra 50 preguntas frecuentes predefinidas por coincidencia de palabras clave (`js/faq-bot.js` + `data/faq.json`). El documento `50-preguntas-frecuentes.md` en la raíz del proyecto es el entregable legible de esas 50 preguntas, respuestas y palabras clave.

### App móvil (PWA)
Se implementó como **Progressive Web App**: `manifest.json` + `service-worker.js` hacen que el navegador ofrezca "Instalar app" o "Agregar a pantalla de inicio", tanto en Android como en iPhone, y que funcione con una interfaz de app nativa (pantalla completa, ícono propio). **No es una app nativa** publicada en Play Store o App Store — construir esa versión (con React Native, Flutter o Capacitor) es un proyecto aparte, con su propio proceso de publicación en cada tienda. La PWA es la vía más rápida y realista para tener "algo instalable en el celular" dentro del alcance de este proyecto; si más adelante quieres la app nativa de tienda, es el siguiente paso natural.

## Paleta de colores

Definida en `css/styles.css` (`:root`): verde claro (`--green-500: #34c281`) y blanco como colores base, sin negro puro ni verde oscuro. El texto usa un gris verdoso oscuro (`--text: #263029`) solo por legibilidad, nunca como color de marca en fondos o botones grandes.

## Notas técnicas

- No requiere ningún build tool: son archivos estáticos servidos por Express.
- Los datos de comidas, rutinas y preguntas frecuentes viven en `data/*.js` (variables globales cargadas con `<script>`), no en archivos `.json` sueltos cargados con `fetch`. Esto evita un problema real: si abres el sitio con doble clic (`file://`) en vez de un servidor, el navegador bloquea `fetch()` de archivos locales, y eso rompía silenciosamente todo lo que dependía de esos datos (el plan, el botón "Personalizar", el de "Descargar en PDF"). Los archivos `.json` en `data/` se conservan solo como referencia/fuente original.
- Todas las llamadas a `fetch()` del navegador están envueltas en `try/catch`: si una falla, la página sigue funcionando y los botones quedan conectados en vez de romperse en silencio.
- El motor de traducción y el bot de preguntas frecuentes no dependen de ninguna IA de pago, tal como se pidió.
- El código no incluye comentarios explicativos "estilo IA"; los comentarios que quedan son técnicos y puntuales.
- Base de datos: SQLite con `better-sqlite3` (un solo archivo, sin necesidad de instalar un motor de base de datos aparte).
