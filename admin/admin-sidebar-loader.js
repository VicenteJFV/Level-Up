// Carga el sidebar de admin en el elemento con id 'adminSidebarContainer'
$(function() {
  const $container = $('#adminSidebarContainer');
  if ($container.length) {
    $container.load('partials/sidebar.html', function() {
      // Reasignar evento logout después de cargar el sidebar
      $('#btnAdminLogout').on('click', function() { logout(); });
    });
  }
});
