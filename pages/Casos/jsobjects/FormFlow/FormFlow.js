export default {
  async iniciarNuevoCaso() {
    // 1. Borra TODO el store de un golpe
    await clearStore();

    // 2. Marca explícitamente el modo
    await storeValue("modo", "nuevo");
    await storeValue("newForm", true);

    // 3. Navega al formulario
    await navigateTo("Formulario");

    // 4. Resetea widgets de la página de destino
    //    (esto se ejecuta después de navegar)
    resetWidget("", true);
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
    resetWidget("", true);
    return { ok: true };
  }
};