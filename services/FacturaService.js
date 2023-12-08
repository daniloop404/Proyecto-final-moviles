import axios from 'axios';

const API_USUARIOS = 'https://app-web-2-d5607-default-rtdb.firebaseio.com/usuarios';

export const agregarFactura = (userKey, facturaData) => {
  const url = `${API_USUARIOS}/${userKey}/facturas.json`;
  return axios.post(url, facturaData);
};

export const getFacturas = (userKey) => {
  const url = `${API_USUARIOS}/${userKey}/facturas.json`;
  return axios.get(url);
};