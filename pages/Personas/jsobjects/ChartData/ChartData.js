export default {
	getAnios: () => {
		const rows = getAniosDisponibles.data || [];
		return rows.map(r => ({ label: r.anio, value: r.anio }));
	},
	getTiposVinculacion: () => {
		// Si la query aun no corrio (o fallo) se usa una lista base, para que el select nunca quede con sourceData vacio.
		const base = ['Occiso', 'Indiciado (conductor)', 'Indiciados', 'Testigo', 'Víctima (Lesionado)'];
		const rows = getVinculaciones.data || [];
		const vals = rows.length ? rows.map(r => r.vinculacion_caso) : base;
		return vals.map(v => ({ label: v, value: v }));
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