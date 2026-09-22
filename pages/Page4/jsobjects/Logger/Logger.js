export default {
  PAGINA_ACTUAL: "Page4", // cambia este valor en cada copia (Page3 → "Page3", Page4 → "Page4", etc.)

  async info(accion, mensaje, extra = {}) {
    try {
      await InsertLog.run({
        accion,
        nivel: "INFO",
        mensaje,
        detalle: JSON.stringify(extra || {}),
        pagina: extra.pagina || this.PAGINA_ACTUAL
      });
    } catch (e) {
      console.error("No se pudo escribir el log:", e);
    }
  },

  async error(accion, err, extra = {}) {
    try {
      await InsertLog.run({
        accion,
        nivel: "ERROR",
        mensaje: String(err?.message || err),
        detalle: JSON.stringify({ ...extra, stack: err?.stack || null }),
        pagina: extra.pagina || this.PAGINA_ACTUAL
      });
    } catch (e) {
      console.error("No se pudo escribir el log de error:", e);
    }
  },

  async loginExitoso() {
    await this.info("LOGIN", "Acceso autorizado");
  },

  async accesoDenegado(motivo) {
    await this.info(
      "ACCESO_DENEGADO",
      motivo || "Usuario autenticado con Google pero sin permisos (no está en usuarios_autorizados o está inactivo)"
    );
  }
};