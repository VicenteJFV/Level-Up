const CART_KEY = "lug_cart_v1";

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(prod) {
  const cart = loadCart();
  const i = cart.findIndex((x) => x.id === prod.id);
  if (i >= 0) {
    cart[i].qty += 1;
  } else {
    cart.push({
      id: prod.id,
      nombre: prod.nombre,
      precio: prod.precio,
      qty: 1,
    });
  }
  saveCart(cart);
  renderCart();
  renderCarrito(); // <-- Agrega esta línea para mostrar el carrito inmediatamente
}

function removeFromCart(id) {
  let cart = loadCart().filter((x) => x.id !== id);
  saveCart(cart);
  renderCart();
}

function renderCart() {
  const box = document.getElementById("cartItems");
  const totalEl = document.getElementById("cartTotal");
  if (!box || !totalEl) return;
  const cart = loadCart();
  box.innerHTML = cart
    .map(
      (x) => `
		<div class="d-flex justify-content-between align-items-center py-1">
			<span class="small">${x.nombre} × ${x.qty}</span>
			<div>
				<span class="small me-2">${(x.precio * x.qty).toLocaleString("es-CL", {
          style: "currency",
          currency: "CLP",
        })}</span>
				<button class="btn btn-sm btn-outline-accent" data-remove="${x.id}">X</button>
			</div>
		</div>
	`
    )
    .join("");
  const total = cart.reduce((a, b) => a + b.precio * b.qty, 0);
  totalEl.textContent = total.toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
  });
}

function renderCarrito() {
  const carrito = loadCart();
  const cartFloating = document.getElementById("cartFloating");
  if (!cartFloating) return;

  if (carrito.length === 0) {
    cartFloating.style.display = "none";
    cartFloating.innerHTML = ""; // Limpia el contenido si está vacío
  } else {
    cartFloating.style.display = "block";
    const itemsHtml = carrito
      .map(
        (x) => `
        <div class="d-flex justify-content-between align-items-center py-1">
          <span class="small">${x.nombre} × ${x.qty}</span>
          <div>
            <span class="small me-2">${(x.precio * x.qty).toLocaleString(
              "es-CL",
              {
                style: "currency",
                currency: "CLP",
              }
            )}</span>
            <button class="btn btn-sm btn-outline-accent" data-remove="${
              x.id
            }">X</button>
          </div>
        </div>
      `
      )
      .join("");
    const total = carrito.reduce((a, b) => a + b.precio * b.qty, 0);

    cartFloating.innerHTML = `
      <div class="cart-header d-flex justify-content-between align-items-center">
        <h2 class="h6 m-0">Carrito</h2>
        <button class="btn btn-sm btn-outline-accent" id="btnClearCart">Vaciar</button>
      </div>
      <div class="cart-body" id="cartItems">${itemsHtml}</div>
      <div class="cart-footer d-flex justify-content-between align-items-center">
        <strong>Total:</strong>
        <span id="cartTotal">${total.toLocaleString("es-CL", {
          style: "currency",
          currency: "CLP",
        })}</span>
      </div>
      <div class="d-grid mt-3">
        <button class="btn btn-accent" id="btnPagar">Pagar</button>
      </div>
    `;
  }
}

// Llama a renderCarrito() al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  renderCarrito();
});

document.addEventListener("click", (e) => {
  const rem = e.target.getAttribute("data-remove");
  if (rem) removeFromCart(rem);
  if (e.target.id === "btnClearCart") {
    saveCart([]);
    renderCart();
    renderCarrito();
  }
});

document.addEventListener("click", function (e) {
  if (e.target && e.target.id === "btnPagar") {
    e.preventDefault();
    // Aquí va tu lógica de confirmación de pago
    // Por ejemplo:
    if (confirm("¿Deseas confirmar tu pago?")) {
      window.location.href = "pago.html";
    }
  }
});
