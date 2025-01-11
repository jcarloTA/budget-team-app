import axios from 'axios';
import { API_URL } from './apiConfig';
import { getDataToken } from '../utils/storage';

const apiAxios = axios.create({
  baseURL: API_URL, // Reemplaza con la URL de tu API
});

apiAxios.interceptors.request.use(
  async (config) => {
    // Recuperar el token de AsyncStorage (o donde lo hayas almacenado)
    const data = await getDataToken();
    
    if (data) {
      // Si hay un token, lo añadimos como Authorization: Bearer <token> en los headers
      config.headers['Authorization'] = `Bearer ${data.accessToken}`;
    } 
    
    return config;
  },
  (error) => {
    // Si ocurre un error al configurar la solicitud, lo manejamos aquí
    return Promise.reject(error);
  }
);

export default apiAxios;
