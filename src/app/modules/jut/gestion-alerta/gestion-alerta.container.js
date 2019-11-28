import React, { useReducer } from 'react';
import Card from '@material-ui/core/Card';
import DataTable from 'app/core/components/datatable';
import PageTitle from 'app/core/components/page-title';
//import Modal from 'app/core/components/modal';
import { initialState, reducer } from './redux/reducers';
import * as ACTIONS from './redux/actions';

const GestionAlerta = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleLoadData = () => {};
  //console.log(dispatch);
  const showLoading = () => {
    dispatch(ACTIONS.showLoading());
  };

  return (
    <>
      <PageTitle text={state.uiGestionAlerta.title} />
      <button onClick={showLoading}>click</button>
      <Card elevation={8}>
        <DataTable
          loading={state.gridGestionAlerta.loading}
          tableDef={state.gridGestionAlerta.definition}
          pagination={state.gridGestionAlerta.pagination}
          onLoadData={handleLoadData}
        />
      </Card>
    </>
  );
};

export default GestionAlerta;
