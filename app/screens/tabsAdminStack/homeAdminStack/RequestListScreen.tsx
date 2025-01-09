import { ScrollView, StyleSheet, View } from "react-native";
import { ActivityIndicator, MD2Colors, Title, Text } from "react-native-paper";
import { useRequest } from "../../../hooks/use.requests";
import { useCallback, useEffect } from "react";
import { List, Avatar, IconButton, Button } from "react-native-paper"; // Componentes de React Native Paper
import {
	NavigationProp,
	useFocusEffect,
	useNavigation,
} from "@react-navigation/native";
import { RequestInterface } from "../../../interfaces/request.interface";

type CreateREquestProps = {
	route: any;
};
type RootStackParamList = {
	requestToAprove: RequestInterface;
	// other routes can be added here
};
export default function RequestListScreen({ route }: CreateREquestProps) {
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();

	const { requestsByBudget, loadingRequestByBudget, getRequestsByBudgetId } =
		useRequest();

	const { budgetId } = route.params;

	useFocusEffect(
		useCallback(() => {
			loadRequests();
			return () => {
	
			};
		}, [])
	);

	const loadRequests = () => {
		console.log("budgetId", budgetId);
		if (budgetId) {
			getRequestsByBudgetId(budgetId);
		}
	};

	const onSelect = (request: RequestInterface) => {
		console.log("onSelect", request);
		// Navegar a la pantalla de detalle del presupuesto
		navigation.navigate("requestToAprove", request);
	};

	if (
		loadingRequestByBudget ||
		!requestsByBudget ||
		requestsByBudget.length === 0
	) {
		return (
			<ScrollView style={styles.containerLoading}>
				<ActivityIndicator
					animating={true}
					color={MD2Colors.red800}
					size={28}
				/>
			</ScrollView>
		);
	}

	return (
		<ScrollView style={styles.container}>
			<Title style={styles.title}>Solicitudes de presupuesto</Title>
			<View>
				{requestsByBudget.map((request) => (
					<List.Item
						key={request.id}
						title={request.reason}
						description={`${request.description} - Q${request.requestedAmount}`} // Mostrar monto con formato de moneda
						left={() => (
							<View
								style={{
									...styles.circle,
									backgroundColor:
										request.status === "approved"
											? "green"
											: request.status === "rejected"
											? "red"
											: "yellow",
								}}
							>
								{/* <Text>Fyie</Text> */}
							</View>
						)}
						right={() => (
							<View style={styles.actions}>
								<IconButton
									icon="eye"
									onPress={() => onSelect(request)} // Acción de ver detalles
									size={20}
									style={styles.iconButton}
								/>
							</View>
						)}
						style={styles.listItem}
					/>
				))}
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
	},
	title: {
		textAlign: "center",
		marginBottom: 16,
	},
	containerLoading: {
		flex: 1,
	},
	actions: {
		flexDirection: "row",
		alignItems: "center",
	},
	iconButton: {
		marginRight: 10,
	},
	approveButton: {
		marginLeft: 10,
		paddingHorizontal: 10,
	},
	listItem: {
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
		marginBottom: 10,
		padding: 10,
		backgroundColor: "#fff",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 6,
		elevation: 3,
	},
	circle: {
		width: 40,
		height: 40,
		borderRadius: 40 / 2,
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 1,
	},
});
