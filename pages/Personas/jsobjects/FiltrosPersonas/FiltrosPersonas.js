export default {
	// Carga inicial de la pagina (tabla, filtros y graficos). Se lanza explicitamente para no depender
	// del orden en que Appsmith ejecuta las consultas al abrir la pagina.
	iniciar: async () => {
		const consultas = [getVinculaciones, getAniosDisponibles, Select_total_occisos, Select_occisos_mes, getInvolucradosPorMesRango, SelectQuery];
		const res = await Promise.allSettled(consultas.map((q) => q.run()));
		const fallo = res.find((r) => r.status === 'rejected');
		if (fallo) showAlert('No se pudieron cargar algunos datos: ' + (fallo.reason && fallo.reason.message ? fallo.reason.message : fallo.reason), 'error');
	},
	// Oficio y expediente: espera 400 ms despues de la ultima tecla antes de consultar.
	timerTexto: null,
	buscarTexto: () => {
		clearTimeout(FiltrosPersonas.timerTexto);
		FiltrosPersonas.timerTexto = setTimeout(() => FiltrosPersonas.aplicar(), 400);
	},
	// Un filtro cambio: vuelve a la pagina 1 y consulta.
	// Con scroll infinito la tabla acumula filas: se vacia la data anterior y se reinicia la tabla
	// ANTES de consultar, para que no queden filas del listado sin filtrar.
	aplicar: async () => {
		try { await SelectQuery.clear(); } catch (e) { /* ya estaba vacia */ }
		try { await resetWidget('data_table', true); } catch (e) { /* sin estado que reiniciar */ }
		return SelectQuery.run();
	},
	limpiar: async () => {
		for (const w of ['DatePickerDesde', 'DatePickerHasta', 'Select_Municipio', 'Select_Vinculacion', 'Select_Familia', 'filtro_oficio', 'filtro_expediente']) {
			await resetWidget(w, true);
		}
		return FiltrosPersonas.aplicar();
	}
}