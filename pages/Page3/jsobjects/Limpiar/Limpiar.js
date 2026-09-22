export default {
  async limpiarTodo() {
    await storeValue("caso_pg3", undefined);
		fecha_hora_levantamiento.setValue("")
		lugar_inspeccion.setSelectedOption("")
		otro_hipotesis.setValue("")
		grupo.setSelectedOption("")
		coordinador.setValue("")
		integrantes.setValue("")
		agente_conoce_caso.setValue("")
		investigador_asignado.setValue("")
		fotos.setValue("")
		videos.setValue("")
		hipotesis.setSelectedOption("")
		otro_hipotesis.setValue("")
		relato.setValue("")
		observaciones_hipotesis.setValue("")
    try {
      resetWidget("", true);
    } catch (e) {
      return { ok: false, error: e.message };
    }
    return { ok: true };
  }
}
