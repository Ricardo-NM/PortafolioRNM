# Portafolio RNM

Portafolio web personal, desarrollado con Next.js, React, Tailwind CSS y TypeScript. El proyecto presenta perfil profesional, experiencia laboral, proyectos destacados, habilidades tecnicas, actividad de GitHub, descarga de CV y formulario de contacto.

## Caracteristicas

- Interfaz responsiva con soporte para tema claro y oscuro.
- Secciones de perfil, experiencia, proyectos, habilidades y actividad de GitHub.
- Formulario de contacto integrado con Resend.
- Descarga de CV desde una ruta API.
- Animaciones e interacciones con Framer Motion, GSAP y Lenis.
- Metricas de rendimiento con Vercel Analytics y Speed Insights.
- Pruebas automatizadas con Vitest.

## Tecnologias

- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- GSAP
- Three.js
- Resend
- Vitest

## Requisitos

- Node.js
- npm

## Instalacion

```bash
npm install
```

## Variables de entorno

Crea un archivo `.env.local` tomando como base `.env.example`:

```env
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=your_verified_sender@example.com
CONTACT_RECIPIENT_EMAIL=your_contact_recipient@example.com
GITHUB_TOKEN=your_github_token
```

Descripcion de variables:

- `RESEND_API_KEY`: Llave API de Resend para enviar correos desde el formulario de contacto.
- `RESEND_FROM_EMAIL`: Correo remitente verificado en Resend.
- `CONTACT_RECIPIENT_EMAIL`: Correo que recibira los mensajes del formulario.
- `GITHUB_TOKEN`: Token usado para consultar actividad de GitHub desde el servidor.

## Scripts disponibles

```bash
npm run dev
```

Inicia el entorno de desarrollo.

```bash
npm run build
```

Genera la version de produccion.

```bash
npm run start
```

Ejecuta la version de produccion generada.

```bash
npm run lint
```

Ejecuta ESLint.

```bash
npm run test
```

Ejecuta las pruebas automatizadas.

## Estructura principal

```text
app/                 Rutas, layout y APIs de Next.js
components/          Componentes de interfaz
components/home/     Secciones principales del portafolio
lib/                 Utilidades y logica de servidor
assets/              Imagenes y documentos fuente
public/              Archivos publicos
```

## Ejecucion local

```bash
npm install
npm run dev
```

Despues abre `http://localhost:3000` en el navegador.
