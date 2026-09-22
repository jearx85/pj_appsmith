export default {
  limitarNumeros: (maxLength) => {
    const valor = id_fiscal.text.replace(/\D/g, '').slice(0, maxLength);
    id_fiscal.setValue(valor);
  }
}
