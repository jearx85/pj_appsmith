export default {
  timer: null,
  buscarOficio: function () {
    clearTimeout(Debounce.timer);
    Debounce.timer = setTimeout(function () {
      SelectQuery.run();
    }, 400);
  }
}