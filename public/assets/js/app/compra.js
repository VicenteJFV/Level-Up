const CART_KEY = "lug_cart_v1";
const ENVIO_FIJO = 2500;
let descuento = 0; // Puedes actualizar esto si aplicas un código de descuento
let carrito = JSON.parse(localStorage.getItem(CART_KEY)) || [];

function renderCarrito() {
  const tbody = document.getElementById("cartTableBody");
  const subtotalSpan = document.getElementById("cartSubtotal");
  const envioSpan = document.getElementById("cartEnvio");
  const discountSpan = document.getElementById("cartDiscount");
  const totalSpan = document.getElementById("cartTotal");
  tbody.innerHTML = "";
  let subtotal = 0;

  if (carrito.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" class="text-center">Tu carrito está vacío.</td></tr>`;
    subtotalSpan.textContent = "$0";
    envioSpan.textContent = "$0";
    discountSpan.textContent = "-$0";
    totalSpan.textContent = "$0";
    return;
  }

  carrito.forEach((p, i) => {
    const cantidad = p.qty || p.cantidad || 1;
    const subtotalProd = p.precio * cantidad;
    subtotal += subtotalProd;
    tbody.innerHTML += `
      <tr>
        <td>${p.nombre}</td>
        <td class="text-center">
          ${
            cantidad > 1
              ? `<button class="btn btn-sm btn-outline-accent" data-action="restar" data-index="${i}">-</button>`
              : ""
          }
          <span class="mx-2">${cantidad}</span>
          <button class="btn btn-sm btn-outline-accent" data-action="sumar" data-index="${i}">+</button>
        </td>
        <td class="text-end">${p.precio.toLocaleString("es-CL", {
          style: "currency",
          currency: "CLP",
        })}</td>
        <td class="text-end">${subtotalProd.toLocaleString("es-CL", {
          style: "currency",
          currency: "CLP",
        })}</td>
        <td class="text-end">
          <button class="btn btn-sm btn-outline-danger" data-action="eliminar" data-index="${i}">✖</button>
        </td>
      </tr>
    `;
  });

  subtotalSpan.textContent = subtotal.toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
  });
  envioSpan.textContent = ENVIO_FIJO.toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
  });
  discountSpan.textContent =
    descuento > 0
      ? `-${descuento.toLocaleString("es-CL", {
          style: "currency",
          currency: "CLP",
        })}`
      : "-$0";
  totalSpan.textContent = (subtotal + ENVIO_FIJO - descuento).toLocaleString(
    "es-CL",
    {
      style: "currency",
      currency: "CLP",
    }
  );
}

document.addEventListener("DOMContentLoaded", function () {
  renderCarrito();

  document.addEventListener("click", function (e) {
    if (e.target.dataset.action && e.target.dataset.index !== undefined) {
      const idx = parseInt(e.target.dataset.index);
      if (e.target.dataset.action === "sumar") {
        carrito[idx].qty = (carrito[idx].qty || carrito[idx].cantidad || 1) + 1;
      } else if (e.target.dataset.action === "restar") {
        if ((carrito[idx].qty || carrito[idx].cantidad || 1) > 1) {
          carrito[idx].qty =
            (carrito[idx].qty || carrito[idx].cantidad || 1) - 1;
        }
      } else if (e.target.dataset.action === "eliminar") {
        carrito.splice(idx, 1);
      }
      localStorage.setItem(CART_KEY, JSON.stringify(carrito));
      renderCarrito();
    }

    // Registrar compra en pedidos
    if (e.target.id === "btnCheckout") {
      e.preventDefault();
      if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
      }
      // Guardar pedido en localStorage.lug_pedidos
      const pedidos = JSON.parse(localStorage.getItem('lug_pedidos') || '[]');
      const total = carrito.reduce((a, b) => a + b.precio * (b.qty || 1), 0) + ENVIO_FIJO - descuento;
      pedidos.push({
        fecha: new Date().toISOString(),
        items: carrito.map(p => ({ id: p.id, nombre: p.nombre, qty: p.qty || 1, precio: p.precio })),
        total
      });
      localStorage.setItem('lug_pedidos', JSON.stringify(pedidos));
      // Vaciar carrito y mostrar confirmación
      carrito = [];
      localStorage.setItem(CART_KEY, JSON.stringify(carrito));
      descuento = 0;
      renderCarrito();
      alert("¡Compra realizada con éxito!");
      window.location.href = "index.html";
    }
  });

  // Lógica para aplicar el descuento
  document
    .getElementById("applyDiscount")
    .addEventListener("click", function () {
      const code = document.getElementById("discountCode").value.trim();
      const feedback = document.getElementById("discountFeedback");
      let subtotal = 0;
      carrito.forEach((p) => {
        const cantidad = p.qty || p.cantidad || 1;
        subtotal += p.precio * cantidad;
      });

      if (code === "1111") {
        descuento = Math.round(subtotal * 0.2);
        feedback.textContent = "¡Descuento aplicado correctamente!";
        feedback.classList.remove("text-danger");
        feedback.classList.add("text-success");
      } else {
        descuento = 0;
        feedback.textContent = "Código no válido";
        feedback.classList.remove("text-success");
        feedback.classList.add("text-danger");
      }
      renderCarrito();
    });

  // Lógica para vaciar el carrito
  document
    .getElementById("btnVaciarCarrito")
    .addEventListener("click", function () {
      if (confirm("¿Seguro que quieres vaciar el carrito?")) {
        carrito = [];
        localStorage.setItem(CART_KEY, JSON.stringify(carrito));
        descuento = 0;
        renderCarrito();
        // Limpia feedback de descuento si existe
        const feedback = document.getElementById("discountFeedback");
        if (feedback) {
          feedback.textContent = "";
          feedback.classList.remove("text-success", "text-danger");
        }
      }
    });
});
