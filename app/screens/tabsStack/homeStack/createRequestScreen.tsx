import { Text } from "react-native-paper";

import { View, StyleSheet, Alert, ScrollView } from "react-native";
import { TextInput, Button, Title, HelperText } from "react-native-paper";
import { useState, useEffect } from "react";
import { useRequest } from "../../../hooks/use.requests";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RequestInterface } from "../../../interfaces/request.interface";
import { useValidation } from "../../../hooks/useValidation";
import { createRequestValidator } from "../../../utils/validation";


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

	// Debug: Log del budgetId recibido
	useEffect(() => {
		console.log('CreateRequestScreen - budgetId received:', budgetId);
		if (!budgetId) {
			Alert.alert("Error", "No se recibió el ID del presupuesto. Regresa al inicio e intenta nuevamente.");
		}
	}, [budgetId]);

	// Hook de validación
	const {
		errors,
		isValid,
		validateField,
		validateAll,
		clearErrors,
		hasError,
		getFieldError
	} = useValidation({
		validator: createRequestValidator,
		validateOnChange: true
	});

	// Función para manejar cambios en los campos con validación
	const handleFieldChange = (field: string, value: string) => {
		switch (field) {
			case 'reason':
				setReason(value);
				break;
			case 'description':
				setDescription(value);
				break;
			case 'amount':
				setAmount(value);
				break;
		}
		validateField(field, value);
	};

	const handleCreateRequest = async () => {
		// Validación completa antes de enviar
		const formData = { reason, description, amount };
		const isFormValid = validateAll(formData);

		if (!isFormValid) {
			Alert.alert("Error", "Por favor, corrige los errores en el formulario.");
			return;
		}

		try {
			console.log('budgetId:', budgetId);
            const requestData = {
                requestedAmount: parseFloat(amount),
                description,
                reason,
                budgetId: budgetId
            }
			console.log('requestData',requestData);
            const response = await createRequestPost(requestData);
			console.log('response',response);
			// navigation.navigate("requestCreatedDetail", response);
            Alert.alert("Solicitud creada", "La solicitud ha sido creada correctamente.");
            
            // Limpiar formulario y errores
            setReason("");
            setDescription("");
            setAmount("");
            clearErrors();

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
				label="Razón *"
				value={reason}
				onChangeText={(value) => handleFieldChange('reason', value)}
				style={styles.input}
				mode="outlined"
				error={hasError('reason')}
				placeholder="Ej: Compra de materiales de oficina"
			/>
			<HelperText type="error" visible={hasError('reason')}>
				{getFieldError('reason')}
			</HelperText>

			<TextInput
				label="Descripción *"
				value={description}
				onChangeText={(value) => handleFieldChange('description', value)}
				style={styles.input}
				mode="outlined"
				multiline
				numberOfLines={3}
				error={hasError('description')}
				placeholder="Describe detalladamente el propósito de la solicitud..."
			/>
			<HelperText type="error" visible={hasError('description')}>
				{getFieldError('description')}
			</HelperText>

			<TextInput
				label="Monto (Q) *"
				value={amount}
				onChangeText={(value) => handleFieldChange('amount', value)}
				style={styles.input}
				mode="outlined"
				keyboardType="numeric"
				error={hasError('amount')}
				placeholder="0.00"
			/>
			<HelperText type="error" visible={hasError('amount')}>
				{getFieldError('amount')}
			</HelperText>

			<Button
				mode="contained"
				onPress={handleCreateRequest}
				style={styles.button}
                loading={loadingCreateRequest}
                disabled={loadingCreateRequest || !isValid}
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
		fontSize: 24,
		fontWeight: 'bold',
	},
	input: {
		marginBottom: 5,
	},
	button: {
		marginTop: 30,
		paddingVertical: 8,
	},
});
