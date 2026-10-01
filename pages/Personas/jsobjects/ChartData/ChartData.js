export default {
	getAnios: () => {
		const rows = getAniosDisponibles.data || [];
		return rows.map(r => ({ label: r.anio, value: r.anio }));
	},
	getTiposVinculacion: () => {
		const rows = getVinculaciones.data || [];
		return rows.map(r => ({ label: r.vinculacion_caso, value: r.vinculacion_caso }));
	},
	// Filas del rango (la query ya filtra fechas y remitido) filtradas ademas por calidad de la victima.
	getTablaRango: () => {
		const rows = getInvolucradosPorMesRango.data || [];
		const tipo = SelectCalidadVictima.selectedOptionValue;
		return rows.filter(r => !tipo || r.vinculacion_caso === tipo);
	},
	// Todos los meses del rango (los meses sin datos salen en 0). Sin rango: solo los meses con datos.
	getMeses: () => {
		const rows = getInvolucradosPorMesRango.data || [];
		const desde = Select_MesDesde.selectedDate;
		const hasta = Select_MesHasta.selectedDate;
		if (desde && hasta) {
			const fin = moment(hasta).startOf('month');
			const meses = [];
			for (let m = moment(desde).startOf('month'); !m.isAfter(fin) && meses.length < 240; m.add(1, 'month')) {
				meses.push(m.format('YYYY-MM'));
			}
			return meses;
		}
		return [...new Set(rows.map(r => r.mes))].sort();
	},
	getSerie: () => {
		const filas = ChartData.getTablaRango();
		return ChartData.getMeses().map(mes => ({
			x: mes,
			y: filas.filter(r => r.mes === mes).reduce((acc, f) => acc + Number(f.cantidad), 0)
		}));
	}
}