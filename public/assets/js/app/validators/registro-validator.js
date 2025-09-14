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
	const pass = document.getElementById('pass').value;
	const role = document.getElementById('tipoUsuario').value || 'cliente';
	let ok = true;
	ok = ok && validarRUN(run);
	ok = ok && nombres && nombres.length <= 50;
	ok = ok && apellidos && apellidos.length <= 100;
	ok = ok && correo && correo.length <= 100 && /@(?:duoc\.cl|profesor\.duoc\.cl|duocuc\.cl|gmail\.com)$/i.test(correo);
	ok = ok && direccion && direccion.length <= 300;
	ok = ok && pass && pass.length >= 4 && pass.length <= 10;

	const alertDiv = document.getElementById('registro-alert');
	function showAlert(msg, type) {
		alertDiv.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">${msg}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`;
	}

	if (!ok) {
		showAlert('Revisa los campos', 'danger');
		return;
	}

	// Guardar usuario y contraseña en localStorage (simple, no seguro)
	let users = JSON.parse(localStorage.getItem('lug_users') || '{}');
	users[correo] = { pass, role };
	localStorage.setItem('lug_users', JSON.stringify(users));

	// ✅ Crear sesión simulada con el rol seleccionado y redirigir
	setAuth({ email: correo, role });
	showAlert('Registro exitoso. Sesión iniciada como ' + role, 'success');
	setTimeout(() => { window.location.href = 'index.html'; }, 1200);
});