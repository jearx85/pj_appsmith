export default {
   async init() {
    const spoa_expediente = appsmith.store.modo === "edicion" ? appsmith.store.buscar : "";
    await this.cargarCaso(spoa_expediente);
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
  }
}