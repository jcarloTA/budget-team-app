import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "react-native";
import TabOneScreen from "./homeScreen";
import CreateScreen from "./createRequestScreen";
import RequestDetailCreatedScreen from "./RequestDetailCreatedScreen";

const HomeStack = createNativeStackNavigator();

export default function HomeStackScreen() {
	return (
		<>
			<StatusBar barStyle="light-content" backgroundColor="#f4511e" translucent={false} />
			<HomeStack.Navigator
				initialRouteName="home"
				screenOptions={{
					headerShown: true,
					headerStyle: {
						backgroundColor: '#f4511e',
					},
					headerTintColor: '#fff',
					headerTitleStyle: {
						fontWeight: 'bold',
					},
				}}
			>
				<HomeStack.Screen name="home" component={TabOneScreen} />
				<HomeStack.Screen
					name="create"
					component={CreateScreen}
					options={{
						title: "Crear solicitud",
					}}
				/>
				<HomeStack.Screen
					name="requestCreatedDetail"
					component={RequestDetailCreatedScreen}
					options={{
						title: "Detalle de solicitud",
					}}
				/>
			</HomeStack.Navigator>
		</>
	);
}
