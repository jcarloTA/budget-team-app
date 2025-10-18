export interface ProofInterface {
	id: number;
	fileName: string;
	fileUrl: string;
	signedUrl?: string; // URL firmada para acceso a archivos privados
    createdAt: string;
}
