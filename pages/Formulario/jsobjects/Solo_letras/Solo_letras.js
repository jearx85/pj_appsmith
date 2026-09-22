export default {
  filtrarSoloLetras: () => {
    const textoLimpio = nombre_fiscal.text.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]/g, '');
    nombre_fiscal.setValue(textoLimpio);
  }
}