export default {
  async init() {
  const modo = appsmith.store.modo;
  const casoExistente = appsmith.store.casoSeleccionado?.spoa_expediente;

  if (modo === "edicion" && casoExistente) {
    // Ya viene con datos cargados desde FormFlow.iniciarEdicion()
    // Solo aseguramos que caso_pg1/2/3 estén sincronizados y reseteamos los widgets
    const caso = appsmith.store.casoSeleccionado;
    await storeValue("buscar", casoExistente);
    await storeValue("caso_pg1", { ...caso });
    await storeValue("caso_pg2", { ...caso });
    await storeValue("caso_pg3", { ...caso });
    this.resetFormWidgets();
  } else {
    // Modo nuevo, o no hay nada cargado todavía
    await this.cargarCaso("");
  }
},

  async cargarCaso(spoa_expediente) {
    // Limpiar siempre las claves del mapa/inputs antes de cargar
    await storeValue("manualLatitud", undefined);
    await storeValue("manualLongitud", undefined);
    await storeValue("mapLatitud", undefined);
    await storeValue("mapLongitud", undefined);

    if (!spoa_expediente || spoa_expediente.trim() === "") {
      await storeValue("buscar", "");
      await storeValue("casoSeleccionado", {});
      await storeValue("caso_pg1", {});
      await storeValue("caso_pg2", {});
      await storeValue("caso_pg3", {});
      this.resetFormWidgets();
      return;
    }

    const data = await Get_Caso_By_Expediente.run({ spoa_expediente });
    const caso = data?.[0] ?? {};

    await storeValue("buscar", spoa_expediente);
    await storeValue("casoSeleccionado", caso);
    await storeValue("caso_pg1", { ...caso });
    await storeValue("caso_pg2", { ...caso });
    await storeValue("caso_pg3", { ...caso });

    this.resetFormWidgets();
  },

		resetFormWidgets() {
			resetWidget("latitud", true);
			resetWidget("longitud", true);
			resetWidget("expediente", true);
			resetWidget("spoa", true);
			resetWidget("spoa_expediente", true);
			resetWidget("codigo_cct", true);
			resetWidget("oficio", true);
			resetWidget("remitido", true);
			resetWidget("fecha_hora_hechos", true);
			resetWidget("clase_accidente", true);
			resetWidget("otro_clase_accidente", true);
			resetWidget("tipo_fiscal", true);
			resetWidget("nombre_fiscal", true);
			resetWidget("id_fiscal", true);
			resetWidget("choque_con", true);
			resetWidget("objeto_fijo", true);
			// agrega aquí cualquier otro widget de Page2 / Page3 que dependa de casoSeleccionado o caso_pgX
		},
	
		actualizarSpoaExpediente() {
		spoa_expediente.setValue(spoa.text.trim() + expediente.text.trim()).then(() => {
			storeValue('caso_pg1', {
				...appsmith.store.caso_pg1,
				spoa: spoa.text.trim(),
				expediente: expediente.text.trim(),
				spoa_expediente: spoa.text.trim() + expediente.text.trim()
			});
			if (appsmith.store.modo === "nuevo") {
				return GetKey.run();
			}
		});
	}
}