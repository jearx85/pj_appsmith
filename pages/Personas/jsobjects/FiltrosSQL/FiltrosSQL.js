export default {
	// Valores seguros (comillas escapadas) para incrustar en SelectQuery.
	vinculacion: () => String(Select_Vinculacion.selectedOptionValue || 'TODOS').replace(/'/g, "''"),
	busqueda: () => String(data_table.searchText || '').replace(/'/g, "''")
}