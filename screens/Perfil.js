import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getUsuarioPorId, putUsuario } from '../services/UsuariosService'; // Update the import path accordingly
import { getUserKey, logout } from '../services/LoginService'; // Update the import path accordingly
import { getFacturas } from '../services/FacturaService'; // Import the FacturaService
import { FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PDFView from 'react-native-view-pdf';


const PerfilComponent = () => {
  const [facturas, setFacturas] = useState([]);
  const [selectedFactura, setSelectedFactura] = useState(null);

  useEffect(() => {
    const fetchFacturas = async () => {
      const key = await getUserKey();
      if (key) {
        try {
          const response = await getFacturas(key);
          const facturasData = response.data || {};
          const facturasArray = Object.values(facturasData); // Convert the object values to an array
          setFacturas(facturasArray);
        } catch (error) {
          console.error('Error fetching facturas:', error);
        }
      }
    };

    fetchFacturas();
  }, []);
  const [usuarioKey, setUsuarioKey] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUsuario, setEditedUsuario] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      const key = await getUserKey();
      setUsuarioKey(key);

      if (key) {
        try {
          const response = await getUsuarioPorId(key);
          setUsuario(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, []);
  const modificarDatos = () => {
    setIsEditing(true);
    // Create a copy of the user data for editing
    setEditedUsuario({ ...usuario });
  };

  const cancelarEdicion = () => {
    setIsEditing(false);
    setEditedUsuario(null);
  };

  const guardarCambios = async () => {
    if (editedUsuario) {
      try {
        await putUsuario(usuarioKey, editedUsuario);
        // Update the displayed user information
        setUsuario(editedUsuario);
        setIsEditing(false);
      } catch (error) {
        console.error('Error updating user data:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      // Navigate to the CeluQuito screen after logout
      navigation.reset({
        index: 0,
        routes: [{ name: 'CeluQuito' }],
      });
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  
  
  const renderFacturaItem = ({ item }) => (
    <View style={styles.facturaRow}>
      <Text>{new Date(item.fecha).toLocaleDateString()}</Text>
      <Text>${item.total.toFixed(2)}</Text>
      <Text>{item.usuario.direccion}</Text>
      <TouchableOpacity style={styles.pdfIconLink}>
        <Icon name="file-pdf-o" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
  return (
    <ScrollView>
    <View style={styles.container}>
      {usuario && (
        <View>
          <Text style={styles.heading}>Perfil de {usuario.nombreUsuario}</Text>
          {!isEditing ? (
            <View style={styles.card}>
              <View style={styles.cardBody}>
                <Text>{`Nombre: ${usuario.nombre}`}</Text>
                <Text>{`Correo: ${usuario.correo}`}</Text>
                <Text>{`Dirección: ${usuario.direccion}`}</Text>
                <Text>{`Teléfono: ${usuario.telefono}`}</Text>
                {/* Add other user properties as needed */}
              </View>
            </View>
          ) : (
            <View style={styles.card}>
              <View style={styles.cardBody}>
                <TextInput
                  style={styles.input}
                  placeholder="Nombre"
                  value={editedUsuario.nombre}
                  onChangeText={(text) => setEditedUsuario({ ...editedUsuario, nombre: text })}
                  required
                />
                <TextInput
                  style={styles.input}
                  placeholder="Correo"
                  value={editedUsuario.correo}
                  onChangeText={(text) => setEditedUsuario({ ...editedUsuario, correo: text })}
                  required
                />
                <TextInput
                  style={styles.input}
                  placeholder="Dirección"
                  value={editedUsuario.direccion}
                  onChangeText={(text) => setEditedUsuario({ ...editedUsuario, direccion: text })}
                  required
                />
                <TextInput
                  style={styles.input}
                  placeholder="Teléfono"
                  value={editedUsuario.telefono}
                  onChangeText={(text) => setEditedUsuario({ ...editedUsuario, telefono: text })}
                  required
                />
                {/* Add other user properties as needed */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={cancelarEdicion} style={styles.cancelButton}>
                      <Text style={styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
                          <TouchableOpacity onPress={guardarCambios} style={styles.acceptButton}>
                            <Text style={styles.buttonText}>Aceptar</Text>
                          </TouchableOpacity>
                  </View>
              </View>
            </View>
          )}
           <View style={styles.center}>
            {!isEditing && (
              <>
                <TouchableOpacity onPress={modificarDatos} style={styles.blackButton}>
                  <Text style={styles.buttonText}>Modificar Datos</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLogout} style={styles.blackButton}>
                  <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
              </>
            )}
            
          </View>

          {/* Section to display PDF invoices */}
          {selectedFactura && (
              <View style={styles.pdfViewer}>
                <TouchableOpacity onPress={closePDFViewer} style={styles.closeButton}>
                  <Text style={styles.buttonText}>Cerrar</Text>
                </TouchableOpacity>
                <PDFView
                  fadeInDuration={250.0}
                  resource={selectedFactura.pdfUrl}
                  resourceType="url"
                  onLoad={() => console.log(`PDF rendered from ${selectedFactura.pdfUrl}`)}
                  onError={(error) => console.log('Cannot render PDF', error)}
                />
              </View>
            )}

<View style={styles.facturasContainer}>
          <Text style={styles.headingFacturas}>Historial de Compras</Text>
          <FlatList
            nestedScrollEnabled={true}
            scrollEnabled={false}
            data={facturas}
            renderItem={renderFacturaItem}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>
      </View>
    )}
  </View>
  </ScrollView>
);
};

const styles = StyleSheet.create({
  container: {
    
    marginVertical: 20,
    marginHorizontal: 10,
  },
  heading: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  headingFacturas: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  card: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  cardBody: {
    padding: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
  },
  blackButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
  center: {
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
  },
  acceptButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
  },
  pdfViewer: {
    // position: 'absolute', // Remove this line
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    zIndex: 1000,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
    backgroundColor: 'black',
    borderRadius: 5,
    zIndex: 1100,
  },
  // Styles for Facturas
  facturasContainer: {
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 10,
  },
  heading: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  facturasTable: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  tableHeader: {
    fontWeight: 'bold',
  },
  facturaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // Add this line to center items vertically
    marginVertical: 10,
  },
  pdfIconLink: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
  },
  pdfIcon: {
    color: 'white',
  },
});

export default PerfilComponent;