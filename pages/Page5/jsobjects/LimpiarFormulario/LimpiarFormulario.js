export default {
	LimpiarFormulario() {

		// Limpiar los campos
		placa.setValue("");
		persona_relacionada.setSelectedOption("");
		nombre_persona.setValue("");
		clase_vehiculo.setSelectedOption("");
		servicio.setSelectedOption("");
		empresa.setValue("");
		modelo.setValue("");
		marca.setValue("");
		color.setValue("");
		linea.setValue("");
		obser_vehiculo.setValue("");

		// Cambiar estado a true cuando se limpia el formulario
		value_clean.setValue("true");
	},
	
	ResetCleanFlag() {
		// Si necesitas devolverlo a false después
		value_clean.setValue("false");
	}
}