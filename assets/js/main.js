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

    const filtroCategorias = document.getElementById('filtroCategorias');
    const proyectoItems = document.querySelectorAll('.proyecto-item');

    if (filtroCategorias) {
        filtroCategorias.addEventListener('click', function (event) {
            const boton = event.target.closest('button[data-categoria]');
            if (!boton) return;

            filtroCategorias.querySelectorAll('button').forEach(function (btn) {
                btn.classList.remove('btn-primary');
                btn.classList.add('btn-outline-primary');
            });
            boton.classList.remove('btn-outline-primary');
            boton.classList.add('btn-primary');

            const categoria = boton.dataset.categoria;
            proyectoItems.forEach(function (item) {
                const coincide = categoria === 'todos' || item.dataset.categoria === categoria;
                item.classList.toggle('d-none', !coincide);
            });
        });
    }
})();
