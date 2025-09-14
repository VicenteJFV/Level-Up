document.getElementById('formContacto')?.addEventListener('submit', (e) => {
	e.preventDefault();
	const nombre = document.getElementById('cNombre').value.trim();
	const correo = document.getElementById('cCorreo').value.trim();
	const comentario = document.getElementById('cComentario').value.trim();
	let ok = true;
	ok = ok && nombre && nombre.length <= 100;
	ok = ok && correo && correo.length <= 100 && /@(?:duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i.test(correo);
	ok = ok && comentario && comentario.length <= 500;
	alert(ok ? 'Mensaje enviado (simulado)' : 'Revisa los campos');
});