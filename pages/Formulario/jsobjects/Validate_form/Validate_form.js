export default {
  validate() {
    // Validar que remitido y choque_con siempre tengan valor
    if (!remitido.selectedOptionValue) {
      return true; // deshabilitar botón
    }
		
		if (spoa.text === "050016000206" || !spoa.text) {
			return true;
		}

		if (expediente.text === "A00" || !expediente.text) {
			return true;
		}
    
    // Validar que clase_accidente tenga valor
    if (!clase_accidente.selectedOptionValue) {
      return true; // deshabilitar botón
    }

    if (!fecha_hora_hechos.selectedDate) {
      return true; // deshabilitar botón
    }
    
    // if (choque_con.selectedOptionValue == "Objeto fijo" && !objeto_fijo.selectedOptionValue) {
      // return true; // deshabilitar botón
    // }
		
		if (clase_accidente.selectedOptionValue == "Otro" && !otro_clase_accidente.text) {
      return true; // deshabilitar botón
    }
    
    return false; // habilitar botón
  }
}