export default {
  persona(index, field) {
    return Load_Persona.data?.[index]?.[field] ?? "";
  }
}
