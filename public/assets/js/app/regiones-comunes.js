// Cargar regiones y comunas (select dependiente)
const regiones = [
	{ nombre: 'Región Metropolitana', comunas: ['Santiago', 'Maipú', 'La Florida'] },
	{ nombre: 'Valparaíso', comunas: ['Valparaíso', 'Viña del Mar', 'Quilpué'] }
];

document.addEventListener('DOMContentLoaded', () => {
	const selRegion = document.getElementById('region');
	const selComuna = document.getElementById('comuna');
	if (!selRegion || !selComuna) return;
	selRegion.innerHTML = regiones.map((r, i) => `<option value="${i}">${r.nombre}</option>`).join('');
	selRegion.addEventListener('change', () => {
		const idx = selRegion.value;
		const list = regiones[idx]?.comunas || [];
		selComuna.innerHTML = list.map(c => `<option>${c}</option>`).join('');
	});
	selRegion.dispatchEvent(new Event('change'));
});