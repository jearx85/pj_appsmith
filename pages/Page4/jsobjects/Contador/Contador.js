export default {
  incrementarContador() {
    const max = Load_Persona.data?.length || 0;
    const actual = Number(contador.text) || 0;         

    if (actual < max) {
      contador.setValue(actual + 1);              
    }
  },
	decrementarContador() {
		const actual = Number(contador.text) || 0;
		if (actual > 1) {
			contador.setValue(actual - 1);
		} 
	}
}
