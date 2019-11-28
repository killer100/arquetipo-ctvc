import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListTable from "app/core/components/list-table";
import update from "immutability-helper";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import GridToolbar from "app/core/components/grid-toolbar";
import GridInvestigadoButtons from "../buttons/buttons-grid-investigado";

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

const gridInvestigadosDef = {
    columns: [
        { label: "DNI", property: "dniInvestigado" },
        { label: "Nombres", property: "nombres" },
        { label: "Primer Apellido", property: "primerApellido" },
        { label: "Segundo Apellido", property: "segundoApellido" },
        { label: "Unidad Orgánica", property: "descDependencia" },
        { label: "Cargo", property: "descCargo" }
    ]
};

const GridInvestigado = ({
    investigados,
    onClickNew,
    onClickShow,
    onClickEdit,
    onClickDelete,
    readonly
}) => {
    const classes = useStyles();
    const [gridDef, setGridDef] = useState(gridInvestigadosDef);

    useEffect(() => {
        const newColumn = {
            label: "Acciones",
            render: (item, loading, index) => (
                <GridInvestigadoButtons
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
                items={investigados}
                tableDef={gridDef}
                emptyMessage="No hay investigados"
            />
        </>
    );
};

GridInvestigado.defaultProps = {
    investigados: []
};

export default GridInvestigado;
