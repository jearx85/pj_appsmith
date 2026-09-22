export default {
  esUsuarioAutorizado: () => {
    return ["smm.citra@gmail.com"]
      .includes(appsmith.user.email);
  },

  abrirModalPersona: () => {
    if (ValidateUser.esUsuarioAutorizado()) {
      showModal('Ml_Modal');
    }
  }
}