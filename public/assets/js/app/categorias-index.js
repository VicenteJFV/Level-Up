// Render dinámico de categorías en index.html según productos existentes

document.addEventListener('DOMContentLoaded', () => {
  function renderCategorias() {
    const root = document.getElementById('categorias-destacadas');
    if (!root) return;
    if (!window.PRODUCTOS) {
      root.innerHTML = '<div class="alert alert-warning">No se encontró la lista de productos.</div>';
      console.warn('PRODUCTOS no está definido en window');
      setTimeout(renderCategorias, 100);
      return;
    }
    if (!Array.isArray(PRODUCTOS) || PRODUCTOS.length === 0) {
      root.innerHTML = '<div class="alert alert-info">No hay productos para mostrar categorías.</div>';
      console.info('PRODUCTOS está vacío');
      return;
    }
    const categorias = {};
    PRODUCTOS.forEach(p => {
      if (!categorias[p.categoria]) categorias[p.categoria] = [];
      categorias[p.categoria].push(p);
    });
    const html = Object.entries(categorias).map(([cat, productos]) => {
      let hash = cat.toLowerCase().replace(/\s+/g, '-');
      let desc = productos.map(p => p.nombre).slice(0, 3).join(', ');
      return `
        <div class="col-6 col-md-4 col-lg-3 mb-3">
          <a class="card card-category" href="productos.html#${hash}">
            <div class="card-body">
              <h3>${cat}</h3>
              <p class="m-0 text-secondary small">${desc}</p>
            </div>
          </a>
        </div>
      `;
    }).join('');
    root.innerHTML = html || '<div class="alert alert-info">No hay categorías para mostrar.</div>';
    console.log('Render de categorías ejecutado', categorias);
  }
  renderCategorias();
});
