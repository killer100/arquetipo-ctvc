import React, { Component, useState, useEffect } from "react";
import { intialState } from "./_store/_initial-state";
import DataTable from "app/core/components/datatable";
import Card from "@material-ui/core/Card";
import FormBuscar from "./components/forms/form-buscar";
import PageTitle from "app/core/components/page-title";
import FormGestionAbogado from "./components/forms/form-gestion-abogado";
import GridActionButtons from "./components/buttons/grid-action-buttons";
import { abogadoStore, AbogadoStore } from "./_store/abogado.store";
import confirm from "app/core/components/confirm";
import toast from "app/core/components/toast";

export default class AbogadoContainer extends Component {
  //= ============================================
  // Configuracion del estado y el store
  //= ============================================
  state = { ...intialState };
  store = new AbogadoStore(() => this.state, this.setState.bind(this));
  //= ============================================

  componentDidMount() {
    this.buildGridButtons().then(() => {
      this.store.buscadorAbogadoActions.asyncFetchAbogados();
    });
  }

  buildGridButtons = () => {
    const newColumn = {
      label: "Acciones",
      render: (item, loading) => (
        <GridActionButtons
          item={item}
          disabled={loading}
          onClickShow={this.store.modalGestionAbogadoActions.openModalShow}
          //onClickEdit={this.store.modalGestionAbogadoActions.openModalUpdate}
          onClickDelete={this.handleDelete}
        />
      )
    };

    return this.store.buscadorAbogadoActions.setGridButtons(newColumn);
  };

  handleDelete = idAbogado => {
    confirm("Se va eliminar el abogado. ¿Desea continuar?").then(ok => {
      if (ok) {
          this.store.buscadorAbogadoActions.asyncDeleteAbogado(idAbogado).then(() => {
              this.store.buscadorAbogadoActions.asyncFetchAbogados();
          });
      }
    });
  };

  handleLoadData = e => {
    this.store.buscadorAbogadoActions.asyncFetchAbogados(e.page, e.pageSize);
  };

  handleSearch = form => {
    const { pagination } = this.state.buscadorAbogados;
    this.store.buscadorAbogadoActions.asyncFetchAbogados(
      1,
      pagination.pageSize,
      form
    );
  };

  render() {
    const { buscadorAbogados, modalGestionAbogado } = this.state;
    const { modalGestionAbogadoActions } = this.store;

    return (
      <>
        <PageTitle text={"Listado de Abogados"} />

        <FormBuscar
          onSearch={this.handleSearch}
          onClear={this.handleSearch}
          onClickNew={modalGestionAbogadoActions.openModalNew}
        />

        <Card elevation={8}>
          <DataTable
            loading={buscadorAbogados.loading}
            tableDef={buscadorAbogados.tableDef}
            pagination={buscadorAbogados.pagination}
            onLoadData={this.handleLoadData}
          />
        </Card>
        <FormGestionAbogado modal={modalGestionAbogado} store={this.store} />
      </>
    );
  }
}
