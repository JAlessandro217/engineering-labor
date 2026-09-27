# engineering-labor

Laboratorio de ingeniería personal: un sitio donde voy mostrando y documentando proyectos de
desarrollo de software a medida que los construyo (sistemas de gestión, análisis de datos,
ciberseguridad, etc.).

## Stack

- PHP
- JavaScript
- Bootstrap 5

## Ejecutar en local (XAMPP)

1. Clona o copia este repositorio dentro de `htdocs` (por ejemplo `C:\xampp\htdocs\engineering-labor`).
2. Inicia Apache desde el panel de XAMPP.
3. Abre `http://localhost/engineering-labor/index.php` en el navegador.

## Estructura

```
engineering-labor/
├── assets/
│   ├── css/style.css
│   └── js/main.js
├── data/
│   └── projects.php      # lista de proyectos mostrados en la home
├── includes/
│   ├── header.php
│   ├── nav.php
│   └── footer.php
└── index.php              # página principal
```

Para agregar un proyecto nuevo a la home, se añade una entrada al arreglo en `data/projects.php`.
