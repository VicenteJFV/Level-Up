// Render dinámico para producto-detalle.html
// Mapea descripciones detalladas a cada producto por ID

const DESCRIPCIONES = {
  M001: "Un clásico juego de estrategia donde los jugadores compiten por colonizar y expandirse en la isla de Catan. Ideal para 3-4 jugadores y perfecto para noches de juego en familia o con amigos.",
  JM002:
    "Un juego de colocación de fichas donde los jugadores construyen el paisaje alrededor de la fortaleza medieval de Carcassonne. Ideal para 2-5 jugadores y fácil de aprender.",
  AC001:
    "Ofrece una experiencia de juego cómoda con botones mapeables y una respuesta táctil mejorada. Compatible con consolas Xbox y PC.",
  AC002:
    "Proporcionan un sonido envolvente de calidad con un micrófono desmontable y almohadillas de espuma viscoelástica para mayor comodidad durante largas sesiones de juego.",
  CO001:
    "La consola de última generación de Sony, que ofrece gráficos impresionantes y tiempos de carga ultrarrápidos para una experiencia de juego inmersiva.",
  CG001:
    "Un potente equipo diseñado para los gamers más exigentes, equipado con los últimos componentes para ofrecer un rendimiento excepcional en cualquier juego.",
  SG001:
    "Diseñada para el máximo confort, esta silla ofrece un soporte ergonómico y personalización ajustable para sesiones de juego prolongadas.",
  MS001:
    "Con sensor de alta precisión y botones personalizables, este mouse es ideal para gamers que buscan un control preciso y personalización.",
  MP001:
    "Ofrece un área de juego amplia con iluminación RGB personalizable, asegurando una superficie suave y uniforme para el movimiento del mouse.",
  PP001:
    "Una camiseta cómoda y estilizada, con la posibilidad de personalizarla con tu gamer tag o diseño favorito.",
};

function renderProductoDetalle() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  if (!id) return;
  const prod = PRODUCTOS.find((p) => p.id === id);
  if (!prod) return;
  document.getElementById("det-img").src = prod.img;
  document.getElementById("det-img").alt = prod.nombre;
  document.getElementById("det-nombre").textContent = prod.nombre;
  document.getElementById("det-precio").textContent = money(prod.precio);
  document.getElementById("det-descripcion").textContent =
    DESCRIPCIONES[id] || "";
  document.getElementById("btnAdd").onclick = () => addToCart(prod);

  // Llama aquí a renderRelacionados
  renderRelacionados(prod);
}

function toggleCartBox() {
  const cart = typeof loadCart === "function" ? loadCart() : [];
  const box = document.getElementById("cartBox");
  if (!box) return;
  if (cart.length > 0) {
    box.classList.remove("d-none");
  } else {
    box.classList.add("d-none");
  }
}

function renderRelacionados(productoActual) {
  console.log("Producto actual:", productoActual);
  console.log("Productos:", window.PRODUCTOS);
  if (!window.PRODUCTOS) return;
  const relacionados = [];
  const otros = [];

  window.PRODUCTOS.forEach((p) => {
    if (p.id === productoActual.id) return;
    if (p.categoria === productoActual.categoria && relacionados.length < 3) {
      relacionados.push(p);
    } else if (otros.length < 5) {
      otros.push(p);
    }
  });

  // Mezcla relacionados primero, luego otros
  const productosCarrusel = [...relacionados, ...otros].slice(0, 8);

  // Divide en slides de 4 productos cada uno
  const slides = [];
  for (let i = 0; i < productosCarrusel.length; i += 4) {
    slides.push(productosCarrusel.slice(i, i + 4));
  }

  const inner = document.getElementById("relacionados-carousel-inner");
  if (!inner) return;
  inner.innerHTML = slides
    .map(
      (slide, idx) => `
    <div class="carousel-item${idx === 0 ? " active" : ""}">
      <div class="row">
        ${slide
          .map(
            (p) => `
          <div class="col-6 col-md-3">
            <article class="card h-100">
              <img class="card-img-top" src="${p.img}" alt="${p.nombre}">
              <div class="card-body d-flex flex-column">
                <h3 class="h6 mb-1">${p.nombre}</h3>
                <span class="price mb-2">${p.precio.toLocaleString("es-CL", {
                  style: "currency",
                  currency: "CLP",
                })}</span>
                <div class="mt-auto d-flex gap-2">
                  <a class="btn btn-outline-accent btn-sm" href="producto-detalle.html?id=${
                    p.id
                  }">Ver</a>
                  <button class="btn btn-accent btn-sm" data-add="${
                    p.id
                  }">Añadir</button>
                </div>
              </div>
            </article>
          </div>
        `
          )
          .join("")}
      </div>
    </div>
  `
    )
    .join("");
}

// Llama a esta función después de cargar el producto actual
// Ejemplo:
document.addEventListener("DOMContentLoaded", function () {
  renderProductoDetalle();
  toggleCartBox();
  // renderRelacionados(productoActual);
  // Hook para actualizar visibilidad del carrito cuando cambie
  document.addEventListener("cart-updated", toggleCartBox);
});

// Monkey patch renderCart para disparar evento cuando cambie el carrito
if (typeof renderCart === "function") {
  const _renderCart = renderCart;
  window.renderCart = function () {
    _renderCart();
    document.dispatchEvent(new Event("cart-updated"));
  };
}
