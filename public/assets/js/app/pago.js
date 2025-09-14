// Lógica de pago simple para el carrito
// Muestra un modal de confirmación y limpia el carrito

document.addEventListener('DOMContentLoaded', () => {
  const cartBox = document.getElementById('cartBox') || document.getElementById('cartFloating');
  if (!cartBox) return;
  let btnPagar = document.getElementById('btnPagar');
  if (!btnPagar) {
    btnPagar = document.createElement('button');
    btnPagar.className = 'btn btn-success w-100 mt-2';
    btnPagar.id = 'btnPagar';
    btnPagar.textContent = 'Pagar';
    // Insertar después del total si existe
    const cartFooter = cartBox.querySelector('.card-footer');
    if (cartFooter) {
      cartFooter.parentNode.insertBefore(btnPagar, cartFooter.nextSibling);
    } else {
      cartBox.appendChild(btnPagar);
    }
  }
  btnPagar.onclick = function() {
    const cart = (typeof loadCart === 'function') ? loadCart() : [];
    if (!cart.length) {
      alert('El carrito está vacío.');
      return;
    }
    const total = cart.reduce((a, b) => a + b.precio * b.qty, 0);
    if (confirm(`¿Confirmar pago de ${total.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}?`)) {
      if (typeof saveCart === 'function') saveCart([]);
      if (typeof renderCart === 'function') renderCart();
      alert('¡Gracias por tu compra!');
    }
  };
});
