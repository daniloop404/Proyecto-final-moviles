import axios from 'axios';

const API_USUARIOS = 'https://app-web-2-d5607-default-rtdb.firebaseio.com/usuarios';

export const getUsuarios = () => {
  const url = `${API_USUARIOS}.json`;
  return axios.get(url);
};

export const postUsuario = (nuevoUsuario) => {
  const url = `${API_USUARIOS}.json`;
  return axios.post(url, nuevoUsuario);
};

export const getUsuarioPorId = (key) => {
  const url = `${API_USUARIOS}/${key}.json`;
  return axios.get(url);
};

export const putUsuario = (key, usuario) => {
  const url = `${API_USUARIOS}/${key}.json`;
  return axios.put(url, usuario);
};

export const checkUsernameExists = (username) => {
  const url = `${API_USUARIOS}.json?orderBy="nombreUsuario"&equalTo="${username}"`;
  return axios.get(url).then((response) => response.data && Object.values(response.data).length > 0);
};

export const checkEmailExists = (email) => {
  const url = `${API_USUARIOS}.json?orderBy="correo"&equalTo="${email}"`;
  return axios.get(url).then((response) => response.data && Object.values(response.data).length > 0);
};