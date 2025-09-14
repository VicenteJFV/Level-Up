const PRODUCTOS = [
	{ id: "M001", categoria: "Juegos de Mesa", nombre: "Catan", precio: 29990, img: "assets/img/productos/catan.jpg" },
	{ id: "JM002", categoria: "Juegos de Mesa", nombre: "Carcassonne", precio: 24990, img: "assets/img/productos/carcassonne.jpg" },
	{ id: "AC001", categoria: "Accesorios", nombre: "Controlador Inalámbrico Xbox Series X", precio: 59990, img: "assets/img/productos/xbox-controller.jpg" },
	{ id: "AC002", categoria: "Accesorios", nombre: "Auriculares Gamer HyperX Cloud II", precio: 79990, img: "assets/img/productos/hyperx.jpg" },
	{ id: "CO001", categoria: "Consolas", nombre: "PlayStation 5", precio: 549990, img: "assets/img/productos/ps5.jpg" },
	{ id: "CG001", categoria: "Computadores Gamers", nombre: "PC Gamer ASUS ROG Strix", precio: 1299990, img: "assets/img/productos/asus-rog.jpg" },
	{ id: "SG001", categoria: "Sillas Gamers", nombre: "Silla Gamer Secretlab Titan", precio: 349990, img: "assets/img/productos/secretlab-titan.jpg" },
	{ id: "MS001", categoria: "Mouse", nombre: "Mouse Gamer Logitech G502 HERO", precio: 49990, img: "assets/img/productos/g502.jpg" },
	{ id: "MP001", categoria: "Mousepad", nombre: "Mousepad Razer Goliathus Extended Chroma", precio: 29990, img: "assets/img/productos/razer-goliathus.jpg" },
	{ id: "PP001", categoria: "Poleras Personalizadas", nombre: "Polera Gamer Personalizada 'Level-Up'", precio: 14990, img: "assets/img/productos/polera-levelup.jpg" }
];
window.PRODUCTOS = PRODUCTOS;

function money(n) {
	return n.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });
}

function renderGrid() {
	const root = document.getElementById('grid-productos');
	if (!root) return;
	root.innerHTML = PRODUCTOS.map(p => `
		<div class="col-6 col-md-4 col-lg-3">
			<article class="card h-100">
				<img class="card-img-top" src="${p.img}" alt="${p.nombre}">
				<div class="card-body d-flex flex-column">
					<h3 class="h6 mb-1">${p.nombre}</h3>
					<span class="price mb-2">${money(p.precio)}</span>
					<div class="mt-auto d-flex gap-2">
						<a class="btn btn-outline-accent btn-sm" href="producto-detalle.html?id=${p.id}">Ver</a>
						<button class="btn btn-accent btn-sm" data-add="${p.id}">Añadir</button>
					</div>
				</div>
			</article>
		</div>
	`).join('');
}

document.addEventListener('click', (e) => {
	const add = e.target.getAttribute('data-add');
	if (add) {
		const prod = PRODUCTOS.find(x => x.id === add);
		if (prod) addToCart(prod);
	}
});

document.addEventListener('DOMContentLoaded', renderGrid);