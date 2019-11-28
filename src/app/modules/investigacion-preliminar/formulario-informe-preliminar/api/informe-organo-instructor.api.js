import Axios from "axios";
import { AppConfig } from "app/core/config/app.config";

const { urlBaseProject: baseUrl } = AppConfig;

const apiUrl = `${baseUrl}/api/informes-organo-instructor`;

export const GetInformeOrganoInstructor = idInformeOrganoInstructor => {
  return Axios.get(`${apiUrl}/${idInformeOrganoInstructor}`)
    .then(response => response.data)
    .catch(err => {
      throw err.response;
    });
};

export const SaveInformeOrganoInstructor = informeOrganoInstructor => {
  return Axios.post(`${apiUrl}`, informeOrganoInstructor)
    .then(response => response.data)
    .catch(err => {
      throw err.response;
    });
};

export const UpdateInformeOrganoInstructor = (
  idInformeOrganoInstructor,
  informeOrganoInstructor
) => {
  return Axios.put(
    `${apiUrl}/${idInformeOrganoInstructor}`,
    informeOrganoInstructor
  )
    .then(response => response.data)
    .catch(err => {
      throw err.response;
    });
};
