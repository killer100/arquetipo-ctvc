import React, { useState, useEffect } from "react";
import update from "immutability-helper";
import GridToolbar from "app/core/components/grid-toolbar";
import ListTable from "app/core/components/list-table";
import GridArchivoButtons from "./grid-archivo-buttons";
import ButtonListAddArchivo, { TIPO_ARCHIVO } from "./button-list-add-archivo";
import FormArchivo from "./form-archivo";
// =======================================
// STYLES
// =======================================

// =======================================
// HELPER FUNCTIONS
// =======================================

const gridDefinition = {
  columns: [
    { label: "Nro.", render: (item, loading, i) => <>{i + 1}</> },
    { label: "Descripción del Archivo", property: "descripcionArchivo" },
    { label: "Nombre del Archivo Adjunto", property: "nombreArchivo" },
    { label: "Tipo de Archivo", property: "tipoArchivo" }
  ]
};

const defaultModalArchivo = {
  open: false,
  tipoArchivo: TIPO_ARCHIVO.PDF
};

// =======================================
// COMPONENT
// =======================================

const GridArchivos = ({
  archivos,
  onClickShow,
  onClickDelete,
  readonly,
  onAddFiles,
  listButtonProps
}) => {
  const [definition, setDefinition] = useState(gridDefinition);
  const [modalArchivo, setModalArchivo] = useState(defaultModalArchivo);

  useEffect(() => {
    const newColumn = {
      label: "Acciones",
      render: (item, loading, index) => (
        <GridArchivoButtons
          rowIndex={index}
          item={item}
          disabled={loading}
          onClickShow={onClickShow}
          onClickDelete={onClickDelete}
          readonly={readonly}
        />
      )
    };

    setDefinition(
      update(definition, {
        columns: { $push: [newColumn] }
      })
    );
  }, []);

  const handleCloseModalArchivo = () => {
    setModalArchivo({ ...modalArchivo, open: false });
  };

  const handleOpenModalArchivo = tipoArchivo => () => {
    setModalArchivo({ ...modalArchivo, open: true, tipoArchivo: tipoArchivo });
  };

  return (
    <>
      {!readonly && (
        <GridToolbar
          hideNew
          rightSection={
            <ButtonListAddArchivo
              onClick={handleOpenModalArchivo}
              {...listButtonProps}
            />
          }
        />
      )}

      <ListTable
        items={archivos}
        tableDef={definition}
        emptyMessage="No hay archivos"
      />

      <FormArchivo
        open={modalArchivo.open}
        tipoArchivo={modalArchivo.tipoArchivo}
        onClose={handleCloseModalArchivo}
        onUploadFinish={onAddFiles}
      ></FormArchivo>
    </>
  );
};

GridArchivos.defaultProps = {
  listButtonProps: {}
};

export default GridArchivos;
