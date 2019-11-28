import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import DataTable from "app/core/components/datatable";
import { initialState } from "./_store/_initial-state";
import { buildStore } from "app/core/store/base-store";
import confirm from "app/core/components/confirm";
import { GestionCapituloStore } from "./_store/gestion-capitulo.store";
import GridActionButtons from "./components/buttons/grid-action-buttons";
import { getValueFromQs } from "app/core/helpers";
import FormBuscarCapitulo from "./components/forms/form-buscar-capitulo";
import FormGestionCapitulo from "./components/forms/form-gestion-capitulo";
import PageTitle from 'app/core/components/page-title';

class GestionCapituloContainer extends React.Component {
  state = { ...initialState };
  /**
   * @type GestionCapituloStore
   */
  store = buildStore(
    () => this.state,
    this.setState.bind(this),
    GestionCapituloStore
  );

  componentDidMount() {
    const idTitulo = getValueFromQs(this.props.location.search, "idTitulo");
    if (!idTitulo) {
      console.log("no hay idTitulo");
    }

    this.store.tituloDataActions.setIdTitulo(idTitulo);

    this.addColumns().then(() => {
      this.store.buscadorCapituloActions.asyncFetchCapitulos(idTitulo);
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
            onClickShow={this.store.modalGestionCapituloActions.openModalShow}
            onClickEdit={this.store.modalGestionCapituloActions.openModalEdit}
            onClickDelete={this.handleDelete}
            onClickArticulos={this.handleClickArticulos}
          />
        )
      }
    ];
    return this.store.buscadorCapituloActions.addColumns(newColumns);
  };

  handleDelete = idCapitulo => {
    confirm("Va a eliminar el Capítulo, ¿Continuar?").then(confirm => {
      if (confirm)
        this.store.buscadorCapituloActions.asyncDeleteCapitulo(idCapitulo);
    });
  };

  handleClickArticulos = id => {
    this.props.history.push(`articulos?idCapitulo=${id}`);
  };

  render() {
    const { modalGestionCapitulo, tituloData } = this.state;
    const { loading, pagination, gridDefinition } = this.state.buscadorCapitulo;
    return (
      tituloData.idTitulo && (
        <>
          <PageTitle text={tituloData.titulo ? tituloData.titulo.descripcion + " - Capitulos" : ""} />
          <FormBuscarCapitulo
            store={this.store}
            pagination={pagination}
            idTitulo={tituloData.idTitulo}
          />
          <Card elevation={8}>
            <DataTable
              loading={loading}
              tableDef={gridDefinition}
              pagination={pagination}
              onLoadData={(e) => { this.store.buscadorCapituloActions.asyncFetchCapitulos(e.page, e.pageSize);}}
            />
          </Card>
          <FormGestionCapitulo
            modal={modalGestionCapitulo}
            store={this.store}
            tituloData={tituloData}
          />
        </>
      )
    );
  }
}

export default GestionCapituloContainer;
