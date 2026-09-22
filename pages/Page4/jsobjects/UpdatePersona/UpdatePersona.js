export default {
  async actualizarPersona() {
    try {
      const resultado = await Update_persona.run();
      if (!resultado || resultado.length === 0) {
				await Logger.info("ACTUALIZAR_PERSONA_SIN_EFECTO",
					"UPDATE no afectó ninguna fila", { selectedRow: Tbl_personas.selectedRow });
				showAlert("No se actualizó ningún registro. Verifica que la persona esté seleccionada.", "error");
				return null;
			}
      showAlert("Persona actualizada correctamente", "success");
      if (Load_Persona) {
        await Load_Persona.run();
      }
      return resultado;
     } catch (error) {
			await Logger.error("ACTUALIZAR_PERSONA", error, {
				id_persona: Tbl_personas.selectedRow?.id_persona
			});
			showAlert("Error actualizando la persona: " + error.message, "error");
			console.error("Error en actualizarPersona():", error);
			return null;
		}
  }
};