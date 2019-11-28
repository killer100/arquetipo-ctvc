import update from 'immutability-helper'
import { GetPageAbogados, DeleteAbogado } from '../../api/abogado.api'

/**
 * Acciones que gestionarán el contexto del buscador dentro del estado
 */
export class BuscadorAbogadoActions {
  /**
   * @param {() => import('../_initial-state').buscadorAbogados} getState
   * @param {(state:import('../_initial-state').buscadorAbogados ) => void} setState
   */
  constructor (getState, setState) {
    this.getState = getState
    this.setState = setState
  }

  setGridButtons = newColumn => {
    return new Promise(resolve => {
      this.setState(
        update(this.getState(), {
          tableDef: {
            columns: { $push: [newColumn] }
          }
        }),
        () => resolve()
      )
    })
  }

  fetchAbogadosSuccess = (items, total, page, pageSize) => {
    const newState = update(this.getState(), {
      loading: { $set: false },
      pagination: {
        $set: {
          items: items,
          page: page,
          pageSize: pageSize,
          total: total
        }
      }
    })

    this.setState(newState)
  }

  deleteAbogadoBegin = () => {
    this.setState({ ...this.getState(), loading: true })
  }

  deleteAbogadoSuccess = () => {
    this.setState({ ...this.getState(), loading: false })
  }

  //= ============================================
  // Acciones asincronas
  //= ============================================

  asyncFetchAbogados = (page = null, pageSize = null, filters = null) => {
    const state = this.getState()
    if (!page) page = state.pagination.page
    if (!pageSize) pageSize = state.pagination.pageSize
    if (!filters) filters = state.filters

    this.setState({ ...state, loading: true, filters })
    GetPageAbogados(page, pageSize, filters).then(response => {
      const { items, total } = response.data
      this.fetchAbogadosSuccess(items, total, page, pageSize)
    })
  }

  asyncDeleteAbogado = idAbogado => {
    this.deleteAbogadoBegin()
    return DeleteAbogado(idAbogado).then(response => {
      this.deleteAbogadoSuccess()
      return response
    })
  }
}
