// Carga dinámica de header y footer desde partials en todas las páginas
function includePartial(id, url) {
    fetch(url)
        .then(res => res.text())
        .then(html => {
            document.getElementById(id).innerHTML = html;
            if (id === 'app-header' && window.initNavbarUI) {
                window.initNavbarUI();
            }
        });
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('app-header')) {
        includePartial('app-header', 'partials/header.html');
    }
    if (document.getElementById('app-footer')) {
        includePartial('app-footer', 'partials/footer.html');
    }
});
