import { Text } from "react-native-paper";

import { View, StyleSheet, Alert, ScrollView } from "react-native";
import { TextInput, Button, Title } from "react-native-paper";
import { useState } from "react";
import { useRequest } from "../../../hooks/use.requests";


type CreateREquestProps = {
	route: any;
}

export default function CreateRequestScreen({route}: CreateREquestProps) {


	const [reason, setReason] = useState("");
	const [description, setDescription] = useState("");
	const [amount, setAmount] = useState("");
	const { loadingCreateRequest, createRequestPost } = useRequest();
	
	const { budgetId } = route.params;

	const handleCreateRequest = async () => {
		// Validación de los campos
		if (!reason || !description || !amount) {
			Alert.alert("Error", "Por favor, completa todos los campos.");
			return;
		}

		try {
            const requestData = {
                requestedAmount: parseFloat(amount),
                description,
                reason,
                budgetId: budgetId
            }
            const response = await createRequestPost(requestData);
            Alert.alert("Solicitud creada", "La solicitud ha sido creada correctamente.");
            setReason("");
            setDescription("");
            setAmount("");

        } catch (error) {
			Alert.alert(
				"Error",
				"No se pudo crear la solicitud. Intenta nuevamente."
			);
			console.error(error);
		}
	};
	return (
		<ScrollView style={styles.container}>
			<Title style={styles.title}>Crear Solicitud {budgetId}</Title>

			{/* Formulario con React Native Paper */}
			<TextInput
				label="Razon"
				value={reason}
				onChangeText={setReason}
				style={styles.input}
				mode="outlined"
			/>
			<TextInput
				label="Descripción"
				value={description}
				onChangeText={setDescription}
				style={styles.input}
				mode="outlined"
				multiline
			/>
			<TextInput
				label="Monto"
				value={amount}
				onChangeText={setAmount}
				style={styles.input}
				mode="outlined"
				keyboardType="numeric"
			/>

			<Button
				mode="contained"
				onPress={handleCreateRequest}
				style={styles.button}
                loading={loadingCreateRequest}
                disabled={loadingCreateRequest}
			>
				Crear Solicitud
			</Button>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	title: {
		textAlign: "center",
		marginBottom: 20,
	},
	input: {
		marginBottom: 15,
	},
	button: {
		marginTop: 20,
	},
});
