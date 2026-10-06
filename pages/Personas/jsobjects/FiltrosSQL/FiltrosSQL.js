export default {
	// Valores seguros (comillas escapadas) para incrustar en SelectQuery.
	vinculacion: () => String(Select_Vinculacion.selectedOptionValue || 'TODOS').replace(/'/g, "''"),
	oficio: () => String(filtro_oficio.text || '').trim().replace(/'/g, "''"),
	busqueda: () => String(data_table.searchText || '').replace(/'/g, "''")
}