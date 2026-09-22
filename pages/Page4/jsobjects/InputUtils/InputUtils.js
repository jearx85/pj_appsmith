export default {
  upperize(w) {
    const t = (w.text ?? "");
    const up = t.toUpperCase();
    if (t !== up) return w.setValue(up);
    return null;
  },

  upperNombres() {
    return this.upperize(nombres);
  },

  upperApellidos() {
    return this.upperize(apellidos);
  },
};
