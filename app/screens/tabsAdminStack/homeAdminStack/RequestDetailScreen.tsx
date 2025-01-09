


import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Title, Paragraph, IconButton } from 'react-native-paper';
import * as DocumentPicker from 'expo-document-picker'; // Para seleccionar el archivo
import axios from 'axios'; // Usamos Axios para la solicitud
import { RequestInterface } from '../../../interfaces/request.interface';
import { changeStatusRequest } from '../../../services/request.service';
import { useNavigation } from '@react-navigation/native';


type CreateREquestProps = {
	route: {
        params: RequestInterface
    };
};
const RequestDetailScreen: React.FC<any> = ({route}: CreateREquestProps) => {
  const [fileUri, setFileUri] = useState<string | null>(null); // URI del archivo seleccionado
  const [approvalStatus, setApprovalStatus] = useState<'pending' | 'approved' | 'rejected'>('pending'); // Estado de la aprobación
const navigation = useNavigation();


  const {  id, reason, description, requestedAmount } = route.params;
  // Función para seleccionar un archivo
  const handleSelectFile = async () => {
    try {
    
        const result = await DocumentPicker.getDocumentAsync({
            type: '*/*', // Permitir cualquier tipo de archivo
          });
        if (result.assets) {
            setFileUri(result.assets[0].name); // Guardamos la URI del archivo seleccionado
            Alert.alert('Archivo seleccionado', `Nombre: ${result.assets[0].name}`);
        } else {
            Alert.alert('No se seleccionó ningún archivo');
        }
    } catch (error) {
      console.error('Error seleccionando archivo:', error);
      Alert.alert('Error', 'Hubo un problema al seleccionar el archivo.');
    }
  };

  // Función para aprobar o rechazar la solicitud
  const handleApproval = async (status: 'approved' | 'rejected') => {
    try {
      // Lógica para enviar la solicitud de aprobación al backend
        
      const response = await changeStatusRequest(id, status);

      if(response && status === 'approved') {
        Alert.alert('Success', "Solicitud actualizada correctamente");
      }
      if(response && status === 'rejected') {
        Alert.alert('Success', "Solicitud rechazada correctamente");
      }
 
      navigation.goBack();
    } catch (error) {
      console.error('Error aprobando la solicitud:', error);
      Alert.alert('Error', 'Hubo un problema al procesar la solicitud.');
    }
  };

  const handleConfirmation = (status: 'approved' | 'rejected') => {
    Alert.alert(
      'Confirmación',
      `¿Estás seguro de que deseas ${status === 'approved' ? 'aprobar' : 'rechazar'} esta solicitud?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: () => handleApproval(status), // Llama a handleApproval si se confirma
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Title>{reason}</Title>
      <Paragraph>{description}</Paragraph>
      <Paragraph style={styles.amount}>Monto: Q{requestedAmount}</Paragraph>

      {/* Botón para seleccionar archivo */}
      <Button
        icon="folder-open"
        mode="contained"
        onPress={handleSelectFile}
        style={styles.fileButton}
      >
        Subir archivo
      </Button>

      {fileUri && (
        <Paragraph style={styles.fileUri}>
          Archivo seleccionado: {fileUri}
        </Paragraph>
      )}

      {/* Botones para aprobar o rechazar */}
      {approvalStatus === 'pending' && (
        <View style={styles.buttonsContainer}>
          <Button
            mode="contained"
            onPress={() => handleConfirmation('approved')}
            style={styles.approveButton}
          >
            Aprobar solicitud
          </Button>
          <Button
            mode="contained"
            onPress={() => handleConfirmation('rejected')}
            style={styles.rejectButton}
          >
            Rechazar solicitud
          </Button>
        </View>
      )}

      {approvalStatus !== 'pending' && (
        <Paragraph style={styles.statusMessage}>
          Solicitud {approvalStatus === 'approved' ? 'aprobada' : 'rechazada'}
        </Paragraph>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
      },
      amount: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
      },
      fileButton: {
        marginVertical: 20,
      },
      fileUri: {
        fontStyle: 'italic',
        color: 'grey',
        marginBottom: 20,
      },
      buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
      },
      approveButton: {
        backgroundColor: 'green',
        flex: 1,
        marginRight: 10,
      },
      rejectButton: {
        backgroundColor: 'red',
        flex: 1,
      },
      statusMessage: {
        marginTop: 20,
        fontSize: 16,
        color:  'red',
      },
});

export default RequestDetailScreen;
