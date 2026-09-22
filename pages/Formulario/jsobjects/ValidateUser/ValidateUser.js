export default {
  verificarAcceso: async () => {
    const r = await CheckUsuario.run();
    const autorizado = r.length > 0;
    await storeValue("esAutorizado", autorizado);
    await storeValue("placaActual", r[0]?.placa || null);

    // Solo registra el evento una vez por sesión de navegador,
    // no en cada navegación/onPageLoad dentro de la misma sesión.
    const yaRegistrado = appsmith.store.loginRegistrado === true;
    if (!yaRegistrado) {
      if (autorizado) {
        await Logger.loginExitoso();
      } else {
        await Logger.accesoDenegado();
      }
      await storeValue("loginRegistrado", true, false); // false = no persiste, se resetea al recargar
    }
    return autorizado;
  },
  esUsuarioAutorizado: () => {
    return appsmith.store.esAutorizado === true;
  }
}