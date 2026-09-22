export default {
  limpiarFormulario() {
    cedula.setValue("");
    nombres.setValue("");
    apellidos.setValue("");
    nacionalidad.setSelectedOption("");
    fecha_nacimiento.setValue("");
    edad.setValue("");
    sexo.setSelectedOption("");
    vinculacion_caso.setSelectedOption("");
    condicion.setSelectedOption("");
    movilidad_reducida.setSelectedOption("No");
    habitante_calle.setSelectedOption("No");
    familia.setSelectedOption("");
    nombre_familiar.setValue("");
    parentesco.setSelectedOption("");
    documento_familiar.setValue("");
    telefono.setValue("");
		chk_nn.setValue(false);
		telefono_indiciado.setValue("");
		value_clean.setValue("true")
  }
}
