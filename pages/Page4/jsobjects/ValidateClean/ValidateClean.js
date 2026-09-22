export default {
	validateClean(){
			if(tipo_documento.selectedOptionValue || cedula.text || nacionalidad.selectedOptionValue || nombres.text || apellidos.text){
				value_clean.setValue("false")
			}else{
			value_clean.setValue("true")
		}
	}
}