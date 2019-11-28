import React, { useState, useEffect } from "react";
import ListTable from "app/core/components/list-table";
import update from "immutability-helper";
import GridToolbar from "app/core/components/grid-toolbar";
import ButtonListAddArchivo from "../buttons/button-list-add-archivo";
import GridArchivoButtons from "../buttons/buttons-grid-archivo";

const gridArchivosDef = {
    columns: [
        { label: "Nro.", render: (item, loading, i) => <>{i + 1}</> },
        { label: "Descripción del Archivo", property: "descripcionArchivo" },
        { label: "Nombre del Archivo Adjunto", property: "nombreArchivo" },
        { label: "Tipo de Archivo", property: "tipoArchivo" }
    ]
};

const GridArchivo = ({
    archivos,
    onClickUpload,
    onClickShow,
    onClickDelete,
    readonly
}) => {
    const [gridDef, setGridDef] = useState(gridArchivosDef);

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

        setGridDef(
            update(gridDef, {
                columns: { $push: [newColumn] }
            })
        );
    }, []);

    return (
        <>
            {!readonly && <GridToolbar
                hideNew
                rightSection={<ButtonListAddArchivo onClick={onClickUpload} />}
            />}

            <ListTable
                items={archivos}
                tableDef={gridDef}
                emptyMessage="No hay archivos"
            />
        </>
    );
};

GridArchivo.defaultProps = {
    archivos: []
};

export default GridArchivo;
