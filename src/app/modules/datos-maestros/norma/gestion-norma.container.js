import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import DataTable from "app/core/components/datatable";
import { GestionNormaStore } from "./_store/gestion-norma.store";
import { initialState } from "./_store/_initial-state";
import { buildStore } from "app/core/store/base-store";
import FormBuscarNorma from "./components/forms/form-buscar-norma";
import FormGestionNorma from "./components/forms/form-gestion-norma";
import GridActionButtons from "./components/buttons/grid-action-buttons";
import confirm from "app/core/components/confirm";
import PageTitle from 'app/core/components/page-title';

class GestionNormaContainer extends React.Component {
  state = { ...initialState };
  /**
   * @type GestionNormaStore
   */
  store = buildStore(
    () => this.state,
    this.setState.bind(this),
    GestionNormaStore
  );

  componentDidMount() {
    this.addColumns().then(() => {
      this.store.buscadorNormaActions.asyncFetchNormas();
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
            onClickShow={this.store.modalGestionNormaActions.openModalShow}
            onClickEdit={this.store.modalGestionNormaActions.openModalEdit}
            onClickDelete={this.handleDelete}
            onClickTitulos={this.handleClickTitulos}
          />
        )
      }
    ];
    return this.store.buscadorNormaActions.addColumns(newColumns);
  };

  handleDelete = idNorma => {
    confirm("Va a eliminar la Norma, Continuar?").then(confirm => {
      if (confirm) this.store.buscadorNormaActions.asyncDeleteNorma(idNorma);
    });
  };

  handleClickTitulos = id => {
    this.props.history.push(`titulos?idNorma=${id}`);
  };

  render() {
    const { modalGestionNorma } = this.state;
    const { loading, pagination, gridDefinition } = this.state.buscadorNorma;
    return (
      <>
        <PageTitle text={"Listado De Normas"}/>
        <FormBuscarNorma store={this.store} pagination={pagination} />
        <Card elevation={8}>
          <DataTable
            loading={loading}
            tableDef={gridDefinition}
            pagination={pagination}
            onLoadData={(e) => { this.store.buscadorNormaActions.asyncFetchNormas(e.page, e.pageSize);}}
          />
        </Card>
        <FormGestionNorma modal={modalGestionNorma} store={this.store} />
      </>
    );
  }
}

export default GestionNormaContainer;
