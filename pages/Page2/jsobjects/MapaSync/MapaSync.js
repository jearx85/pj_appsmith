export default {
		async sincronizarDesdeMapa(lat, lng) {
		await storeValue('mapLatitud', lat);
		await storeValue('mapLongitud', lng);
		await storeValue('manualLatitud', lat);
		await storeValue('manualLongitud', lng);
		resetWidget("latitud", true);
		resetWidget("longitud", true);
	}
}