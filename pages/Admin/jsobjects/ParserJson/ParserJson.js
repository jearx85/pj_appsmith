export default {
  formatearDetalle(d) {
    if (!d) return "Sin detalle";
    let out = "";
    for (const key in d) {
      if (key === "stack") continue;
      const valor = typeof d[key] === "object" ? JSON.stringify(d[key]) : d[key];
      out += key.toUpperCase() + ": " + valor + "\n";
    }
    return out;
  }
}