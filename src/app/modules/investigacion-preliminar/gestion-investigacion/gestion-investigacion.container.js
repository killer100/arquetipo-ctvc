import Card from "@material-ui/core/Card";
import DataTable from "app/core/components/datatable";
import { buildStore } from "app/core/store/base-store";
import React from "react";
import GridInvestigacionButtons from "./components/buttons/buttons-grid-investigacion";
import FormBuscarInvestigacion from "./components/forms/form-buscar-investigacion";
import FormGestionInvestigacion from "./components/forms/form-gestion-investigacion";
import { GestionInvestigacionStore } from "./_store/gestion-investigacion.store";
import { initialState } from "./_store/_initial-state";
import confirm from "../../../core/components/confirm";
import PageTitle from "app/core/components/page-title";
import SemaforoItem from "app/core/components/semaforo";

class GestionInvestigacionContainer extends React.Component {
    state = { ...initialState };
    /**
     * @type GestionInvestigacionStore
     */
    store = buildStore(
        () => this.state,
        this.setState.bind(this),
        GestionInvestigacionStore,
    );

    componentDidMount() {
        this.AddColumns().then(() => {
            this.store.buscadorInvestigacionActions.asyncFetchInvestigaciones();
            this.store.buscadorInvestigacionActions.asyncFetchFilters();
        });
    }

    handleDelete = idExpedienteInvestigacion => {
        confirm("Va a eliminar el registro \u00BFContinuar?").then(c => {
            if (c) {
                this.store.buscadorInvestigacionActions
                    .asyncDeleteInvestigacion(idExpedienteInvestigacion)
                    .then(() => {
                        this.store.buscadorInvestigacionActions.asyncFetchInvestigaciones();
                    });
            }
        });
    };

    AddColumns = () => {
        const columns = [
            {
                label: "Alerta",
                render: (item, loading) => (item.idEstadoExpediente != 4 && <SemaforoItem tipo={item.tipoSemaforo} />),
            },
            {
                label: "Acciones",
                render: (item, loading) => (
                    <GridInvestigacionButtons
                        item={item}
                        disabled={loading}
                        onClickShow={
                            this.store.modalGestionInvestigacionActions.openModalShow
                        }
                        onClickEdit={
                            this.store.modalGestionInvestigacionActions.openModalUpdate
                        }
                        onClickDelete={this.handleDelete}
                        onClickInformePreliminar={this.handleOpenInformePreliminar}
                    />
                ),
            },
        ];

        return this.store.buscadorInvestigacionActions.addColumns(columns);
    };

    handleLoadData = e => {
        this.store.buscadorInvestigacionActions.asyncFetchInvestigaciones(
            e.page,
            e.pageSize,
        );
    };

    handleSearch = form => {
        const { pagination } = this.state.buscadorInvestigacion;
        this.store.buscadorInvestigacionActions.asyncFetchInvestigaciones(
            1,
            pagination.pageSize,
            form,
        );
    };

    handleOpenInformePreliminar = (idExpedienteInvestigacion, idInformePreliminar) => {
        //const paramInformePreliminar = (idInformePreliminar ? `/${idInformePreliminar}` : '')
        this.props.history.push(`investigacion/${idExpedienteInvestigacion}/etapas`);
    }

    render() {
        const {
            filterLists,
            loading,
            tableDef,
            pagination,
        } = this.state.buscadorInvestigacion;
        const {
            modalGestionInvestigacion,
            modalFormAnexoExpediente,
            modalFormInvestigado,
            modalFormArchivo,
            modalFormRequerimiento,
        } = this.state;
        return (
            <>
                <PageTitle text={"Bandeja Principal de Expedientes de Investigación"} />

                <FormBuscarInvestigacion
                    filterLists={filterLists}
                    onSearch={this.handleSearch}
                    onClear={this.handleSearch}
                    onClickNew={this.store.modalGestionInvestigacionActions.openModalNew}
                />
                <Card elevation={8}>
                    <DataTable
                        loading={loading}
                        tableDef={tableDef}
                        pagination={pagination}
                        onLoadData={this.handleLoadData}
                    />
                </Card>

                <FormGestionInvestigacion
                    modalFormAnexoExpediente={modalFormAnexoExpediente}
                    modalFormInvestigado={modalFormInvestigado}
                    modalFormArchivo={modalFormArchivo}
                    modalFormRequerimiento={modalFormRequerimiento}
                    modal={modalGestionInvestigacion}
                    store={this.store}
                />
            </>
        );
    }
}

export default GestionInvestigacionContainer;
