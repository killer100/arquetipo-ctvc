import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListTable from "app/core/components/list-table";
import update from "immutability-helper";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import GridToolbar from "app/core/components/grid-toolbar";
//import GridAnexoExpedienteButtons from "../buttons/buttons-grid-anexo-expediente";

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
  },
  root: {
    marginTop: theme.spacing(3)
  }
}));

const gridFaltaTipificadaDef = {
  columns: [
    { label: "Nro. de Norma", property: "falta.numeroNorma" },
    { label: "Descripción de la Norma Legal", property: "falta.numeroNorma" },

    { label: "Nro. del Artículo", property: "falta.numeroArticulo" },
    {
      label: "Descripción del Artículo",
      property: "falta.descripcionArticulo"
    },

    { label: "Literal de la falta", property: "falta.numeroFalta" },
    {
      label: "Descripción de la Falta tipificada",
      property: "falta.descripcionFalta"
    }
  ]
};

const GridFaltaTipificada = ({
  faltas,
  onClickAdd,
  onClickShow,
  onClickEdit,
  onClickDelete,
  readonly,
  isLoading
}) => {
  const classes = useStyles();
  const [gridDef, setGridDef] = useState(gridFaltaTipificadaDef);

  useEffect(() => {
    const newColumn = {
      label: "Acciones",
      render: (item, loading, index) => <>
        <IconButton disabled={isLoading} onClick={() => {onClickDelete(index, item);}}><Icon>delete</Icon></IconButton>
      </>
      // <GridAnexoExpedienteButtons
      //   rowIndex={index}
      //   item={item}
      //   disabled={loading}
      //   onClickShow={onClickShow}
      //   onClickEdit={onClickEdit}
      //   onClickDelete={onClickDelete}
      //   readonly={readonly}
      // />
    };

    setGridDef(
      update(gridDef, {
        columns: { $push: [newColumn] }
      })
    );

  }, []);

  return (
    <div className={classes.root}>
      {!readonly && (
        <GridToolbar
          hideNew
          rightSection={
            <Button
              type="button"
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={onClickAdd}
            >
              <Icon>add_circle</Icon>
              Agregar
            </Button>
          }
        />
      )}

      <ListTable
        items={faltas}
        tableDef={gridDef}
        emptyMessage="No hay faltas"
      />
    </div>
  );
};

GridFaltaTipificada.defaultProps = {
  faltas: []
};

export default GridFaltaTipificada;
