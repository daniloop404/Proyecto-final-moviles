import axios from 'axios';

const API_CELULARES = 'https://app-web-2-d5607-default-rtdb.firebaseio.com/celulares';

const getCelulares = () => {
  const url = `${API_CELULARES}.json`;
  return axios.get(url).then((response) => {
    if (!response.data) {
      return [];
    }
    return Object.keys(response.data).map((key) => ({ key, ...response.data[key] }));
  });
};

const getCelularPorId = (key) => {
  const url = `${API_CELULARES}/${key}.json`;
  return axios.get(url);
};

const postCelular = (nuevoCelular) => {
  const url = `${API_CELULARES}.json`;
  return axios.post(url, nuevoCelular);
};

const updateCelular = (key, updatedCelular) => {
  const url = `${API_CELULARES}/${key}.json`;
  return axios.put(url, updatedCelular);
};

const deleteCelular = (key) => {
  const url = `${API_CELULARES}/${key}.json`;
  return axios.delete(url);
};

const getCelularesPorMarca = (marca) => {
  const url = `${API_CELULARES}.json`;
  return axios.get(url).then((response) =>
    Object.entries(response.data)
      .map(([key, value]) => ({ key, ...value }))
      .filter((celular) => celular.marca === marca)
  );
};

export default {
  getCelulares,
  getCelularPorId,
  postCelular,
  updateCelular,
  deleteCelular,
  getCelularesPorMarca,
};