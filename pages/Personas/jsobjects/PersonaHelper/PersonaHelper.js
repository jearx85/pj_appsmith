export default {
  persona(field) {
    return SelectQuery.data?.[field] ?? "";
  }
}
