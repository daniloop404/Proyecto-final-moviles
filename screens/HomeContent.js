import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.col}>
        <Text style={styles.heading}>CeluQuito</Text>
        <Image
          source={{ uri: 'https://tecstore.pe/media/magefan_blog/1_60_1_.jpg' }}
          style={styles.image}
        />
        <Text style={styles.description}>
          CeluQuito es tu destino principal para la compra de teléfonos móviles en la ciudad de Quito.
          Ofrecemos una amplia gama de smartphones de las marcas más reconocidas, garantizando la última
          tecnología y los precios más competitivos. Nos enorgullece brindar un servicio excepcional y
          productos de calidad que satisfacen las necesidades de nuestros clientes.
        </Text>

        <Text style={[styles.heading, { textAlign: 'center', marginTop: 20 }]}>Catálogo de Productos:</Text>
        <Image
          source={{
            uri: 'https://celularesecuador.com/website/wp-content/uploads/2021/10/laptop-1024x539.png',
          }}
          style={styles.bigImage}
        />
        <Text>• Smartphones de las principales marcas (Apple, Samsung, Huawei, Xiaomi, entre otros).</Text>
        <Text>• Accesorios para teléfonos móviles (fundas, protectores de pantalla, cargadores, auriculares, etc.).</Text>
        <Text>• Teléfonos reacondicionados certificados con garantía.</Text>

        <Text style={[styles.heading, { marginTop: 20, textAlign: 'center' }]}>Servicios Adicionales:</Text>
        <Image
          source={{
            uri: 'https://static.wixstatic.com/media/961dc9_3fbb4b3c6182445e8093012b7a5b18e6~mv2.png/v1/fit/w_1200,h_1200,al_c/961dc9_3fbb4b3c6182445e8093012b7a5b18e6~mv2.png',
          }}
          style={styles.serviceImage}
        />
        <Text>• Asesoramiento personalizado para ayudar a los clientes a encontrar el dispositivo perfecto.</Text>
        <Text>• Programa de intercambio para teléfonos antiguos.</Text>
        <Text>• Servicio técnico y reparación de dispositivos.</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    marginBottom: 20,
  },
  col: {
    flex: 1,
    padding: 10,
  },
  heading: {
    fontSize: 20,
    color: 'black',
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 10,
  },
  bigImage: {
    width: '100%',
    height: 400,
    marginTop: 10,
  },
  serviceImage: {
    width: '100%',
    height: 250,
    marginTop: 10,
  },
  description: {
    color: 'black',
    marginTop: 10,
  },
});

export default HomeScreen;