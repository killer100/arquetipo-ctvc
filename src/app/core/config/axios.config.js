import axios from 'axios';
import toast from '../components/toast';

function HandleHttpError(err) {
	if (err && err.response && err.response.data && err.response.data.msg) {
		toast(err.response.data.msg, 'error');
	}

	if (err.response.status != 406 && err.response.status != 404 && err.response.status != 400) {
		console.log(err.response)
	}
}

export function configAxios() {
	axios.interceptors.response.use(
		function (response) {
			if (response.data && response.data.msg) {
				toast(response.data.msg, 'success');
			}
			return response;
		},
		function (err) {
			HandleHttpError(err);
			return Promise.reject(err);
		}
	);
}