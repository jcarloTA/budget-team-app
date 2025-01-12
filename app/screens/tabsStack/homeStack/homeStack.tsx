import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabOneScreen from "./homeScreen";
import CreateScreen from "./createRequestScreen";
import RequestDetailCreatedScreen from "./RequestDetailCreatedScreen";

const HomeStack = createNativeStackNavigator();

export default function HomeStackScreen() {
	return (
		<HomeStack.Navigator
			initialRouteName="home"
			screenOptions={{
				headerShown: true,
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
	);
}
