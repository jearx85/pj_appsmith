export default {
  limpiar(valor) {
    return (valor || "").replace(/'/g, "''");
  }
}