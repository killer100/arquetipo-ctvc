import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListTable from "app/core/components/list-table";
import update from "immutability-helper";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import GridToolbar from "app/core/components/grid-toolbar";
import GridRequerimientoButtons from "../buttons/buttons-grid-requerimiento";

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

const gridRequerimientosDef = {
    columns: [
        { label: "Nro.", render: (item, loading, i) => <>{i + 1}</> },
        { label: "Descripción", property: "descripcionArchivo" },
        { label: "Nombre del archivo", property: "nombreArchivo" },
        { label: "Fecha de Carga", property: "fechaRegistro", isDate: true }
    ]
};

const GridRequerimiento = ({
    requerimientos,
    onClickNew,
    onClickShow,
    onClickDelete,
    readonly
}) => {
    const classes = useStyles();
    const [gridDef, setGridDef] = useState(gridRequerimientosDef);

    useEffect(() => {
        const newColumn = {
            label: "Acciones",
            render: (item, loading, index) => (
                <GridRequerimientoButtons
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
                items={requerimientos}
                tableDef={gridDef}
                emptyMessage="No hay requerimientos"
            />
        </>
    );
};

GridRequerimiento.defaultProps = {
    requerimientos: []
};

export default GridRequerimiento;
