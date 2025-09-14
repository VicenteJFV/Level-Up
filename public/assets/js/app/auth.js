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

