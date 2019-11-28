import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListTable from "app/core/components/list-table";
import update from "immutability-helper";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import GridToolbar from "app/core/components/grid-toolbar";
import GridAnexoExpedienteButtons from "../buttons/buttons-grid-anexo-expediente";

const useStyles = makeStyles(theme => ({
    typography: {
        marginTop: theme.spacing(3)
    },
    dividerTitle: {
        marginBottom: theme.spacing(3)
    },
    tableToolbar: {
        display: "flex"
    },
    toolbarItemsLeft: {
        flex: 1
    }
}));

const gridExpedientesDef = {
    columns: [
        { label: "Nro. de Expediente", property: "numeroExpedienteAnexo" },
        { label: "Fecha trámite", property: "fechaExpedienteDocumentario", isDate: true },
        //{ label: "Remitente", property: "remitente" },
        //{ label: "Descripción", property: "descripcion" },
        { label: "Folios", property: "folioExpediente" }
    ]
};

const GridExpediente = ({
    expedientes,
    onClickNew,
    onClickShow,
    onClickEdit,
    onClickDelete,
    readonly
}) => {
    const classes = useStyles();
    const [gridDef, setGridDef] = useState(gridExpedientesDef);

    useEffect(() => {
        const newColumn = {
            label: "Acciones",
            render: (item, loading, index) => (
                <GridAnexoExpedienteButtons
                    rowIndex={index}
                    item={item}
                    disabled={loading}
                    onClickShow={onClickShow}
                    onClickEdit={onClickEdit}
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
                rightSection={
                    <Button
                        type="button"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={onClickNew}
                    >
                        <Icon>add_circle</Icon>
                        Agregar
                    </Button>
                }
            />}

            <ListTable
                items={expedientes}
                tableDef={gridDef}
                emptyMessage="No hay expedientes"
            />
        </>
    );
};

GridExpediente.defaultProps = {
    expedientes: []
};

export default GridExpediente;
