export default {
  async actualizarPersona() {
    // Guardia: sin fila seleccionada, selectedRow.id_persona llega como "" y
    // Postgres falla con 'invalid input syntax for integer: ""'.
    const idPersona = Tbl_personas.selectedRow?.id_persona;
    if (idPersona === undefined || idPersona === null || idPersona === "") {
      showAlert("Selecciona una persona de la tabla antes de actualizar.", "warning");
      return null;
    }

    try {
      const resultado = await Update_persona.run();
      if (!resultado || resultado.length === 0) {
        await Logger.info("ACTUALIZAR_PERSONA_SIN_EFECTO",
          "UPDATE no afectó ninguna fila", { id_persona: idPersona });
        showAlert("No se actualizó ningún registro. Verifica que la persona esté seleccionada.", "error");
        return null;
      }
      showAlert("Persona actualizada correctamente", "success");
      return resultado;
    } catch (error) {
      await Logger.error("ACTUALIZAR_PERSONA", error, { id_persona: idPersona });
      showAlert("Error actualizando la persona: " + error.message, "error");
      console.error("Error en actualizarPersona():", error);
      return null;
    }
  }
};
