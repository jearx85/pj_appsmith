export default {
  esUsuarioAutorizado: () => {
    return ["smm.citra@gmail.com"]
      .includes(appsmith.user.email);
  }
}