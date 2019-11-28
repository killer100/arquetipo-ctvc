import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import DataTable from "app/core/components/datatable";
import { initialState } from "./_store/_initial-state";
import { buildStore } from "app/core/store/base-store";
import confirm from "app/core/components/confirm";
import { GestionFaltaStore } from "./_store/gestion-falta.store";
import GridActionButtons from "./components/buttons/grid-action-buttons";
import { getValueFromQs } from "app/core/helpers";
import FormBuscarFalta from "./components/forms/form-buscar-falta";
import FormGestionFalta from "./components/forms/form-gestion-falta";
import PageTitle from 'app/core/components/page-title';

class GestionFaltaContainer extends React.Component {
  state = { ...initialState };
  /**
   * @type GestionFaltaStore
   */
  store = buildStore(
    () => this.state,
    this.setState.bind(this),
    GestionFaltaStore
  );

  componentDidMount() {
    const idArticulo = getValueFromQs(this.props.location.search, "idArticulo");
    if (!idArticulo) {
      console.log("no hay idArticulo");
    }

    this.store.articuloDataActions.setIdArticulo(idArticulo);

    this.addColumns().then(() => {
      this.store.buscadorFaltaActions.asyncFetchFaltas(idArticulo);
    });
  }

  addColumns = () => {
    const newColumns = [
      {
        label: "Acciones",
        render: (item, loading) => (
          <GridActionButtons
            item={item}
            disabled={loading}
            onClickShow={this.store.modalGestionFaltaActions.openModalShow}
            onClickEdit={this.store.modalGestionFaltaActions.openModalEdit}
            onClickDelete={this.handleDelete}
          />
        )
      }
    ];
    return this.store.buscadorFaltaActions.addColumns(newColumns);
  };

  handleDelete = idFalta => {
    confirm("Va a eliminar la Falta, ¿Continuar?").then(confirm => {
      if (confirm) this.store.buscadorFaltaActions.asyncDeleteFalta(idFalta);
    });
  };

  render() {
    const { modalGestionFalta, articuloData } = this.state;
    const { loading, pagination, gridDefinition } = this.state.buscadorFalta;
    return (
      articuloData.idArticulo && (
        <>
          <PageTitle text={articuloData.articulo ? articuloData.articulo.descripcion + " - Faltas" : ""} />        
          <FormBuscarFalta
            store={this.store}
            pagination={pagination}
            idArticulo={articuloData.idArticulo}
          />
          <Card elevation={8}>
            <DataTable
              loading={loading}
              tableDef={gridDefinition}
              pagination={pagination}
              onLoadData={(e) => { this.store.buscadorFaltaActions.asyncFetchFaltas(e.page, e.pageSize);}}
            />
          </Card>
          <FormGestionFalta
            modal={modalGestionFalta}
            store={this.store}
            articuloData={articuloData}
          />
        </>
      )
    );
  }
}

export default GestionFaltaContainer;
