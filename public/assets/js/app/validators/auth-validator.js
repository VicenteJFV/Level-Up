function validDomain(email) {
	return /@(?:duoc\.cl|profesor\.duoc\.cl|duocuc\.cl|gmail\.com)$/i.test(email);
}

document.getElementById('formLogin')?.addEventListener('submit', (e) => {
	e.preventDefault();
	const email = document.getElementById('loginCorreo').value.trim();
	const pass = document.getElementById('loginPass').value.trim();
	let ok = true;
	if (!email || email.length > 100 || !validDomain(email)) ok = false;
	if (!pass || pass.length < 4 || pass.length > 10) ok = false;

	if (!ok) {
		alert('Revisa los campos');
		return;
	}

	// Validar usuario y contraseña
	let users = JSON.parse(localStorage.getItem('lug_users') || '{}');
	if (!users[email] || users[email].pass !== pass) {
		alert('Correo o contraseña incorrectos');
		return;
	}
	// ✅ Crear sesión simulada y redirigir
	const user = login(email, users[email].role || 'cliente');
	alert('Bienvenido, ' + user.email);
	window.location.href = 'index.html';
});