import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import DataTable from "app/core/components/datatable";
import { initialState } from "./_store/_initial-state";
import { buildStore } from "app/core/store/base-store";
import confirm from "app/core/components/confirm";
import { GestionTituloStore } from "./_store/gestion-titulo.store";
import GridActionButtons from "./components/buttons/grid-action-buttons";
import { getValueFromQs } from "app/core/helpers";
import FormBuscarTitulo from "./components/forms/form-buscar-titulo";
import FormGestionTitulo from "./components/forms/form-gestion-titulo";
import PageTitle from 'app/core/components/page-title';

class GestionTituloContainer extends React.Component {
    state = { ...initialState };
    /**
     * @type GestionTituloStore
     */
    store = buildStore(
        () => this.state,
        this.setState.bind(this),
        GestionTituloStore
    );

    componentDidMount() {
        const idNorma = getValueFromQs(this.props.location.search, "idNorma");
        if (!idNorma) {
            console.log("no hay idNorma");
        }

        this.store.normaDataActions.setIdNorma(idNorma);

        this.addColumns().then(() => {
            this.store.buscadorTituloActions.asyncFetchTitulos(idNorma);
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
                        onClickShow={this.store.modalGestionTituloActions.openModalShow}
                        onClickEdit={this.store.modalGestionTituloActions.openModalEdit}
                        onClickDelete={this.handleDelete}
                        onClickCapitulos={this.handleClickCapitulos}
                    />
                )
            }
        ];
        return this.store.buscadorTituloActions.addColumns(newColumns);
    };

    handleDelete = idTitulo => {
        confirm("Va a eliminar el Título, ¿Continuar?").then(confirm => {
            if (confirm) this.store.buscadorTituloActions.asyncDeleteTitulo(idTitulo);
        });
    };

    handleClickCapitulos = id => {
        this.props.history.push(`capitulos?idTitulo=${id}`);
    };

    render() {
        const { modalGestionTitulo, normaData } = this.state;
        const { loading, pagination, gridDefinition } = this.state.buscadorTitulo;
        return (
            normaData.idNorma && (
                <>
                    <PageTitle text={normaData.norma ? normaData.norma.descripcion + " - Titulos" : ""} />
                    <FormBuscarTitulo
                        store={this.store}
                        pagination={pagination}
                        idNorma={normaData.idNorma}
                    />
                    <Card elevation={8}>
                        <DataTable
                            loading={loading}
                            tableDef={gridDefinition}
                            pagination={pagination}
                            onLoadData={(e) => { this.store.buscadorTituloActions.asyncFetchTitulos(e.page, e.pageSize); }}
                        />
                    </Card>
                    <FormGestionTitulo
                        modal={modalGestionTitulo}
                        store={this.store}
                        normaData={normaData}
                    />
                </>
            )
        );
    }
}

export default GestionTituloContainer;
