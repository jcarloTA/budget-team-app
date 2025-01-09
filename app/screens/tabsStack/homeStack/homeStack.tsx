import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabOneScreen from "./tabOne";
import CreateScreen from "./createRequestScreen";

const HomeStack = createNativeStackNavigator();

export default function HomeStackScreen() {
	return (
		<HomeStack.Navigator
			initialRouteName="home"
			screenOptions={{
				headerShown: true,
			}}
		>
			<HomeStack.Screen
				name="home"
			
				component={TabOneScreen}
			/>
			<HomeStack.Screen name="create" component={CreateScreen}
      	options={{
					title: "Crear solicitud",
				}} />
		</HomeStack.Navigator>
	);
}
