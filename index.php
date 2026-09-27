<?php
$tituloPagina = 'engineering-labor — Laboratorio de Ingeniería';
require __DIR__ . '/includes/header.php';
require __DIR__ . '/includes/nav.php';

$proyectos = require __DIR__ . '/data/projects.php';
$categorias = array_values(array_unique(array_column($proyectos, 'categoria')));

$estadoLabels = [
    'planificado' => ['texto' => 'Planificado', 'clase' => 'text-bg-secondary'],
    'en-desarrollo' => ['texto' => 'En desarrollo', 'clase' => 'text-bg-warning'],
    'completado' => ['texto' => 'Completado', 'clase' => 'text-bg-success'],
];
?>

<header id="inicio" class="hero py-5">
    <div class="container py-5">
        <div class="row align-items-center g-5">
            <div class="col-lg-7">
                <p class="text-uppercase text-primary fw-semibold mb-2 small">Laboratorio de ingeniería</p>
                <h1 class="display-5 fw-bold mb-3">Ideas convertidas en software, un proyecto a la vez.</h1>
                <p class="lead text-secondary mb-4">
                    Este es mi espacio personal para diseñar, construir y documentar proyectos de desarrollo:
                    sistemas de gestión, análisis de datos, ciberseguridad y más.
                </p>
                <div class="d-flex gap-3">
                    <a href="#proyectos" class="btn btn-primary btn-lg">Ver proyectos</a>
                    <a href="#sobre-mi" class="btn btn-outline-secondary btn-lg">Sobre mí</a>
                </div>
            </div>
            <div class="col-lg-5">
                <div class="hero-card p-4 rounded-4">
                    <div class="d-flex align-items-center gap-2 mb-3">
                        <span class="dot bg-danger"></span>
                        <span class="dot bg-warning"></span>
                        <span class="dot bg-success"></span>
                    </div>
                    <pre class="mb-0 code-snippet"><code>&gt; whoami
Ingeniero &amp; desarrollador

&gt; stack
PHP · JavaScript · Bootstrap · MySQL

&gt; status
Construyendo <?= count($proyectos) ?> proyecto(s)...</code></pre>
                </div>
            </div>
        </div>
    </div>
</header>

<section id="proyectos" class="py-5">
    <div class="container">
        <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4 gap-3">
            <div>
                <h2 class="fw-bold mb-1">Proyectos</h2>
                <p class="text-secondary mb-0">Cosas que estoy construyendo o planeando construir.</p>
            </div>
            <div class="btn-group flex-wrap" role="group" aria-label="Filtrar por categoría" id="filtroCategorias">
                <button type="button" class="btn btn-sm btn-primary" data-categoria="todos">Todos</button>
                <?php foreach ($categorias as $categoria): ?>
                    <button type="button" class="btn btn-sm btn-outline-primary" data-categoria="<?= htmlspecialchars($categoria) ?>">
                        <?= htmlspecialchars($categoria) ?>
                    </button>
                <?php endforeach; ?>
            </div>
        </div>

        <div class="row g-4" id="listaProyectos">
            <?php foreach ($proyectos as $proyecto): ?>
                <?php $estado = $estadoLabels[$proyecto['estado']] ?? $estadoLabels['planificado']; ?>
                <div class="col-md-6 col-lg-4 proyecto-item" data-categoria="<?= htmlspecialchars($proyecto['categoria']) ?>">
                    <div class="card h-100 project-card">
                        <div class="card-body d-flex flex-column">
                            <div class="d-flex justify-content-between align-items-start mb-3">
                                <div class="icon-badge">
                                    <i class="bi <?= htmlspecialchars($proyecto['icono']) ?>"></i>
                                </div>
                                <span class="badge <?= $estado['clase'] ?>"><?= $estado['texto'] ?></span>
                            </div>
                            <h3 class="h5 card-title"><?= htmlspecialchars($proyecto['nombre']) ?></h3>
                            <p class="card-text text-secondary flex-grow-1"><?= htmlspecialchars($proyecto['descripcion']) ?></p>
                            <div class="d-flex flex-wrap gap-2 mb-3">
                                <?php foreach ($proyecto['tecnologias'] as $tecnologia): ?>
                                    <span class="badge tech-badge"><?= htmlspecialchars($tecnologia) ?></span>
                                <?php endforeach; ?>
                            </div>
                            <?php if ($proyecto['enlace']): ?>
                                <a href="<?= htmlspecialchars($proyecto['enlace']) ?>" class="btn btn-sm btn-outline-primary mt-auto">Ver proyecto</a>
                            <?php else: ?>
                                <button class="btn btn-sm btn-outline-secondary mt-auto" disabled>Próximamente</button>
                            <?php endif; ?>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<section id="sobre-mi" class="py-5 bg-body-tertiary">
    <div class="container">
        <div class="row g-5 align-items-center">
            <div class="col-lg-6">
                <h2 class="fw-bold mb-3">Sobre mí</h2>
                <p class="text-secondary">
                    Soy ingeniero y desarrollador, y uso este laboratorio como un espacio para aprender construyendo:
                    cada proyecto es una excusa para profundizar en un área distinta, desde la gestión de procesos
                    hasta el análisis de datos y la ciberseguridad.
                </p>
            </div>
            <div class="col-lg-6">
                <div class="row g-3">
                    <div class="col-6">
                        <div class="stat-card p-3 rounded-3 text-center">
                            <div class="fs-3 fw-bold"><?= count($proyectos) ?></div>
                            <div class="text-secondary small">Proyectos en el lab</div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="stat-card p-3 rounded-3 text-center">
                            <div class="fs-3 fw-bold"><?= count($categorias) ?></div>
                            <div class="text-secondary small">Áreas exploradas</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<section id="contacto" class="py-5">
    <div class="container text-center">
        <h2 class="fw-bold mb-3">Contacto</h2>
        <p class="text-secondary mb-4">¿Quieres hablar sobre alguno de estos proyectos? Escríbeme.</p>
        <a href="https://github.com/JAlessandro217" target="_blank" rel="noopener" class="btn btn-primary btn-lg">
            <i class="bi bi-github me-2"></i>Ver mi GitHub
        </a>
    </div>
</section>

<?php require __DIR__ . '/includes/footer.php'; ?>
