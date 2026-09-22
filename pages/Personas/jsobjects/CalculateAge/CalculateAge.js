export default {
  calcularEdad: (fechaNacimiento) => {
    const birth = new Date(fechaNacimiento);
    if (!birth || isNaN(birth.getTime())) return "";
    const today = new Date();
    let years = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      years--;
    }
    return years;
  }
};
