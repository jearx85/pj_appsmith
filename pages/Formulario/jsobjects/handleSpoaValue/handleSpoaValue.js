export default {
  iniciarPagina1() {
    expediente.setValue(
      valor_buscar.text === "" 
      ? "050016000206"
      : appsmith.store.casoSeleccionado?.spoa_expediente
    );
  }
}
