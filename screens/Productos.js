import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CelularesService from '../services/CelularesService';

const ProductosComponent = () => {
  const navigation = useNavigation();
  const [dataCelulares, setDataCelulares] = useState([]);
  const [celularesPorMarca, setCelularesPorMarca] = useState([]);
  const [mostrarAll, setMostrarAll] = useState(true);

  useEffect(() => {
    cargarCelulares();
  }, []);

  const cargarCelulares = () => {
    CelularesService.getCelulares().then((datos) => {
      setDataCelulares(Object.entries(datos).map(([key, value]) => ({ key, ...value })));
    });
  };

  const marcaClickeada = (marca) => {
    cargarCelularesPorMarca(marca);
    setMostrarAll(false);
  };

  const cargarCelularesPorMarca = (marca) => {
    CelularesService.getCelularesPorMarca(marca).then((data) => {
      setCelularesPorMarca(data);
    });
  };

  const goToDetalleProducto = (key) => {
    // Use navigation directly to navigate to 'DetalleProducto'
    navigation.navigate('DetalleProducto', { key });
  };

  const renderProductos = (productos) => {
    return productos.map((celular, index) => (
      <TouchableOpacity
        key={index}
        style={styles.cardContainer}
        onPress={() => goToDetalleProducto(celular.key)}
      >
        <Image source={{ uri: celular.imagen_url }} style={styles.cardImage} resizeMode="cover" />
        <Text style={styles.cardText}>{celular.marca}</Text>
        <Text style={styles.cardText}>{celular.modelo}</Text>
        <Text style={styles.cardText}>Precio: ${celular.precio}</Text>
      </TouchableOpacity>
    ));
  };

  const renderBrandButtons = () => {
    const marcas = [
      'Apple',
      'Samsung',
      'OnePlus',
      'Xiaomi',
      'Google',
      'Huawei',
      'Sony',
      'Motorola',
      'LG',
      'Nokia',
    ];

    return (
      <View style={styles.buttonContainer}>
        {marcas.map((marca, index) => (
          <TouchableOpacity key={index} onPress={() => marcaClickeada(marca)} style={styles.navButton}>
            <Text style={styles.navButtonText}>{marca}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.row}>
        {/* Navigation Bar */}
        <View style={styles.navbar}>
          <TouchableOpacity onPress={() => setMostrarAll(true)} style={styles.navButton}>
            <Text style={styles.navButtonText}>Todas las marcas</Text>
          </TouchableOpacity>
          {/* Add other brand buttons */}
          {renderBrandButtons()}
        </View>

        {/* Catalog of Celulares */}
        <View style={styles.catalogo}>
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>Nuestra selección de productos</Text>
          </View>

          <View style={styles.catalogContainer}>
            {mostrarAll
              ? renderProductos(dataCelulares)
              : renderProductos(celularesPorMarca)}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    marginBottom: 20,
  },
  catalogo: {
    flex: 1,
    padding: 10,
  },
  headingContainer: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
  },
  catalogContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardContainer: {
    width: '48%',
    marginVertical: 5,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
  },
  cardImage: {
    width: '100%',
    height: 150,
    borderRadius: 5,
    marginBottom: 5,
  },
  navButton: {
    padding: 10,
    borderRadius: 5,
    margin: 5,
    backgroundColor: '#000000',
  },
  navButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  detailsButton: {
    backgroundColor: '#000000',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default ProductosComponent;