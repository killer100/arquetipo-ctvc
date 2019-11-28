import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import DataTable from "app/core/components/datatable";
import { initialState } from "./_store/_initial-state";
import { buildStore } from "app/core/store/base-store";
import confirm from "app/core/components/confirm";
import { GestionArticuloStore } from "./_store/gestion-articulo.store";
import GridActionButtons from "./components/buttons/grid-action-buttons";
import { getValueFromQs } from "app/core/helpers";
import FormBuscarArticulo from "./components/forms/form-buscar-articulo";
import FormGestionArticulo from "./components/forms/form-gestion-articulo";
import PageTitle from 'app/core/components/page-title';

class GestionArticuloContainer extends React.Component {
  state = { ...initialState };
  /**
   * @type GestionArticuloStore
   */
  store = buildStore(
    () => this.state,
    this.setState.bind(this),
    GestionArticuloStore
  );

  componentDidMount() {
    const idCapitulo = getValueFromQs(this.props.location.search, "idCapitulo");
    if (!idCapitulo) {
      console.log("no hay idCapitulo");
    }

    this.store.capituloDataActions.setIdCapitulo(idCapitulo);

    this.addColumns().then(() => {
      this.store.buscadorArticuloActions.asyncFetchArticulos(idCapitulo);
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
            onClickShow={this.store.modalGestionArticuloActions.openModalShow}
            onClickEdit={this.store.modalGestionArticuloActions.openModalEdit}
            onClickDelete={this.handleDelete}
            onClickFaltas={this.handleClickFaltas}
          />
        )
      }
    ];
    return this.store.buscadorArticuloActions.addColumns(newColumns);
  };

  handleDelete = idArticulo => {
    confirm("Va a eliminar el Artículo, ¿Continuar?").then(confirm => {
      if (confirm)
        this.store.buscadorArticuloActions.asyncDeleteArticulo(idArticulo);
    });
  };

  handleClickFaltas = id => {
    this.props.history.push(`faltas?idArticulo=${id}`);
  };

  render() {
    const { modalGestionArticulo, capituloData } = this.state;
    const { loading, pagination, gridDefinition } = this.state.buscadorArticulo;
    return (
      capituloData.idCapitulo && (
        <>
          <PageTitle text={capituloData.capitulo ? capituloData.capitulo.descripcion + " - Artículos" : ""} />    
          <FormBuscarArticulo
            store={this.store}
            pagination={pagination}
            idCapitulo={capituloData.idCapitulo}
          />
          <Card elevation={8}>
            <DataTable
              loading={loading}
              tableDef={gridDefinition}
              pagination={pagination}
              onLoadData={e => {
                this.store.buscadorArticuloActions.asyncFetchArticulos(
                  e.page,
                  e.pageSize
                );
              }}
            />
          </Card>
          <FormGestionArticulo
            modal={modalGestionArticulo}
            store={this.store}
            capituloData={capituloData}
          />
        </>
      )
    );
  }
}

export default GestionArticuloContainer;
