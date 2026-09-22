export default {
  PIN_ADMIN: "1234",
  validarPin: () => {
    if (InputPin.text === Auth.PIN_ADMIN) {
      resetWidget("InputPin");
      closeModal(ModalAdmin.name);
      navigateTo("Admin", {}, "SAME_WINDOW");
    } else {
      showAlert("PIN incorrecto", "error");
      resetWidget("InputPin");
    }
  }
}