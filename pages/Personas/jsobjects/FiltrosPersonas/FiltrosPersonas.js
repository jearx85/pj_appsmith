export default {
	// Opciones del filtro "Vinculacion caso": las que existen en la BD (con lista base si la query aun no corrio).
	opcionesVinculacion: () => {
		return [{ label: 'Todas', value: 'TODOS' }].concat(ChartData.getTiposVinculacion());
	},
	// Valores seguros (comillas escapadas) para incrustar en la consulta SQL.
	vinculacion: () => String(Select_Vinculacion.selectedOptionValue || 'TODOS').replace(/'/g, "''"),
	busqueda: () => String(data_table.searchText || '').replace(/'/g, "''"),
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