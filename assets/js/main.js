(function () {
    const root = document.documentElement;
    const themeToggle = document.getElementById('themeToggle');
    const storedTheme = localStorage.getItem('lab-theme');

    if (storedTheme) {
        root.setAttribute('data-bs-theme', storedTheme);
    }

    function updateToggleIcon() {
        const isDark = root.getAttribute('data-bs-theme') === 'dark';
        themeToggle.innerHTML = isDark
            ? '<i class="bi bi-sun-fill"></i>'
            : '<i class="bi bi-moon-stars-fill"></i>';
    }

    if (themeToggle) {
        updateToggleIcon();
        themeToggle.addEventListener('click', function () {
            const nextTheme = root.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
            root.setAttribute('data-bs-theme', nextTheme);
            localStorage.setItem('lab-theme', nextTheme);
            updateToggleIcon();
        });
    }

    const ESTADO_LABELS = {
        planificado: { texto: 'Planificado', clase: 'text-bg-secondary' },
        'en-desarrollo': { texto: 'En desarrollo', clase: 'text-bg-warning' },
        completado: { texto: 'Completado', clase: 'text-bg-success' },
    };

    function escapeHtml(valor) {
        const div = document.createElement('div');
        div.textContent = valor;
        return div.innerHTML;
    }

    function renderProyectos(proyectos) {
        const lista = document.getElementById('listaProyectos');
        if (!lista) return;

        lista.innerHTML = proyectos.map(function (proyecto) {
            const estado = ESTADO_LABELS[proyecto.estado] || ESTADO_LABELS.planificado;
            const tecnologias = proyecto.tecnologias
                .map(function (t) { return '<span class="badge tech-badge">' + escapeHtml(t) + '</span>'; })
                .join('');
            const accion = proyecto.enlace
                ? '<a href="' + escapeHtml(proyecto.enlace) + '" class="btn btn-sm btn-outline-primary mt-auto">Ver proyecto</a>'
                : '<button class="btn btn-sm btn-outline-secondary mt-auto" disabled>Próximamente</button>';

            return (
                '<div class="col-md-6 col-lg-4 proyecto-item" data-categoria="' + escapeHtml(proyecto.categoria) + '">' +
                    '<div class="card h-100 project-card">' +
                        '<div class="card-body d-flex flex-column">' +
                            '<div class="d-flex justify-content-between align-items-start mb-3">' +
                                '<div class="icon-badge"><i class="bi ' + escapeHtml(proyecto.icono) + '"></i></div>' +
                                '<span class="badge ' + estado.clase + '">' + estado.texto + '</span>' +
                            '</div>' +
                            '<h3 class="h5 card-title">' + escapeHtml(proyecto.nombre) + '</h3>' +
                            '<p class="card-text text-secondary flex-grow-1">' + escapeHtml(proyecto.descripcion) + '</p>' +
                            '<div class="d-flex flex-wrap gap-2 mb-3">' + tecnologias + '</div>' +
                            accion +
                        '</div>' +
                    '</div>' +
                '</div>'
            );
        }).join('');
    }

    function renderFiltros(proyectos) {
        const contenedor = document.getElementById('filtroCategorias');
        if (!contenedor) return;

        const categorias = Array.from(new Set(proyectos.map(function (p) { return p.categoria; })));
        const botonTodos = '<button type="button" class="btn btn-sm btn-primary" data-categoria="todos">Todos</button>';
        const botonesCategoria = categorias.map(function (categoria) {
            return '<button type="button" class="btn btn-sm btn-outline-primary" data-categoria="' +
                escapeHtml(categoria) + '">' + escapeHtml(categoria) + '</button>';
        }).join('');

        contenedor.innerHTML = botonTodos + botonesCategoria;

        contenedor.addEventListener('click', function (event) {
            const boton = event.target.closest('button[data-categoria]');
            if (!boton) return;

            contenedor.querySelectorAll('button').forEach(function (btn) {
                btn.classList.remove('btn-primary');
                btn.classList.add('btn-outline-primary');
            });
            boton.classList.remove('btn-outline-primary');
            boton.classList.add('btn-primary');

            const categoria = boton.dataset.categoria;
            document.querySelectorAll('.proyecto-item').forEach(function (item) {
                const coincide = categoria === 'todos' || item.dataset.categoria === categoria;
                item.classList.toggle('d-none', !coincide);
            });
        });
    }

    function actualizarEstadisticas(proyectos) {
        const totalProyectos = document.getElementById('statProyectos');
        const totalAreas = document.getElementById('statAreas');
        const totalTerminal = document.getElementById('terminalTotal');
        const categorias = new Set(proyectos.map(function (p) { return p.categoria; }));

        if (totalProyectos) totalProyectos.textContent = proyectos.length;
        if (totalAreas) totalAreas.textContent = categorias.size;
        if (totalTerminal) totalTerminal.textContent = proyectos.length;
    }

    if (typeof PROYECTOS !== 'undefined') {
        renderFiltros(PROYECTOS);
        renderProyectos(PROYECTOS);
        actualizarEstadisticas(PROYECTOS);
    }

    const anioFooter = document.getElementById('anioFooter');
    if (anioFooter) {
        anioFooter.textContent = new Date().getFullYear();
    }
})();
