
function initNavbarUI() {
	const y = document.getElementById('year');
	if (y) y.textContent = new Date().getFullYear();

	try {
		const auth = getAuth?.();
		const nav = document.querySelector('.navbar .navbar-nav');
		if (nav) {
			const loginBtn = document.getElementById('btnIngresar');
			if (auth && loginBtn) {
				const li = loginBtn.closest('li');
				if (li) {
					li.innerHTML = `
						<div class="dropdown">
							<a class="btn btn-accent dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">
								<i class="bi bi-person-circle"></i> ${auth.email.split('@')[0]} (${auth.role})
							</a>
							<ul class="dropdown-menu dropdown-menu-end">
								<li><a class="dropdown-item" href="#">Perfil</a></li>
								<li><a class="dropdown-item" href="productos.html">Mis compras</a></li>
								${auth.role === 'admin' ? '<li><a class="dropdown-item" href="../admin/index.html">Admin</a></li>' : ''}
								<li><hr class="dropdown-divider"></li>
								<li><button class="dropdown-item" id="btnLogout">Cerrar sesión</button></li>
							</ul>
						</div>
					`;
				}
			} else if (!auth && loginBtn) {
				// Asegura que el botón Ingresar esté visible si no hay sesión
				loginBtn.style.display = '';
			}
		}

		document.body.addEventListener('click', (e) => {
			if (e.target && e.target.id === 'btnLogout') {
				e.preventDefault();
				if (typeof logout === 'function') logout();
			}
		});
	} catch (e) {}
}

window.initNavbarUI = initNavbarUI;
document.addEventListener('DOMContentLoaded', initNavbarUI);


