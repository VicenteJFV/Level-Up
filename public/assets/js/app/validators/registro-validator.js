function validarRUN(run) {
	return /^[0-9kK]{7,9}$/.test(run);
}

document.getElementById('formRegistro')?.addEventListener('submit', (e) => {
	e.preventDefault();
	const run = document.getElementById('run').value.trim();
	const nombres = document.getElementById('nombres').value.trim();
	const apellidos = document.getElementById('apellidos').value.trim();
	const correo = document.getElementById('correo').value.trim();
	const direccion = document.getElementById('direccion').value.trim();
	const role = document.getElementById('tipoUsuario').value || 'cliente';
	let ok = true;
	ok = ok && validarRUN(run);
	ok = ok && nombres && nombres.length <= 50;
	ok = ok && apellidos && apellidos.length <= 100;
	ok = ok && correo && correo.length <= 100 && /@(?:duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i.test(correo);
	ok = ok && direccion && direccion.length <= 300;

	if (!ok) {
		alert('Revisa los campos');
		return;
	}

	// ✅ Crear sesión simulada con el rol seleccionado y redirigir
	setAuth({ email: correo, role });
	alert('Registro exitoso. Sesión iniciada como ' + role);
	window.location.href = 'index.html';
});