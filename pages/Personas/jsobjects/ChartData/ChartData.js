export default {
  getAnios: () => {
		const rows = getAniosDisponibles.data || [];
		return rows.map(r => ({ label: r.anio, value: r.anio }));
	},
  getTiposVinculacion: () => {
    const rows = getInvolucradosPorMes.data || [];
    const tipos = [...new Set(rows.map(r => r.vinculacion_caso))].filter(Boolean).sort();
    return tipos.map(t => ({ label: t, value: t }));
  },
  getMeses: () => {
    const rows = getInvolucradosPorMes.data || [];
    const anio = Select_anio.selectedOptionValue;
    return [...new Set(
      rows
        .filter(r => !anio || r.mes.startsWith(anio))
        .map(r => r.mes)
    )].sort();
  },
  getSerie: () => {
    const rows = getInvolucradosPorMes.data || [];
    const tipo = SelectCalidadVictima.selectedOptionValue;
    const meses = ChartData.getMeses();
    return meses.map(mes => {
      const filas = rows.filter(r => r.mes === mes && (!tipo || r.vinculacion_caso === tipo));
      const total = filas.reduce((acc, f) => acc + Number(f.cantidad), 0);
      return { x: mes, y: total };
    });
  },
		getTablaAnio: () => {
		const rows = getInvolucradosPorMes.data || [];
		const anio = Select_anio.selectedOptionValue;
		return rows.filter(r => !anio || r.mes.startsWith(anio));
	},
	getTablaRango() {
		const rows = getInvolucradosPorMes.data || [];
		const desde = Select_MesDesde.selectedDate;
		const hasta = Select_MesHasta.selectedDate;
		return rows.filter(r => {
			if (desde && r.mes < desde) return false;
			if (hasta && r.mes > hasta) return false;
			return true;
		});
	}
}