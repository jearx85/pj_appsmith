export default {
  cargarPersona(persona) {
    if (!persona) return;

		tipo_documento.setSelectedOption(persona.tipo_identificacion ?? undefined);
    cedula.setValue(persona.cedula ?? "");
    nombres.setValue(persona.nombres ?? "");
    apellidos.setValue(persona.apellidos ?? "");

    nacionalidad.setSelectedOption(persona.nacionalidad ?? undefined);

    fecha_nacimiento.setValue(
      persona.fecha_nacimiento ? new Date(persona.fecha_nacimiento) : null
    );

    edad.setValue(persona.edad ?? "");

    sexo.setSelectedOption(persona.sexo ?? undefined);

    vinculacion_caso.setSelectedOption(persona.vinculacion_caso ?? undefined);
    condicion.setSelectedOption(persona.condicion ?? undefined);

    movilidad_reducida.setSelectedOption(persona.movilidad_reducida ?? undefined);
    habitante_calle.setSelectedOption(persona.habitante_calle ?? undefined);

    familia.setSelectedOption(persona.familia ?? undefined);

    nombre_familiar.setValue(persona.nombre_familiar ?? "");
    parentesco.setSelectedOption(persona.parentesco ?? undefined);

    documento_familiar.setValue(persona.documento_familiar ?? "");
    telefono.setValue(persona.telefono ?? "");
  }
};
