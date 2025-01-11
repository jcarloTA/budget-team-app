import axios from 'axios';
import { API_URL } from '../config/apiConfig'; // URL base de la API
import { storeDataToken } from '../utils/storage'; // Función para guardar el token en AsyncStorage
import { LoginResponse } from '../interfaces/auth.interface';


// Crear una instancia de Axios para configuraciones comunes
const api = axios.create({
  baseURL: API_URL,
});

// Método para login
export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>('/auth/login', {
      email,
      password,
    });

    const data = response.data;

    // Guardar el token en AsyncStorage
    await storeDataToken(data);

    return data; // Retorna el token recibido
  } catch (error: any) {
    console.error('Login failed:', error);
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};
