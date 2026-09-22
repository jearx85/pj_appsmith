export default {
  upperize(w) {
    const t = (w.text ?? "");
    const up = t.toUpperCase();
    if (t !== up) return w.setValue(up);
    return null;
  },

  upperRelato() {
    return this.upperize(relato);
  },

  upperHipotesis() {
    return this.upperize(observaciones_hipotesis);
  },
};
