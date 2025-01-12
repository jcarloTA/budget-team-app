import { Text } from "react-native-paper";

import { View, StyleSheet, Alert, ScrollView } from "react-native";
import { TextInput, Button, Title } from "react-native-paper";
import { useState } from "react";
import { useRequest } from "../../../hooks/use.requests";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RequestInterface } from "../../../interfaces/request.interface";


type CreateREquestProps = {
	route: any;
}
type RootStackParamList = {
	requestCreatedDetail: RequestInterface;
	// other routes can be added here
};
export default function CreateRequestScreen({route}: CreateREquestProps) {

	const navigation = useNavigation<NavigationProp<RootStackParamList>>();
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
			console.log('response',response);
			navigation.navigate("requestCreatedDetail", response);
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
			<Title style={styles.title}>Crear Solicitud </Title>

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
