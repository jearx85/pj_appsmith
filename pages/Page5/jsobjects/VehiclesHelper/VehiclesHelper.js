export default {
  vehiculo(index, field) {
    return load_vehicle.data?.[index]?.[field] ?? "";
  }
}
