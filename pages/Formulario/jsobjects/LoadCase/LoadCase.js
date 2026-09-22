export default {
  async init() {
    await this.cargarCaso(""); // modo crear
  },

  async cargarCaso(expediente) {
    if (!expediente || expediente.trim() === "") {
      await storeValue("buscar", "");
      await storeValue("casoSeleccionado", {});
      await storeValue("caso_pg1", {});
      await storeValue("caso_pg2", {});
      await storeValue("caso_pg3", {});
      return;
    }

    const data = await Get_Caso_By_Expediente.run({ expediente });
    const caso = data?.[0] ?? {};
		
		codigo_cct.setValue(data.codigo_cct)

    await storeValue("buscar", expediente);
    await storeValue("casoSeleccionado", caso);
    await storeValue("caso_pg1", { ...caso });
    await storeValue("caso_pg2", { ...caso });
    await storeValue("caso_pg3", { ...caso });
  }
}
