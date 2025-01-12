import { StyleSheet, View, ScrollView } from "react-native";

import { useEffect } from "react";
import { useBudget } from "../../../hooks/use.budget";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { Avatar, Button, Card, Text } from "react-native-paper";
import { formatCurrency } from "../../../utils/formater";
import { Divider } from "react-native-paper";
import { useRequest } from "../../../hooks/use.requests";
import { useTheme } from "react-native-paper";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { TabBarIcon } from "../tabsStack";
import React from "react";
import Colors from "../../../constants/Colors";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RequestInterface } from "../../../interfaces/request.interface";

type RootStackParamList = {
	create: { budgetId: number };
	requestCreatedDetail: RequestInterface;
	// other routes can be added here
};
export default function TabOneScreen() {
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();
	const { getBudgets, loadingBudget, budgets } = useBudget();
	const { getRequests, requests, loadingRequest } = useRequest();
	const theme: any = useTheme();

	useEffect(() => {
		navigation.setOptions({
			headerShown: true,
			title: "Inicio",
			headerRight: () => (
				<>
					<Button
						onPress={() =>
							navigation.navigate("create", {
								budgetId: budgets[0]?.id,
							})
						}
					>
						<FontAwesome size={16} name="plus" />
					</Button>
					<Button onPress={() => getData()}>
						<FontAwesome size={16} name="refresh" />
					</Button>
				</>
			),
		});
	}, [navigation]);

	useEffect(() => {
		getBudgets();
		getRequests();
	}, []);

	const getData = () => {
		getBudgets();
		getRequests();
	};

	const seeDetail = (request: RequestInterface) => {
		navigation.navigate("requestCreatedDetail", request);
	}

	if (loadingBudget || loadingRequest || !budgets || budgets.length === 0) {
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
			<View>
				<Card style={styles.cardBudget}>
					<Card.Title
						title={`Equipo: ${budgets[0].team.name} `}
						titleStyle={styles.textLight}
					/>
					<Card.Content>
						<Text variant="titleLarge" style={styles.textLight}>
							Presupuesto
						</Text>
						<Text variant="bodyMedium" style={styles.textLight}>
							{formatCurrency(budgets[0].allocatedAmount)}
						</Text>
					</Card.Content>
				</Card>
			</View>
			<Divider />
			<View style={{ padding: 10 }}>
				<Text style={styles.textSubtitle}>Lista de solicitudes</Text>
				{requests.map((request, index) => (
					<Card key={index} style={styles.cardRequest}>
						<Card.Title
							title={`Solicitud No: ${request.id}`}
							titleStyle={styles.titleCardRequest}
						/>
						<Card.Content
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								width: "100%",
							}}
						>
							<View>
								<Text variant="titleLarge" style={{ ...styles.textDark }}>
									{formatCurrency(request.requestedAmount)}
								</Text>
								<Text variant="bodyMedium" style={styles.textSubLight}>
									Monto
								</Text>
							</View>
							<View>
								<Text
									variant="titleLarge"
									style={{
										...styles.textDark,
										color: {
											pending: theme.colors.primary,
											approved: "green",
											rejected: "red",
										}[request.status],
									}}
								>
									{request.status === "pending"
										? "Pendiente"
										: request.status === "approved"
										? "Aprobado"
										: "Rechazado"}
								</Text>
								<Text variant="bodyMedium" style={styles.textSubLight}>
									Estado
								</Text>
							</View>
						</Card.Content>
						<Card.Actions>
							<Button onPress={() => seeDetail(request)}>Ver</Button>
						</Card.Actions>
					</Card>
				))}
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	containerLoading: {
		flex: 1,
		minHeight: "100%",
	},
	container: {
		flex: 1,
		minHeight: "100%",
	},
	cardBudget: {
		margin: 10,
		backgroundColor: Colors.light.primary,
	},
	textLight: {
		color: "#fff",
	},
	textDark: {
		color: "#000",
	},
	textSubLight: {
		color: "rgb(55, 65, 81)",
	},
	titleCardRequest: {
		fontSize: 20,
		color: "#000",
		marginTop: 10,
	},
	textSubtitle: {
		fontSize: 20,
	},
	cardRequest: {
		margin: 10,
		backgroundColor: Colors.light.background,
	},
});
