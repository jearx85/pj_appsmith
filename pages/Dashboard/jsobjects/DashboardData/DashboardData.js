export default {
	// Orden en que se muestran las categorias (siempre las 3, aunque alguna quede en 0).
	CATEGORIAS: ['Vía pública', 'Centros asistenciales', 'Otros lugares'],

	// Filas de la query (por lugar) con los conteos convertidos a numero.
	filas: function () {
		const rows = Select_dashboard_lugares.data || [];
		return rows.map(r => ({
			lugar: r.lugar,
			categoria: r.categoria,
			total: Number(r.total) || 0,
			remitidos: Number(r.remitidos) || 0,
			no_remitidos: Number(r.no_remitidos) || 0,
			sin_dato: Number(r.sin_dato) || 0
		}));
	},

	// Totales de una categoria (suma de todos sus lugares).
	cat: function (nombre) {
		const f = DashboardData.filas().filter(r => r.categoria === nombre);
		const sum = k => f.reduce((acc, r) => acc + r[k], 0);
		return {
			categoria: nombre,
			total: sum('total'),
			remitidos: sum('remitidos'),
			no_remitidos: sum('no_remitidos'),
			sin_dato: sum('sin_dato')
		};
	},

	// Totales generales.
	totales: function () {
		const f = DashboardData.filas();
		const sum = k => f.reduce((acc, r) => acc + r[k], 0);
		return {
			total: sum('total'),
			remitidos: sum('remitidos'),
			no_remitidos: sum('no_remitidos'),
			sin_dato: sum('sin_dato')
		};
	},

	// Porcentaje con un decimal (0 si no hay base).
	pct: function (n, d) {
		return d ? Math.round((n * 1000) / d) / 10 : 0;
	},

	// Tabla resumen: una fila por categoria + fila de total.
	resumen: function () {
		const filas = DashboardData.CATEGORIAS.map(c => DashboardData.cat(c));
		return filas.concat([Object.assign({}, DashboardData.totales(), { categoria: 'TOTAL' })]);
	},

	// Serie del grafico: x = categoria, y = valor de la columna pedida.
	serie: function (campo) {
		return DashboardData.CATEGORIAS.map(c => ({ x: c, y: DashboardData.cat(c)[campo] }));
	},

	// Meses entre el primero y el ultimo con datos; los meses sin casos salen en 0.
	meses: function () {
		const rows = Select_dashboard_meses.data || [];
		if (!rows.length) return [];
		const ES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
		const porMes = {};
		rows.forEach(r => { porMes[r.mes] = r; });
		const fin = moment(rows[rows.length - 1].mes + '-01', 'YYYY-MM-DD');
		const out = [];
		for (let m = moment(rows[0].mes + '-01', 'YYYY-MM-DD'); !m.isAfter(fin) && out.length < 240; m.add(1, 'month')) {
			const r = porMes[m.format('YYYY-MM')] || {};
			out.push({
				label: ES[m.month()] + ' ' + m.format('YY'),
				total: Number(r.total) || 0,
				remitidos: Number(r.remitidos) || 0,
				via_publica: Number(r.via_publica) || 0,
				centros_asistenciales: Number(r.centros_asistenciales) || 0
			});
		}
		return out;
	},

	// Serie del grafico de lineas: x = mes, y = valor de la columna pedida.
	serieMes: function (campo) {
		return DashboardData.meses().map(m => ({ x: m.label, y: m[campo] }));
	}
}
