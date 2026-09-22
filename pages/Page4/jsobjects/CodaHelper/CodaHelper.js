export default {
  persona(
    index,
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
      valor = PersonaHelper?.persona(index, field) ?? "";
    } catch (e) {
      valor = "";
    }

    if (!valor || String(valor).trim() === "") {
      valor = fallbackValor;
    }

    const normalizeValue = (columnName, rawValue) => {
      if (columnName === "Edad V") {
        const num = Number(rawValue);
        return Number.isNaN(num) ? null : num;
      }
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
        extraValor = PersonaHelper?.persona(index, extraField) ?? "";
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
        sexoValor = PersonaHelper?.persona(index, sexoField) ?? "";
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
        condicionValor = PersonaHelper?.persona(index, condicionField) ?? "";
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
    const pg1 = appsmith.store.caso_pg1 || {};
    const pg3 = appsmith.store.caso_pg3 || {};

    const normalizeCentro = (columnName, rawValue) => {
      if (!rawValue) return null;
      if (columnName === "Fecha Ocurrencia" || columnName === "Fecha de fallecimiento") {
        const d = new Date(rawValue);
        return isNaN(d.getTime()) ? null : d.toISOString();
      }
      return rawValue;
    };

    return {
      rows: [
        {
          cells: [
            {
              column: "SPOA/EXPEDIENTE",
              value: normalizeCentro("SPOA/EXPEDIENTE", pg1.spoa_expediente)
            },
            {
              column: "Clase de accidente",
              value: normalizeCentro("Clase de accidente", pg1.clase_accidente)
            },
            {
              column: "Calidad de la victima directa",
              value: normalizeCentro("Calidad de la victima directa", vinculacion_caso.selectedOptionValue)
            },
            {
              column: "ID V",
              value: normalizeCentro("ID V", cedula.text)
            },
            {
              column: "Relato",
              value: normalizeCentro("Relato", pg3.relato)
            },
            {
              column: "Hipótesis",
              value: normalizeCentro("Hipótesis", pg3.hipotesis)
            },
            {
              column: "Fecha Ocurrencia",
              value: normalizeCentro("Fecha Ocurrencia", pg1.fecha_hora_hechos)
            },
            {
              column: "Fecha de fallecimiento",
              value: normalizeCentro("Fecha de fallecimiento", pg3.fecha_hora_levantamiento)
            },
            {
              column: "Lugar inspeccion",
              value: normalizeCentro("Lugar inspeccion", pg3.lugar_inspeccion)
            }
          ]
        }
      ]
    };
  },

  personaConCaso(index, nombresFallback, edadFallback, sexoFallback, condicionFallback) {
    const base = this.persona(
      index,
      "Nombre Victima",
      nombresFallback,
      "Edad V",
      edadFallback,
      "Sexo V",
      sexoFallback,
      "Condición",
      condicionFallback
    );

    const pg1 = appsmith.store.caso_pg1 || {};
    const pg3 = appsmith.store.caso_pg3 || {};

    const extraCells = [
      {
        column: "SPOA/EXPEDIENTE",
        value: pg1.spoa_expediente || null
      },
      {
        column: "Clase de accidente",
        value: pg1.clase_accidente || null
      },
      {
        column: "Calidad de la victima directa",
        value: vinculacion_caso.selectedOptionValue || null
      },
      {
        column: "ID V",
        value: cedula.text || null
      },
      {
        column: "Relato",
        value: pg3.relato || null
      },
      {
        column: "Hipótesis",
        value: pg3.hipotesis || null
      },
      {
        column: "Fecha Ocurrencia",
        value: pg1.fecha_hora_hechos
          ? new Date(pg1.fecha_hora_hechos).toISOString()
          : null
      },
      {
        column: "Fecha de fallecimiento",
        value: pg3.fecha_hora_levantamiento
          ? new Date(pg3.fecha_hora_levantamiento).toISOString()
          : null
      },
      {
        column: "Lugar inspeccion",
        value: pg3.lugar_inspeccion || null
      }
    ];

    base.rows[0].cells = base.rows[0].cells.concat(extraCells);
    return base;
  }
};
