export default {
  timer: null,
  buscarOficio: function () {
    clearTimeout(Debounce.timer);
    Debounce.timer = setTimeout(function () {
      SelectByOficio.run();
    }, 400);
  }
}