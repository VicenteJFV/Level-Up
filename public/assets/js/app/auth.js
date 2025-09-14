// Manejo básico de autenticación en front (simulado)
// Usa localStorage para guardar sesión y tipo de rol

const AUTH_KEY = 'lug_auth_v1';

function setAuth(user) {
	localStorage.setItem(AUTH_KEY, JSON.stringify(user));
}

function getAuth() {
	try {
		return JSON.parse(localStorage.getItem(AUTH_KEY)) || null;
	} catch {
		return null;
	}
}

function clearAuth() {
	localStorage.removeItem(AUTH_KEY);
}

// Simulación de login
function login(email, role = "cliente") {
	const user = { email, role };
	setAuth(user);
	return user;
}

// Chequear si hay sesión
function isLogged() {
	return !!getAuth();
}

// Cerrar sesión
function logout() {
	clearAuth();
	location.href = 'login.html';
}

// Proteger vistas admin (ejemplo)
function requireRole(roles) {
	const user = getAuth();
	if (!user || !roles.includes(user.role)) {
		alert('Acceso denegado. Requiere rol: ' + roles.join(','));
		location.href = '../public/login.html';
	}
}

// =========================
// Conexión a formularios
// =========================

document.addEventListener('DOMContentLoaded', () => {
	// Login
	const formLogin = document.getElementById('formLogin');
	if (formLogin) {
		formLogin.addEventListener('submit', (e) => {
			e.preventDefault();
			const email = document.getElementById('loginCorreo').value.trim();
			const pass = document.getElementById('loginPass').value.trim();
			if (email && pass) {
				// Por defecto rol cliente, pero puedes extender según correo
				login(email, 'cliente');
				alert('Bienvenido, sesión iniciada.');
				location.href = 'index.html';
			} else {
				alert('Credenciales inválidas');
			}
		});
	}

	// Registro
	const formRegistro = document.getElementById('formRegistro');
	if (formRegistro) {
		formRegistro.addEventListener('submit', (e) => {
			e.preventDefault();
			const correo = document.getElementById('correo').value.trim();
			const tipoUsuario = document.getElementById('tipoUsuario').value;
			if (correo && tipoUsuario) {
				login(correo, tipoUsuario); // guarda sesión con rol elegido
				alert('Cuenta creada e iniciada sesión.');
				location.href = 'index.html';
			} else {
				alert('Revisa los campos');
			}
		});
	}
});