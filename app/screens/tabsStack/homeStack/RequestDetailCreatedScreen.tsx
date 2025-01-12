import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert, Linking, ScrollView } from "react-native";
import {
	TextInput,
	Button,
	Title,
	Paragraph,
	IconButton,
} from "react-native-paper";
import axios from "axios"; // Usamos Axios para la solicitud
import { RequestInterface } from "../../../interfaces/request.interface";
import { changeStatusRequest } from "../../../services/request.service";
import { useNavigation } from "@react-navigation/native";
import { fetchProofs, uploadProof } from "../../../services/proof.service";
import { ProofInterface } from "../../../interfaces/proofs.interface";
import { List } from "react-native-paper";
import * as DocumentPicker from "expo-document-picker";

type CreateREquestProps = {
	route: {
		params: RequestInterface;
	};
};
const RequestDetailCreatedScreen: React.FC<any> = ({ route }: CreateREquestProps) => {
	const [fileUri, setFileUri] = useState<string | null>(null); // URI del archivo seleccionado
	const [approvalStatus, setApprovalStatus] = useState<
		"pending" | "approved" | "rejected"
	>("pending"); // Estado de la aprobación
	const navigation = useNavigation();
	const [proofs, setProofs] = useState<ProofInterface[]>([]);
	const [loadingFile, setLoadingFile] = useState(false);

	const { id, reason, description, requestedAmount } = route.params;

	useEffect(() => {
		loadProofs();
	}, []);

	const loadProofs = async () => {
		try {
			const proofs = await fetchProofs(id);
			setProofs(proofs);
		} catch (error) {
			console.error("Error loading proofs:", error);
			Alert.alert("Error", "Hubo un problema cargando las pruebas.");
		}
	};
	// Función para seleccionar un archivo
	const handleSelectFile = async () => {
		try {
			const docRes = await DocumentPicker.getDocumentAsync({
				type: "*/*", // Permite todos los tipos de archivos
				copyToCacheDirectory: true, // Asegúrate de que el archivo tenga un URI accesible
			});

			setLoadingFile(true);
			console.log("file", docRes.assets);
			const assets = docRes.assets;
			if (!assets || assets.length === 0) {
				return;
			}
			const formData = new FormData();
			const fileAsset = assets[0];
			const file = {
				name: fileAsset.name.split(".")[0],
				uri: fileAsset.uri,
				type: fileAsset.mimeType,
				size: fileAsset.size,
			};
			formData.append("file", file as any);
			console.log("formData", formData);
			const response = await uploadProof(id, formData);
			if (response) {
				Alert.alert("Success", "Archivo subido correctamente");
			}
			loadProofs();
		} catch (error) {
			console.error("Error seleccionando archivo:", error);
			Alert.alert("Error", "Hubo un problema al seleccionar el archivo.");
		} finally {
			setLoadingFile(false);
		}
	};

	// Función para aprobar o rechazar la solicitud
	const handleApproval = async (status: "approved" | "rejected") => {
		try {
			// Lógica para enviar la solicitud de aprobación al backend

			const response = await changeStatusRequest(id, status);

			if (response && status === "approved") {
				Alert.alert("Success", "Solicitud actualizada correctamente");
			}
			if (response && status === "rejected") {
				Alert.alert("Success", "Solicitud rechazada correctamente");
			}

			navigation.goBack();
		} catch (error) {
			console.error("Error aprobando la solicitud:", error);
			Alert.alert("Error", "Hubo un problema al procesar la solicitud.");
		}
	};

	const handleConfirmation = (status: "approved" | "rejected") => {
		Alert.alert(
			"Confirmación",
			`¿Estás seguro de que deseas ${
				status === "approved" ? "aprobar" : "rechazar"
			} esta solicitud?`,
			[
				{
					text: "Cancelar",
					style: "cancel",
				},
				{
					text: "Confirmar",
					onPress: () => handleApproval(status), // Llama a handleApproval si se confirma
				},
			]
		);
	};

	return (
		<ScrollView style={styles.container}>
			<Title>{reason}</Title>
			<Paragraph>{description}</Paragraph>
			<Paragraph style={styles.amount}>Monto: Q{requestedAmount}</Paragraph>

			{/* Botón para seleccionar archivo */}
			<Button
				icon="folder-open"
				mode="contained"
				onPress={handleSelectFile}
				style={styles.fileButton}
				loading={loadingFile}
				disabled={loadingFile}
			>
				Subir archivo
			</Button>

		
			{proofs.map((proof) => (
				<List.Item
					key={proof.id}
					title={proof.fileName}
					description={`Subido el: ${new Date(
						proof.createdAt
					).toLocaleString()}`}
					left={() => <List.Icon icon="file" />}
					right={() => (
						<Button onPress={() => Linking.openURL(proof.fileUrl)}>
							Ver archivo
						</Button>
					)}
				/>
			))}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	amount: {
		fontSize: 18,
		fontWeight: "bold",
		marginVertical: 10,
	},
	fileButton: {
		marginVertical: 20,
	},
	fileUri: {
		fontStyle: "italic",
		color: "grey",
		marginBottom: 20,
	},
	buttonsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 20,
	},
	approveButton: {
		backgroundColor: "green",
		flex: 1,
		marginRight: 10,
	},
	rejectButton: {
		backgroundColor: "red",
		flex: 1,
	},
	statusMessage: {
		marginTop: 20,
		fontSize: 16,
		color: "red",
	},
});

export default RequestDetailCreatedScreen;
