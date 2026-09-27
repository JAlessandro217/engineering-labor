# engineering-labor

Laboratorio de ingeniería personal: un sitio donde voy mostrando y documentando proyectos de
desarrollo de software a medida que los construyo (sistemas de gestión, análisis de datos,
ciberseguridad, etc.).

Esta landing es un sitio estático (HTML/CSS/JS + Bootstrap), pensado para desplegarse gratis en
AWS Amplify Hosting. Los proyectos reales que requieran backend (PHP + MySQL) — ERP, gestor de
tareas, SIEM, etc. — se desarrollan por separado y se enlazan desde aquí cuando estén listos.

## Stack

- HTML / JavaScript / Bootstrap 5 (landing)
- PHP + MySQL (para los proyectos individuales que se vayan agregando)

## Ejecutar en local

No requiere servidor: basta con abrir `index.html` en el navegador, o servirlo con cualquier
servidor estático, por ejemplo:

```bash
php -S localhost:8000
```

y visitar `http://localhost:8000`.

## Desplegar en AWS Amplify

1. En la consola de Amplify, **New app → Host web app**, conecta este repositorio de GitHub.
2. Amplify detecta `amplify.yml` (sitio estático, sin build) y despliega `index.html` tal cual.
3. Cada push a `main` vuelve a desplegar automáticamente.

## Estructura

```
engineering-labor/
├── assets/
│   ├── css/style.css
│   └── js/
│       ├── projects-data.js   # lista de proyectos mostrados en la home
│       └── main.js            # render de tarjetas, filtros y tema
├── amplify.yml                # configuración de build para Amplify Hosting
└── index.html                 # página principal
```

Para agregar un proyecto nuevo a la home, se añade una entrada al arreglo en
`assets/js/projects-data.js`.
