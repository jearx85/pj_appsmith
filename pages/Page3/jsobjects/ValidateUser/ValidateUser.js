export default {
  esUsuarioAutorizado: () => {
    return ["smm.citra@gmail.com", "johana.cadavid@medellin.gov.co", "juanf.sanchez@medellin.gov.co",
						"Juand.velez@medellin.gov.co",
						"Johana.cadavid@medellin.go.co",
						"mauricio.velez@medellin.gov.co",
						"catalina.mejiaz@medellin.gov.co",
						"gloria.sanchez@medellin.gov.co",
						"patricia.paniagua@medellin.gov.co",
						"yudy.uribe@medellin.gov.co", "yohiner.alzate@medellin.gov.co", "diego.gonzalez@medellin.gov.co", "camilo.davila@medellin.gov.co", "juand.velez@medellin.gov.co"]
      .includes(appsmith.user.email);
  }
}