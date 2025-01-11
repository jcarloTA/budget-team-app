
import apiAxios from '../config/axios.config';
import { RequestCreateInterface } from '../interfaces/request.interface';

// Crear una instancia de Axios con la URL base


// Obtener todas las solicitudes
export const fetchRequests = async () => {
  try {
    const response = await apiAxios.get('/request'); // Ajusta la ruta según tu API
    return response.data; // Devuelve las solicitudes recibidas
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error fetching requests');
  }
};

// Crear una nueva solicitud
export const createRequest = async (requestData: RequestCreateInterface) => {
  try {
    const response = await apiAxios.post('/request', requestData); // Ajusta la ruta según tu API
    return response.data; // Devuelve la solicitud creada
  } catch (error: any) {
    console.error('Error creating request:', error);
    throw new Error(error.response?.data?.message || 'Error creating request');
  }
};

export const fetchRequestsByBudgetId = async (budgetId: number) => {
  try {
    const response = await apiAxios.get(`/request/budget/${budgetId}`); // Ajusta la ruta según tu API
    return response.data; // Devuelve las solicitudes recibidas
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error fetching requests');
  }
}

export const changeStatusRequest = async (requestId: number, status: string) => {
  try {
    const response = await apiAxios.patch(`/request/${requestId}/status`, { status }); // Ajusta la ruta según tu API
    return response.data; // Devuelve la solicitud actualizada
  } catch (error: any) {
    console.error('Error changing request status:', error);
    throw new Error(error.response?.data?.message || 'Error changing request status');
  }
}
