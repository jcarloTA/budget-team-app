import { ScrollView, StyleSheet, View } from "react-native";
import {
	ActivityIndicator,
	MD2Colors,
	Title,
	List,
	Avatar,
	Button,
	IconButton,
} from "react-native-paper";
import { useTeam } from "../../../hooks/use.team";
import { useEffect } from "react";

import {} from "react-native-paper"; // Componentes de React Native Paper
import { NavigationProp, useNavigation } from "@react-navigation/native";
import FontAwesome from '@expo/vector-icons/FontAwesome';


type RootStackParamList = {
    budgetScreen: { teamId: number };
    // other routes can be added here
};
export default function HomeAdminScreen() {

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    
	const { getTeams, loadingTeams, teams } = useTeam();
	useEffect(() => {
		navigation.setOptions({
			headerShown: true,
			title: "Inicio",
			headerRight: () => (
				<>
					<Button onPress={() => getInitData()}>
						<FontAwesome size={16} name="refresh" />
					</Button>
				</>
			),
		});
	}, [navigation]);

	useEffect(() => {
		getInitData();
	}, []);

	const getInitData = () => {
		getTeams();
	};

	const onSelect = (id: number) => {
        navigation.navigate("budgetScreen", { teamId: id });
	};

	if (loadingTeams || !teams || teams.length === 0) {
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
			<Title style={styles.title}>Listado de equipos</Title>
			<View>
				{teams.map((team) => (
					<List.Item
						key={team.id}
						title={team.name}
						description={team.description}
						left={() => (
							<Avatar.Image size={50} source={{ uri: '' }} />
						)}
						right={() => (
							<View style={styles.actions}>
								<IconButton
									icon="eye"
									onPress={() => onSelect(team.id)}
									size={20}
									style={styles.iconButton}
								/>
							</View>
						)}
						onPress={() => onSelect(team.id)} // Acción al presionar el equipo
                        style={styles.listItem} // Aplicamos el estilo con borde y sombra

					/>
				))}
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	containerLoading: {
		flex: 1,
	},
	container: {
		flex: 1,
		padding: 20,
	},
	title: {
		textAlign: "center",
		marginBottom: 20,
	},
	button: {
		marginTop: 20,
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
        borderColor: '#ccc', // Color del borde
        borderRadius: 8, // Bordes redondeados
        marginBottom: 10, // Separación entre los ítems
        padding: 10, // Espaciado interno
        backgroundColor: '#fff', // Fondo blanco para los items
        shadowColor: '#000', // Color de la sombra
        shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra
        shadowOpacity: 0.1, // Opacidad de la sombra
        shadowRadius: 6, // Radio de la sombra
        elevation: 3, // Elevación para Android
      },
});
