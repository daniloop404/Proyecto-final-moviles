import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, Button, Alert } from 'react-native';
import { getCarrito, agregarAlCarrito, eliminarDelCarrito, eliminarCarrito } from '../services/CarritoService';
import { getUsuarioPorId } from '../services/UsuariosService';
import { agregarFactura } from '../services/FacturaService';

const CarritoComprasComponent = () => {
  const [carritoData, setCarritoData] = useState([]);
  const [isCartEmpty, setIsCartEmpty] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const userKey = sessionStorage.getItem('userKey') || 'defaultUserKey';

      try {
        const response = await getCarrito(userKey);
        const carrito = response.data.carrito || {};

        const updatedCarritoData = Object.keys(carrito).map((key) => ({
          key,
          ...carrito[key],
          subtotal: carrito[key].info.precio * carrito[key].unidades,
        }));

        setCarritoData(updatedCarritoData);
        setIsCartEmpty(updatedCarritoData.length === 0);
      } catch (error) {
        console.error('Error fetching carrito data', error);
      }
    };

    fetchData();
  }, []);

  const confirmRealizarPedido = () => {
    Alert.alert(
      'Confirmación',
      '¿Estás seguro de que quieres realizar la compra?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Aceptar', onPress: realizarPedido },
      ],
    );
  };

  const realizarPedido = async () => {
    const userKey = sessionStorage.getItem('userKey') || 'defaultUserKey';

    try {
      const userData = await getUsuarioPorId(userKey);

      const facturaData = {
        usuario: {
          nombre: userData.nombre,
          telefono: userData.telefono,
          direccion: userData.direccion,
          correo: userData.correo,
        },
        carrito: carritoData,
        total: calcularCostoTotal(),
        fecha: new Date().toISOString(),
      };

      await agregarFactura(userKey, facturaData);
      await eliminarCarrito(userKey);

      // Refresh the carrito data after removing the items
      const updatedCarritoData = await getCarrito(userKey);
      setCarritoData(updatedCarritoData.data.carrito || []);
      setIsCartEmpty(true);

      // You might need to handle navigation or other actions here
    } catch (error) {
      console.error('Error processing pedido', error);
    }
  };

  const actualizarUnidades = async (item) => {
    const userKey = sessionStorage.getItem('userKey') || 'defaultUserKey';
    const lugar = 'carrito';

    try {
      await agregarAlCarrito(item.info, userKey, item.key, item.unidades, lugar);

      // Update the current item's subtotal and units
      item.subtotal = item.info.precio * item.unidades;

      // Update the local carritoData array
      const updatedCarritoData = carritoData.map((cartItem) =>
        cartItem.key === item.key ? { ...item } : cartItem,
      );

      setCarritoData(updatedCarritoData);
    } catch (error) {
      console.error('Error updating unidades', error);
    }
  };

  const eliminarItem = async (itemKey) => {
    const userKey = sessionStorage.getItem('userKey') || 'defaultUserKey';

    try {
      await eliminarDelCarrito(userKey, itemKey);

      // Update the cart data after removing the item
      const updatedCarritoData = await getCarrito(userKey);
      setCarritoData(updatedCarritoData.data.carrito || []);
      setIsCartEmpty(true);

      // You might need to handle navigation or other actions here
    } catch (error) {
      console.error('Error deleting item from carrito', error);
    }
  };

  const calcularCostoTotal = () => {
    const costoTotal = carritoData.reduce((total, item) => total + item.subtotal, 0);
    const iva = costoTotal * 0.12;
    return costoTotal + iva;
  };

  return (
    <View>
      {/* Render your React Native UI here using the converted HTML structure */}
    </View>
  );
};

export default CarritoComprasComponent;