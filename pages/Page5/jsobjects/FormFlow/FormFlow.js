export default {
  async iniciarNuevoCaso() {
    await clearStore();
    await storeValue("modo", "nuevo");
    await storeValue("newForm", true);
    await navigateTo("Formulario");
  },
  async iniciarEdicion(casoSeleccionado) {
    await clearStore();
    await storeValue("modo", "edicion");
    await storeValue("casoSeleccionado", casoSeleccionado);
    await navigateTo("Formulario");
  },
  async limpiarTodo() {
    await clearStore();
    await storeValue("modo", "nuevo");
    await storeValue("newForm", true);
    return { ok: true };
  }
};