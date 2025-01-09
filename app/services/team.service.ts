
import apiAxios from '../config/axios.config';



// Obtener todos los equipos
export const fetchTeams = async () => {
  try {
    const response = await apiAxios.get('/team'); // Ajusta la ruta según tu API
    return response.data; // Devuelve los equipos recibidos
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error fetching teams');
  }
};
