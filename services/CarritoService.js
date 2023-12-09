import axios from 'axios';

const API_CARRITO = 'https://app-web-2-d5607-default-rtdb.firebaseio.com/usuarios';

export const getCarrito = (userKey) => {
  const url = `${API_CARRITO}/${userKey}.json`;
  return axios.get(url);
};

const agregarAlCarrito = async (celular, userKey, celularKey, unidades, pagina) => {
  try {
    const response = await getCarrito(userKey);
    const existingCarrito = response.data && response.data.carrito ? response.data.carrito : {};
    let updatedCarrito = { ...existingCarrito };

    if (updatedCarrito[celularKey]) {
      if (pagina === 'detalle') {
        updatedCarrito[celularKey].unidades += unidades;
      } else {
        updatedCarrito[celularKey].unidades = unidades;
      }
    } else {
      updatedCarrito[celularKey] = { unidades, info: celular };
    }

    const url = `${API_CARRITO}/${userKey}.json`;
    await axios.patch(url, { carrito: updatedCarrito });
  } catch (error) {
    console.error('Error during agregarAlCarrito:', error);
    throw error; // Handle the error appropriately in your application
  }
};

export const eliminarDelCarrito = (userKey, celularKey) => {
  return getCarrito(userKey).then((response) => {
    const existingCarrito = response.data && response.data.carrito ? response.data.carrito : {};
    let updatedCarrito = { ...existingCarrito };

    if (updatedCarrito[celularKey]) {
      delete updatedCarrito[celularKey];

      const url = `${API_CARRITO}/${userKey}.json`;
      return axios.patch(url, { carrito: updatedCarrito });
    } else {
      return Promise.resolve(); // Return a resolved promise or handle the scenario as needed
    }
  });
};

export const eliminarCarrito = (userKey) => {
  const url = `${API_CARRITO}/${userKey}/carrito.json`;
  return axios.delete(url);
};
export default {
  getCarrito,
  agregarAlCarrito,
  eliminarDelCarrito,
};