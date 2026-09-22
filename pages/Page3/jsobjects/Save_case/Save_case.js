export default {
  async guardarCaso() {
    try {
      const validarInteger = (valor, nombreCampo) => {
        if (valor === null || valor === undefined || valor === '') return null;
        const num = parseInt(valor);
        if (isNaN(num)) {
          console.warn(`${nombreCampo} no es un número válido:`, valor);
          return null;
        }
        if (num < -2147483648 || num > 2147483647) {
          throw new Error(`${nombreCampo} fuera de rango (${num})`);
        }
        return num;
      };

      // Anti doble-click
      if (appsmith.store.guardando === true) {
        console.warn("Guardado en curso, ignorando click duplicado");
        return;
      }
      await storeValue('guardando', true);

      // Validar que tengamos spoa_expediente (identificador de negocio)
      const spoa_exp = appsmith.store.caso_pg1?.spoa_expediente;
      if (!spoa_exp || String(spoa_exp).trim() === '') {
        throw new Error("Falta el SPOA Expediente");
      }

      // Validar enteros pg1
      if (appsmith.store.caso_pg1) {
        const caso_pg1_validado = {
          ...appsmith.store.caso_pg1,
          codigo_cct: validarInteger(appsmith.store.caso_pg1.codigo_cct, 'Código CCT'),
          oficio:     validarInteger(appsmith.store.caso_pg1.oficio,     'Oficio'),
          id_fiscal:  validarInteger(appsmith.store.caso_pg1.id_fiscal,  'ID Fiscal'),
        };
        await storeValue('caso_pg1', caso_pg1_validado);
      }

      // Datos pg3
      const datosCaso = {
        fecha_hora_levantamiento: fecha_hora_levantamiento.selectedDate,
        lugar_inspeccion:         lugar_inspeccion.selectedOptionValue,
        otro_lugar_inspeccion:    otro_lugar_inspeccion.text,
        grupo:                    grupo.selectedOptionValue,
        coordinador:              coordinador.text,
        integrantes:              integrantes.text,
        agente_conoce_caso:       agente_conoce_caso.text,
        investigador_asignado:    investigador_asignado.text,
        fotos:                    fotos.text,
        videos:                   videos.text,
        hipotesis:                hipotesis.selectedOptionValue,
        otro_hipotesis:           otro_hipotesis.text,
        relato:                   relato.text,
        observaciones_hipotesis:  observaciones_hipotesis.text
      };
      await storeValue('caso_pg3', datosCaso);

      // Decidir INSERT vs UPDATE por modo
      const modo = appsmith.store.modo;

      if (modo === "nuevo") {
        try {
          const res = await Insert_Caso.run();
          const filaCreada = Array.isArray(res) ? res[0] : res;
          const idCreado = filaCreada?.id;
          const expedienteCreado = filaCreada?.spoa_expediente;

          if (!idCreado) {
            throw new Error("El INSERT no devolvió el id");
          }

          await storeValue('casoSeleccionado', {
            ...appsmith.store.caso_pg1,
            ...appsmith.store.caso_pg2,
            ...datosCaso,
            id: idCreado,
            spoa_expediente: expedienteCreado
          });
          await storeValue('modo', 'edicion');
          showAlert("Caso creado correctamente", "success");
          navigateTo('Page4');
        } catch (insertErr) {
          const msg = String(insertErr.message || '').toLowerCase();
          if (msg.includes("duplicate") || msg.includes("unique") || msg.includes("23505")) {
            throw new Error(`El expediente ${spoa_exp} ya existe en la base de datos`);
          }
          throw insertErr;
        }
      } else if (modo === "edicion") {
        if (!appsmith.store.casoSeleccionado?.id) {
          throw new Error("No hay un caso seleccionado con id válido para actualizar");
        }
        const res = await Update_Caso.run();
        const filaActualizada = Array.isArray(res) ? res[0] : res;
        if (!filaActualizada?.id) {
          throw new Error("El UPDATE no afectó ningún registro. Verifica el id del caso.");
        }
        // Refresca casoSeleccionado por si spoa_expediente cambió en esta edición
        await storeValue('casoSeleccionado', {
          ...appsmith.store.casoSeleccionado,
          spoa_expediente: filaActualizada.spoa_expediente
        });
        showAlert("Caso actualizado correctamente", "success");
        navigateTo('Page4');
      } else {
        throw new Error("Modo no reconocido: " + modo);
      }

    } catch (e) {
    console.error("Error al guardar el caso:", e);
    await Logger.error("GUARDAR_CASO", e, {
      modo: appsmith.store.modo,
      spoa_expediente: appsmith.store.caso_pg1?.spoa_expediente
    });
    showAlert("Error al guardar el caso: " + e.message, "error");
  } finally {
      await storeValue('guardando', false);
    }
  }
};