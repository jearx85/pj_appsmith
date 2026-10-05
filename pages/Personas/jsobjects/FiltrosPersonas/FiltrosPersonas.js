export default {
	// Un filtro cambio: vuelve a la pagina 1 y consulta.
	aplicar: async () => {
		try { await resetWidget('data_table', false); } catch (e) { /* sin estado que reiniciar */ }
		return SelectQuery.run();
	},
	limpiar: async () => {
		for (const w of ['DatePickerDesde', 'DatePickerHasta', 'Select_Municipio', 'Select_Vinculacion', 'Select_Familia']) {
			await resetWidget(w, true);
		}
		return FiltrosPersonas.aplicar();
	}
}