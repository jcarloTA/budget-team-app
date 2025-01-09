import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
	DarkTheme,
	NavigationContainer,
	ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import "react-native-reanimated";
import {
	MD3LightTheme as DefaultTheme,
	PaperProvider,
} from "react-native-paper";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStackScreen from "./app/screens/authStack/authStack";
import TabsStack from "./app/screens/tabsStack/tabsStack";
import TabsAdminStack from "./app/screens/tabsAdminStack/tabsAdminStack";

export const CustomTheme = {
	...DefaultTheme,
	myOwnProperty: true,
	colors: {
		...DefaultTheme.colors,
		primary: "#f4511e",
		secondary: "Abra",
		background: "rgb(242, 242, 242)",
		aprobed: "#76cc00",
		rejected: "#ff3b30",
		pending: "#ffb500",
		card: "rgb(255, 255, 255)",
		text: "rgb(55 65 81/var(--tw-text-opacity))",
		border: "rgb(216, 216, 216)",
		notification: "rgb(255, 59, 48)",
	},
};

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<PaperProvider theme={CustomTheme}>
			<NavigationContainer>
				<Stack.Navigator screenOptions={{ headerShown: false }}>
					<Stack.Screen name="Auth" component={AuthStackScreen} />
					<Stack.Screen
						name="Tabs"
						component={TabsStack}
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="TabsAdmin"
						component={TabsAdminStack}
						options={{
							headerShown: false,
						}}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</PaperProvider>
	);
}
