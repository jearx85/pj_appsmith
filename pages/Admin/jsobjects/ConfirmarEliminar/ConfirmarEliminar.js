export default {
  confirmarEliminar: () => {
    showModal(Modal1.name);
    storeValue("usuarioAEliminar", Table_users.triggeredRow.id);
  }
}