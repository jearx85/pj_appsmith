export default {
  buildRowCentroVictimas() {
    const pg1 = appsmith.store.caso_pg1 || {};
    const pg3 = appsmith.store.caso_pg3 || {};

    return {
      rows: [
        {
          cells: [
            { column: "Expediente", value: pg1.expediente },
            { column: "Código CCT", value: pg1.codigo_cct },
            { column: "Fecha hora hechos", value: pg1.fecha_hora_hechos },
            { column: "Remitido", value: pg1.remitido },
            { column: "Choque con", value: pg1.choque_con },
            { column: "Objeto fijo", value: pg1.objeto_fijo },
            { column: "Clase accidente", value: pg1.clase_accidente },
            { column: "Otro clase accidente", value: pg1.otro_clase_accidente },
            { column: "Tipo fiscal", value: pg1.tipo_fiscal },
            { column: "Nombre fiscal", value: pg1.nombre_fiscal },
            { column: "ID fiscal", value: pg1.id_fiscal },

            { column: "Fecha hora levantamiento", value: pg3.fecha_hora_levantamiento },
            { column: "Lugar inspección", value: pg3.lugar_inspeccion },
            { column: "Grupo", value: pg3.grupo },
            { column: "Coordinador", value: pg3.coordinador },
            { column: "Integrantes", value: pg3.integrantes },
            { column: "Agente conoce caso", value: pg3.agente_conoce_caso },
            { column: "Investigador asignado", value: pg3.investigador_asignado },
            { column: "Fotos", value: pg3.fotos },
            { column: "Videos", value: pg3.videos },
            { column: "Hipótesis", value: pg3.hipotesis },
            { column: "Otra hipótesis", value: pg3.otro_hipotesis },
            { column: "Relato", value: pg3.relato },
            { column: "Observaciones hipótesis", value: pg3.observaciones_hipotesis }
          ]
        }
      ]
    };
  }
};
