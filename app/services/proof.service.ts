import apiAxios from "../config/axios.config";
import { RequestCreateInterface } from "../interfaces/request.interface";

export const fetchProofs = async (requestId: number) => {
	try {
		const response = await apiAxios.get(`/proofs/request/${requestId}`); // Ajusta la ruta según tu API
		return response.data; // Devuelve las pruebas recibidas
	} catch (error: any) {
		throw new Error(error.response?.data?.message || "Error fetching proofs");
	}
};

export const uploadProof = async (requestId: number, formData: any) => {
	try {
		console.log('Uploading proof for request:', requestId);
		console.log('FormData contents:', formData);
		
		const response = await apiAxios.post(
			`/proofs/request/${requestId}`,
			formData,
			{
				headers: {
					Accept: "application/json",
					"Content-Type": "multipart/form-data",
				},
				timeout: 30000, // 30 segundos de timeout
			}
		);
		
		console.log('Upload response:', response.data);
		return response.data;
	} catch (error: any) {
		console.error("Error uploading proof:", error);
		console.error("Error response:", error.response?.data);
		console.error("Error status:", error.response?.status);
		
		// Manejar diferentes tipos de errores
		if (error.response?.status === 400) {
			const errorMessage = error.response?.data?.message || error.response?.data?.error || "Error en la solicitud";
			throw new Error(`Error 400: ${errorMessage}`);
		} else if (error.response?.status === 413) {
			throw new Error("El archivo es demasiado grande");
		} else if (error.response?.status === 415) {
			throw new Error("Tipo de archivo no soportado");
		} else if (error.code === 'ECONNABORTED') {
			throw new Error("Tiempo de espera agotado. Intenta con un archivo más pequeño");
		} else {
			throw new Error(error.response?.data?.message || "Error uploading proof");
		}
	}
};

// Función alternativa usando fetch para evitar problemas con ACL
export const uploadProofWithFetch = async (requestId: number, formData: any) => {
	try {
		console.log('Uploading proof with fetch for request:', requestId);
		
		// Obtener el token de autenticación
		const { getDataToken } = await import('../utils/storage');
		const tokenData = await getDataToken();
		
		const headers: any = {
			// No establecer Content-Type, dejar que el navegador lo maneje automáticamente
			// para multipart/form-data
		};
		
		if (tokenData?.accessToken) {
			headers['Authorization'] = `Bearer ${tokenData.accessToken}`;
		}
		
		const response = await fetch(`https://budget-team-api-production.up.railway.app/proofs/request/${requestId}`, {
			method: 'POST',
			body: formData,
			headers,
		});

		if (!response.ok) {
			const errorData = await response.text();
			console.error('Fetch error response:', errorData);
			throw new Error(`HTTP ${response.status}: ${errorData}`);
		}

		const result = await response.json();
		console.log('Fetch upload response:', result);
		return result;
	} catch (error: any) {
		console.error("Error uploading proof with fetch:", error);
		throw error;
	}
};

// Función que intenta diferentes métodos de subida
export const uploadProofMultipleMethods = async (requestId: number, formData: any) => {
	const methods = [
		{ name: 'fetch', fn: uploadProofWithFetch },
		{ name: 'axios', fn: uploadProof }
	];

	for (const method of methods) {
		try {
			console.log(`Trying upload with ${method.name}...`);
			const result = await method.fn(requestId, formData);
			console.log(`Success with ${method.name}:`, result);
			return result;
		} catch (error: any) {
			console.log(`${method.name} failed:`, error.message);
			
			// Si es el último método, lanzar el error
			if (method === methods[methods.length - 1]) {
				throw error;
			}
			
			// Si es el error de ACL, intentar el siguiente método
			if (error.message && error.message.includes("bucket does not allow ACLs")) {
				console.log(`ACL error with ${method.name}, trying next method...`);
				continue;
			}
			
			// Para otros errores, también intentar el siguiente método
			continue;
		}
	}
};

// Función para obtener URL firmada de un archivo
export const getSignedUrl = async (proofId: number): Promise<string> => {
	try {
		console.log('Getting signed URL for proof:', proofId);
		const response = await apiAxios.get(`/proofs/signed-url/${proofId}`);
		console.log('Signed URL response:', response.data);
		return response.data.signedUrl;
	} catch (error: any) {
		console.error("Error getting signed URL:", error);
		throw new Error(error.response?.data?.message || "Error getting signed URL");
	}
};

// Función para obtener URLs firmadas de múltiples archivos
export const getSignedUrls = async (proofs: any[]): Promise<any[]> => {
	try {
		const signedProofs = await Promise.all(
			proofs.map(async (proof) => {
				try {
					const signedUrl = await getSignedUrl(proof.id);
					return {
						...proof,
						signedUrl,
					};
				} catch (error) {
					console.error(`Error getting signed URL for proof ${proof.id}:`, error);
					return {
						...proof,
						signedUrl: null, // Fallback a URL original si falla
					};
				}
			})
		);
		return signedProofs;
	} catch (error: any) {
		console.error("Error getting signed URLs:", error);
		throw error;
	}
};
