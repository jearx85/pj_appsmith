export default {
  async cargar(spoa_expediente) {
    const data = await Get_Caso_By_Expediente.run({ spoa_expediente });
    const caso = data?.[0] ?? {};

    codigo_cct.setValue(caso.codigo_cct || "");
    spoa_expediente.setValue(caso.spoa_expediente || "");
    oficio.setValue(caso.oficio || "");
    remitido.setSelectedOption(caso.remitido || "");
  	fecha_hora_hechos.setValue(caso.fecha_hora_hechos);
		valor_buscar.setValue(caso.expediente);
		clase_accidente.setSelectedOption(caso.clase_accidente);
		otro_clase_accidente.setValue(caso.otro_clase_accidente);
		tipo_fiscal.setSelectedOption(caso.tipo_fiscal);
		nombre_fiscal.setValue(caso.nombre_fiscal);
		id_fiscal.setValue(caso.id_fiscal);
		choque_con.setSelectedOption(caso.choque_con);
		objeto_fijo.setSelectedOption(caso.objeto_fijo);
		
		await storeValue(caso.codigo_cct || "");
		await storeValue(caso.spoa_expediente || "");
		await storeValue(caso.oficio || "");
		await storeValue(caso.remitido || "");
		await storeValue(caso.fecha_hora_hechos);
		await storeValue(caso.expediente);
		await storeValue(caso.clase_accidente);
		await storeValue(caso.otro_clase_accidente);
		await storeValue(caso.tipo_fiscal);
		await storeValue(caso.nombre_fiscal);
		await storeValue(caso.id_fiscal);
		await storeValue(caso.choque_con);
		await storeValue(caso.objeto_fijo);

    return caso;
  }
}
