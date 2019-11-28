import React from "react";
import GridArchivos from "app/core/components/_bussiness/grid-archivos";
import { AppConfig } from "app/core/config/app.config";

const GridDocumentosDescargo = ({ archivos, onAdd, onDelete, readonly }) => {
  const handleShowFile = name => {
    window.location.href = `${AppConfig.urlFileServer}${name}`;
  };

  return (
    <>
      <GridArchivos
        archivos={archivos}
        onClickShow={handleShowFile}
        onClickDelete={onDelete}
        readonly={readonly}
        onAddFiles={onAdd}
      ></GridArchivos>
    </>
  );
};

export default GridDocumentosDescargo;
