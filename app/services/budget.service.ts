import axios from 'axios';
import { API_URL } from '../config/apiConfig'; // URL de tu API
import apiAxios from '../config/axios.config';

// Crear una instancia de Axios con la URL base


// Obtener todas las solicitudes
export const fetchBudgets = async () => {
  try {
    const response = await apiAxios.get('/budget'); // Ajusta la ruta según tu API
    console.log('Budgets0:', response.data);
    return response.data; // Devuelve las solicitudes recibidas
  } catch (error: any) {
    console.error('Error fetching budgets:', error);
    throw new Error(error.response?.data?.message || 'Error fetching requests');
  }
};

export const fetchBudgetsByTeamId = async (teamId: number) => {
  try {
    const response = await apiAxios.get(`/budget/team/${teamId}`); // Ajusta la ruta según tu API
    console.log('Budgets1:', response.data);
    return response.data; // Devuelve las solicitudes recibidas
  } catch (error: any) {
    console.error('Error fetching budgets:', error);
    throw new Error(error.response?.data?.message || 'Error fetching requests');
  }
}

// Crear una nueva solicitud
