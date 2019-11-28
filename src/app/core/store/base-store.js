export class BaseStore {
  constructor(getState, setState) {
    this.getState = getState;
    this.setState = setState;
  }

  /**
   * helper que devuelve un metodo "getState" para ser
   * utilizado por las clases "Acciones" que solo devolverá
   * el contexto que se defina por la variable "prop"
   * @param {string} prop
   */
  buildScopedGetState = prop => () => this.getState()[prop];
  /**
   * helper que devuelve un metodo "setState" para ser
   * utilizado por las clases "Acciones" que solo asignará
   * el estado del contexto que se defina por la variable "prop"
   * @param {string} prop
   */
  buildScopedSetState = prop => (newState, callback) => {
    //this.setState({ [prop]: newState }, callback);
    this.setState({ [prop]: newState }, callback);
  };
}

export const buildStore = (getState, setState, StoreClass) => {
  return new StoreClass(getState, setState);
};
