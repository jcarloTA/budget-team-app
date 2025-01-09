import { ScrollView, StyleSheet, View } from "react-native";
import { ActivityIndicator, MD2Colors, Text } from "react-native-paper";
import { useBudget } from "../../../hooks/use.budget";
import { useEffect } from "react";
import { List, Avatar, IconButton } from "react-native-paper"; // Importamos componentes de React Native Paper
import { NavigationProp, useNavigation } from "@react-navigation/native";

type CreateREquestProps = {
	route: any;
};
type RootStackParamList = {
    requestListToAprove: { budgetId: number };
    // other routes can be added here
};
export const BudgetsScreen = ({ route }: CreateREquestProps) => {
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();

	const { budgetsByTeam, loadingBudgetByTeam, getBudgetsByTeamId } =
		useBudget();
	const { teamId } = route.params;

	useEffect(() => {
		loadBudgets();
	}, [teamId]);

	const loadBudgets = () => {
		console.log("teamId", teamId);
		if (teamId) {
			getBudgetsByTeamId(teamId);
		}
	};

	const onSelect = (id: number) => {
		console.log("onSelect", id);
		// Navegar a la pantalla de detalle del presupuesto
		navigation.navigate("requestListToAprove", { budgetId: id });
	};

	if (loadingBudgetByTeam || !budgetsByTeam || budgetsByTeam.length === 0) {
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
			{budgetsByTeam.map((budget) => (
				<List.Item
					key={budget.id}
					title={`Presupuesto No. ${budget.id}`} // Mostrar el nombre del presupuesto y el nombre del equipo
					description={`${budget.allocatedAmount}`} // Mostrar el monto con formato de moneda
					left={() => <Avatar.Text label={""} size={50} />}
					right={() => (
						<View style={styles.actions}>
							<IconButton
								icon="eye"
								onPress={() => onSelect(budget.id)} // Acción de ver detalles
								size={20}
								style={styles.iconButton}
							/>
						</View>
					)}
					onPress={() => onSelect(budget.id)} // Acción al presionar el ítem
					style={styles.listItem}
				/>
			))}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	containerLoading: {
		flex: 1,
	},
	container: {
		flex: 1,
		padding: 10,
	},
	actions: {
		flexDirection: "row",
		alignItems: "center",
	},
	iconButton: {
		marginLeft: 10,
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
});
