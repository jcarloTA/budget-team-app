import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginResponse } from '../interfaces/auth.interface';

// Guardar el token de autenticación
export const storeDataToken = async (token: LoginResponse) => {
  try {
    await AsyncStorage.setItem('authToken', JSON.stringify(token));
  } catch (error) {
    console.error('Error storing token:', error);
  }
};

// Obtener el token de autenticación
export const getDataToken = async (): Promise<LoginResponse | null> => {
  try {
    const data =  await AsyncStorage.getItem('authToken');
    return data ? JSON.parse(data) :    null;
  } catch (error) {
    console.error('Error retrieving token:', error);
    return null;
  }
};

// Eliminar el token (logout)
export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('authToken');
  } catch (error) {
    console.error('Error removing token:', error);
  }
};
