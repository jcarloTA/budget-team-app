

import apiAxios from '../config/axios.config';
import { RequestCreateInterface } from '../interfaces/request.interface';

export const fetchProofs = async (requestId: number) => {
    try {
        const response = await apiAxios.get(`/proofs/request/${requestId}`); // Ajusta la ruta según tu API
        return response.data; // Devuelve las pruebas recibidas
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error fetching proofs');
    }
    
}

export const uploadProof = async (requestId: number, file: File) => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        const response = await apiAxios.post(`/proofs/request/${requestId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }); // Ajusta la ruta según tu API
        return response.data; // Devuelve la prueba creada
    } catch (error: any) {
        console.error('Error uploading proof:', JSON.stringify(error));
        throw new Error(error.response?.data?.message || 'Error uploading proof');
    }
}