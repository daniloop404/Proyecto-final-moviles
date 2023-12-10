import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, TextInput, Alert,StyleSheet,ScrollView,TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { getCarrito, agregarAlCarrito, eliminarDelCarrito, eliminarCarrito } from '../services/CarritoService';
import { getUsuarioPorId } from '../services/UsuariosService';
import { agregarFactura } from '../services/FacturaService';
import { useNavigation } from '@react-navigation/native';
const CarritoComprasComponent = () => {
  const [carritoData, setCarritoData] = useState([]);
  const [isCartEmpty, setIsCartEmpty] = useState(true);
  const navigation = useNavigation();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userKey = await AsyncStorage.getItem('userKey') || 'defaultUserKey';
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
    const userKey = await AsyncStorage.getItem('userKey') || 'defaultUserKey';

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

  const actualizarUnidades = async (item, newUnits) => {
    const userKey = await AsyncStorage.getItem('userKey') || 'defaultUserKey';
    const lugar = 'carrito';

    // Ensure newUnits is a number between 1 and 10
    const validatedUnits = Math.min(Math.max(parseInt(newUnits) || 1, 1), 10);

    try {
      await agregarAlCarrito(item.info, userKey, item.key, validatedUnits, lugar);

      // Update the current item's subtotal and units
      item.subtotal = item.info.precio * validatedUnits;

      // Update the local carritoData array
      const updatedCarritoData = carritoData.map((cartItem) =>
        cartItem.key === item.key ? { ...item, unidades: validatedUnits } : cartItem,
      );

      setCarritoData(updatedCarritoData);
    } catch (error) {
      console.error('Error updating unidades', error);
    }
  };
  const eliminarItem = async (itemKey) => {
    const userKey = await AsyncStorage.getItem('userKey') || 'defaultUserKey';
  
    try {
      await eliminarDelCarrito(userKey, itemKey);
  
      // Update the cart data after removing the item
      const updatedCarritoDataResponse = await getCarrito(userKey);
  
      // Check if the response has a data property
      const updatedCarritoData = updatedCarritoDataResponse.data && updatedCarritoDataResponse.data.carrito
        ? updatedCarritoDataResponse.data.carrito
        : [];
  
      setCarritoData(updatedCarritoData);
  
      // Check if the cart is empty
      setIsCartEmpty(updatedCarritoData.length === 0);
  
      // Reset the application after eliminating an item
      navigation.reset({
        index: 0,
        routes: [{ name: 'Carrito' }], // Adjust the route name based on your navigation setup
      });
  
      // Optionally, you can force a re-render by toggling a state
      // e.g., if you have a state like refreshScreen, you can do:
      // setRefreshScreen((prev) => !prev);
    } catch (error) {
      console.error('Error deleting item from carrito', error);
    }
  };

  const calcularCostoTotal = () => {
    const costoTotal = carritoData.reduce((total, item) => total + item.subtotal, 0);
    const iva = costoTotal * 0.12;
    return costoTotal + iva;
  };
  const QuantityInput = ({ value, onIncrease, onDecrease }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <TouchableOpacity onPress={onDecrease}>
        <Text style={{ fontSize: 20, marginRight: 8 }}>-</Text>
      </TouchableOpacity>
      <TextInput
        style={{ borderWidth: 1, padding: 4, width: 50, textAlign: 'center' }}
        value={value.toString()}
        keyboardType="numeric"
        maxLength={2}
        editable={false} // Disable direct input
      />
      <TouchableOpacity onPress={onIncrease}>
        <Text style={{ fontSize: 20, marginLeft: 8 }}>+</Text>
      </TouchableOpacity>
    </View>
  );

  const styles = StyleSheet.create({
    container: {
      marginVertical: 16,
      padding: 16,
      backgroundColor: '#eee',
    },
    itemContainer: {
      flexDirection: 'row',
    },
    image: {
      width: 100,
      height: 100,
    },
    itemDetails: {
      marginLeft: 16,
    },
    subtotalAndButtonContainer: {
      marginLeft: 'auto',
      alignItems: 'flex-end',
    },
  });
  return (
    <ScrollView>
    <View>
      <Text style={{ textAlign: "center", fontSize: 24, marginVertical: 16 }}>
        Carrito de Compras
      </Text>
  
      {carritoData.length > 0 ? (
        carritoData.map((item) => (
          <View key={item.key} style={styles.container}>
            <View style={styles.itemContainer}>
              <Image source={{ uri: item.info.imagen_url }} style={styles.image} />
              <View style={styles.itemDetails}>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  {item.info.marca} {item.info.modelo}
                </Text>
                <Text>Precio: ${item.info.precio}</Text>
                <Text>Cantidad:</Text>
                <QuantityInput
                  value={item.unidades}
                  onIncrease={() => actualizarUnidades(item, item.unidades + 1)}
                  onDecrease={() => actualizarUnidades(item, item.unidades - 1)}
                />
              </View>
            </View>
            <View style={styles.subtotalAndButtonContainer}>
              <Text>Subtotal: ${item.subtotal.toFixed(2)}</Text>
              <Button
                title="Eliminar"
                onPress={() => eliminarItem(item.key)}
                color="red"
              />
            </View>
          </View>
        ))
      ) : (
        <View style={{ marginVertical: 16, alignItems: "center" }}>
          <Text>El carrito está vacío. Revisa nuestra selección y llénalo.</Text>
        </View>
      )}
  
      {carritoData.length > 0 && (
        <View style={{ marginVertical: 16, alignItems: "center" }}>
          <Button title="Realizar Pedido" onPress={confirmRealizarPedido} />
        </View>
      )}
  
      {carritoData.length > 0 && (
        <View style={{ marginVertical: 16, alignItems: "center" }}>
          <Text>
            Costo Total con IVA (12%): ${calcularCostoTotal().toFixed(2)}
          </Text>
        </View>
      )}
    </View>
    </ScrollView>
  );
};

export default CarritoComprasComponent;