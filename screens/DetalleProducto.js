import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import CelularesService from '../services/CelularesService';
import CarritoService from '../services/CarritoService'; 
import LoginService from '../services/LoginService'; 
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const DetalleProducto = ({ route }) => {
  const [celular, setCelular] = useState({
    marca: '',
    modelo: '',
    precio: 0,
    imagen_url: '',
    lanzamiento: 0,
    pantalla: { tipo: '', tamano: 0 },
    camara_principal: { resolucion: '', apertura: '' },
    bateria: 0,
    almacenamiento: 0,
    unidades: 1,
  });
  const navigation = useNavigation();

  useEffect(() => {
    const { key } = route.params;
    cargarCelular(key);
  }, [route.params]);

  const cargarCelular = (key) => {
    CelularesService.getCelularPorId(key)
      .then((response) => {
        const celularData = response.data;
        if (celularData && celularData.imagen_url) {
          const celularDetails = {
            marca: celularData.marca,
            modelo: celularData.modelo,
            precio: celularData.precio,
            imagen_url: celularData.imagen_url,
            lanzamiento: celularData.lanzamiento,
            pantalla: {
              tipo: celularData.pantalla.tipo,
              tamano: celularData.pantalla.tamano,
            },
            camara_principal: {
              resolucion: celularData.camara_principal.resolucion,
              apertura: celularData.camara_principal.apertura,
            },
            bateria: celularData.bateria,
            almacenamiento: celularData.almacenamiento,
            unidades: 1,
          };
          setCelular(celularDetails);
        } else {
          console.warn('Invalid celular data or missing image URL.');
        }
      })
      .catch((error) => {
        console.error('Error fetching celular data:', error);
      });
  };

  const comprar = async () => {
    const userKey = await AsyncStorage.getItem('userKey') || 'defaultUserKey';

    // Check if the user is authenticated
    if (await LoginService.isAuthenticated()) {
      const celularKey = celular.key;

      const celularForService = {
        marca: celular.marca,
        modelo: celular.modelo,
        precio: celular.precio,
        imagen_url: celular.imagen_url,
      };
      const lugar = 'detalle';

      CarritoService.agregarAlCarrito(
        celularForService,
        userKey,
        celularKey,
        celular.unidades,
        lugar
      )
        .then(() => {
          // Redirect to the carritoCompras component
          // Navigate using React Navigation
          navigation.navigate('Carrito');
        })
        .catch((error) => {
          console.error('Error adding to cart:', error);
        });
    } else {
      // User is not authenticated, redirect to login
      navigation.navigate('Login');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.col}>
          {celular.imagen_url ? (
            <Image
              source={{ uri: celular.imagen_url }}
              style={styles.productImage}
              resizeMode="cover"
            />
          ) : (
            <Text>No image available</Text>
          )}
        </View>
        <View style={styles.col}>
          <Text style={styles.productTitle}>{`${celular.marca} ${celular.modelo}`}</Text>
          <Text>{`Lanzamiento: ${celular.lanzamiento}`}</Text>
          <Text>{`Pantalla: ${celular.pantalla.tipo} - ${celular.pantalla.tamano} pulgadas`}</Text>
          <Text>{`Cámara Principal: ${celular.camara_principal.resolucion}, Apertura: ${celular.camara_principal.apertura}`}</Text>
          <Text>{`Batería: ${celular.bateria} mAh`}</Text>
          <Text>{`Almacenamiento: ${celular.almacenamiento} GB`}</Text>
          <Text>{`Precio: $${celular.precio}`}</Text>
          <Text>{`Cantidad: `}</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={celular.unidades.toString()}
            readOnly
          />
          <TouchableOpacity
            onPress={comprar}
            style={styles.buyButton}
            
          >
            <Text style={styles.buyButtonText}>Agregar al carrito</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Text style={styles.backButtonText}>Regresar a Catálogo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  backButtonText: {
    color: '#000',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    padding: 10,
  },
  col: {
    flex: 1,
    padding: 10,
  },
  productImage: {
    width: '100%',
    height: 400,
    borderRadius: 5,
  },
  productTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    // Add appropriate styles for TextInput
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    marginBottom: 10,
  },
  buyButton: {
    backgroundColor: '#000000',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  buyButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default DetalleProducto;