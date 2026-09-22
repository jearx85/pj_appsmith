export default {
  async limpiarTodo() {
    // 1) limpiar stores que tu app usa para prefills
    //await storeValue("caso_pg1", undefined);
    await storeValue("caso_pg2", undefined);
    await storeValue("buscar", undefined);
    await storeValue("casoSeleccionado", undefined);
		await latitud.setValue("");
		await longitud.setValue("");

    // 2) reset de widgets de la página actual
    // Intentamos resetear todo (funciona en la mayoría de apps)
    try {
      resetWidget("", true);
    } catch (e) {
      // si falla, lo hacemos por lista (ver opción B)
      return { ok: false, error: e.message };
    }
    return { ok: true };
  }
}
