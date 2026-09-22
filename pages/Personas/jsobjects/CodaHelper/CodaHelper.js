export default {
  persona(
    field,
    fallbackValor,
    extraField,
    extraFallbackValor,
    sexoField,
    sexoFallbackValor,
    condicionField,
    condicionFallbackValor
  ) {
    let valor = "";
    try {
      valor = PersonaHelper?.persona(field) ?? "";
    } catch (e) {
      valor = "";
    }

    if (!valor || String(valor).trim() === "") {
      valor = fallbackValor;
    }

    const normalizeValue = (columnName, rawValue) => {
      if (columnName === "Edad_V") {
					const num = Number(rawValue);
					return Number.isNaN(num) ? "" : num;   // "" en vez de null
				}
				// cualquier otro: garantizar string válido, nunca undefined/null
				if (rawValue === null || rawValue === undefined) return "";
				return rawValue;
			};

    const cells = [
      {
        column: field,
        value: normalizeValue(field, valor)
      }
    ];

    if (extraField) {
      let extraValor = "";
      try {
        extraValor = PersonaHelper?.persona(extraField) ?? "";
      } catch (e) {
        extraValor = "";
      }

      if (!extraValor || String(extraValor).trim() === "") {
        extraValor = extraFallbackValor;
      }

      cells.push({
        column: extraField,
        value: normalizeValue(extraField, extraValor)
      });
    }

    if (sexoField) {
      let sexoValor = "";
      try {
        sexoValor = PersonaHelper?.persona(sexoField) ?? "";
      } catch (e) {
        sexoValor = "";
      }

      if (!sexoValor || String(sexoValor).trim() === "") {
        sexoValor = sexoFallbackValor;
      }

      cells.push({
        column: sexoField,
        value: normalizeValue(sexoField, sexoValor)
      });
    }

    if (condicionField) {
      let condicionValor = "";
      try {
        condicionValor = PersonaHelper?.persona(condicionField) ?? "";
      } catch (e) {
        condicionValor = "";
      }

      if (!condicionValor || String(condicionValor).trim() === "") {
        condicionValor = condicionFallbackValor;
      }

      cells.push({
        column: condicionField,
        value: normalizeValue(condicionField, condicionValor)
      });
    }

    return {
      rows: [
        {
          cells: cells
        }
      ]
    };
  },

  centroVictimasRow() {

    const normalizeCentro = (columnName, rawValue) => {
			if (columnName === "Fecha Ocurrencia" || columnName === "Fecha de fallecimiento") {
				if (!rawValue) return "";
				const d = new Date(rawValue);
				return isNaN(d.getTime()) ? "" : d.toISOString();
			}
			if (rawValue === null || rawValue === undefined) return "";
			return rawValue;
		};

    return {
      rows: [
        {
          cells: [
            {
              column: "SPOA/EXPEDIENTE",
              value: normalizeCentro("SPOA/EXPEDIENTE", update_form.formData.expediente)
            },
            {
              column: "Clase de accidente",
              value: normalizeCentro("Clase de accidente", update_form.formData.clase_accidente)
            },
            {
              column: "Calidad de la victima directa",
              value: normalizeCentro("Calidad de la victima directa", update_form.formData.vinculacion_caso)
            },
						 {
              column: "tipo_vinculacion",
              value: normalizeCentro("tipo_vinculacion", update_form.formData.vinculacion_caso)
            },
						{
              column: "VM_V",
              value: normalizeCentro("VM_V", update_form.formData.clase_vehiculo)
            },
						{
              column: "TI_V",
              value: normalizeCentro("TI_V", update_form.formData.tipo_identificacion)
            },
            {
              column: "ID V",
              value: normalizeCentro("ID V", update_form.formData.cedula)
            },
            {
              column: "Relato",
              value: normalizeCentro("Relato", update_form.formData.relato)
            },
            {
              column: "Hipótesis",
              value: normalizeCentro("Hipótesis", update_form.formData.hipotesis)
            },
            {
              column: "Fecha Ocurrencia",
              value: normalizeCentro("Fecha Ocurrencia", update_form.formData.fecha_hora_hechos)
            },
            {
              column: "Fecha de fallecimiento",
              value: normalizeCentro("Fecha de fallecimiento", update_form.formData.fecha_hora_levantamiento)
            },
            {
              column: "Lugar inspeccion",
              value: normalizeCentro("Lugar inspeccion", update_form.formData.lugar_inspeccion)
            },
						{
              column: "telefono_v",
              value: normalizeCentro("telefono_v", update_form.formData.telefono_involucrado)
            },
						{
              column: "enviado_desde",
              value: normalizeCentro("enviado_desde", "Enviado desde appsmith")
            }
          ]
        }
      ]
    };
  },

  personaConCaso(nombresFallback, edadFallback, sexoFallback, condicionFallback) {
		const base = this.persona(
			"Nombre_V",
			nombresFallback,
			"Edad_V",
			edadFallback,
			"Sexo_V",
			sexoFallback,
			"Condicion_v",
			condicionFallback
		);

		const toISO = (val) => {
			if (!val) return "";
			const d = new Date(val);
			return isNaN(d.getTime()) ? "" : d.toISOString();
		};

		const extraCells = [
			{ column: "SPOA/EXPEDIENTE",               value: update_form.formData.expediente || "" },
			{ column: "Clase de accidente",            value: update_form.formData.clase_accidente || "" },
			{ column: "Calidad de la victima directa", value: update_form.formData.vinculacion_caso || "" },
			{ column: "VM_V", value: update_form.formData.clase_vehiculo || "" },
			{ column: "tipo_vinculacion", value: update_form.formData.vinculacion_caso || "" },
			{ column: "TI_V",                          value: data_table.triggeredRow.tipo_identificacion || "" },
			{ column: "NI_V",                          value: data_table.triggeredRow.cedula || "" },
			{ column: "Relato",                        value: update_form.formData.relato || "" },
			{ column: "Hipótesis",                     value: update_form.formData.hipotesis || "" },
			{ column: "Fecha Ocurrencia",              value: toISO(update_form.formData.fecha_hora_hechos) },
			{ column: "Fecha de fallecimiento",        value: toISO(update_form.formData.fecha_hora_levantamiento) },
			{ column: "Lugar inspeccion",              value: update_form.formData.lugar_inspeccion || "" },
			{ column: "Nombre_PA",                     value: update_form.formData.nombre_familiar || "" },
			{ column: "Parentesco_PA",                 value: update_form.formData.parentesco || "" },
			{ column: "NI PA",                         value: update_form.formData.documento_familiar || "" },
			{ column: "Teléfono PA",                   value: update_form.formData.telefono || "" },
			{ column: "telefono_v",                    value: update_form.formData.telefono_involucrado || "" },
			{ column: "enviado_desde",                 value: "Enviado desde appsmith" || "" }, 
			{ column: "Gravedad del siniestro",        value: "Homicidio" || ""}
		];

		base.rows[0].cells = base.rows[0].cells.concat(extraCells);
		return base;
	}
};
