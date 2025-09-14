function validDomain(email) {
	return /@(?:duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i.test(email);
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

	// ✅ Crear sesión simulada y redirigir
	const user = login(email, 'cliente'); // puedes cambiar el rol según necesidad
	alert('Bienvenido, ' + user.email);
	window.location.href = 'index.html';
});