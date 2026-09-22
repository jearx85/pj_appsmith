export default {
  cargarVehiculo(vehiculo) {
    if (!vehiculo) return;

    persona_relacionada.setSelectedOption(vehiculo.num_documento_relacionado ?? undefined);
    clase_vehiculo.setSelectedOption(vehiculo.clase_vehiculo ?? undefined);
    servicio.setSelectedOption(vehiculo.servicio ?? undefined);
    empresa.setValue(vehiculo.empresa ?? "");
    placa.setValue(vehiculo.placa ?? "");
    modelo.setValue(vehiculo.modelo ?? "");
		marca.setValue(vehiculo.marca ?? "");
		color.setValue(vehiculo.color ?? "");
		linea.setValue(vehiculo.linea ?? "");
		obser_vehiculo.setValue(vehiculo.observaciones ?? "");
  }
};
