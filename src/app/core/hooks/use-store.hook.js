import {
	useEffect,
	useState
} from "react";

/**
 * 
 * @param {*} state 
 * @param {*} setState 
 * @param {T} StoreClass 
 * @return {[T]}
 */
export const useStore = (state, setState, StoreClass) => {
	const [store, setStore] = useState(null);

	useEffect(() => {
		setStore(new StoreClass(() => state, setState));
	}, []);

	return [store];
};