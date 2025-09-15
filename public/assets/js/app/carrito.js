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
      img: prod.img, // <-- AGREGA ESTA LÍNEA para guardar la imagen
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
    cartFloating.classList.remove("visible");
    setTimeout(() => {
      cartFloating.innerHTML = ""; // Limpia el contenido después del fade-out
    }, 400);
  } else {
    cartFloating.innerHTML = `
      <div class="cart-header d-flex justify-content-between align-items-center">
        <h2 class="h6 m-0">Carrito</h2>
        <button class="btn btn-sm btn-outline-accent" id="btnClearCart">Vaciar</button>
      </div>
      <div class="cart-body" id="cartItems">${carrito
        .map(
          (x) => `
        <div class="d-flex justify-content-between align-items-center py-1">
          <span class="small">${x.nombre} × ${x.qty}</span>
          <div>
            <span class="small me-2">${(x.precio * x.qty).toLocaleString(
              "es-CL",
              { style: "currency", currency: "CLP" }
            )}</span>
            <button class="btn btn-sm btn-outline-accent" data-remove="${
              x.id
            }">X</button>
          </div>
        </div>
      `
        )
        .join("")}</div>
      <div class="cart-footer d-flex justify-content-between align-items-center">
        <strong>Total:</strong>
        <span id="cartTotal">${carrito
          .reduce((a, b) => a + b.precio * b.qty, 0)
          .toLocaleString("es-CL", {
            style: "currency",
            currency: "CLP",
          })}</span>
      </div>
      <div class="d-grid mt-3">
        <button class="btn btn-accent" id="btnPagar">Pagar</button>
      </div>
    `;
    // Aplica el fade-in
    setTimeout(() => {
      cartFloating.classList.add("visible");
    }, 10);
  }
}

// Llama a renderCarrito() al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  renderCarrito();
});

document.addEventListener("click", (e) => {
  // Eliminar producto del carrito
  const rem = e.target.getAttribute("data-remove");
  if (rem) {
    removeFromCart(rem);
    return;
  }

  // Vaciar carrito
  if (e.target.id === "btnClearCart") {
    saveCart([]);
    renderCart();
    renderCarrito();
    return;
  }

  // Ir a compra.html al apretar "Pagar"
  if (e.target.id === "btnPagar") {
    e.preventDefault();
    window.location.href = "compra.html";
    return;
  }
});
