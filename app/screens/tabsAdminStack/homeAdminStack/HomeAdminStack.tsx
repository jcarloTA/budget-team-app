import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "react-native";
import HomeAdminScreen from "./HomeAdminScreen";
import { BudgetsScreen } from "./BudgetsScreen";
import RequestToAproveScreen from "./RequestListScreen";
import RequestDetailScreen from "./RequestDetailScreen";


const HomeAdminStack = createNativeStackNavigator();

export default function HomeAdminStackScreen() {
    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#f4511e" translucent={false} />
            <HomeAdminStack.Navigator
                initialRouteName="homeAdmin"
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
                <HomeAdminStack.Screen
                    name="homeAdmin"
                    options={{
                        title: "Admin",
                    }}
                    component={HomeAdminScreen}
                />
                 <HomeAdminStack.Screen
                    name="budgetScreen"
                    options={{
                        title: "Presupuestos",
                    }}
                    component={BudgetsScreen}

                />
                 <HomeAdminStack.Screen
                    name="requestListToAprove"
                    options={{
                        title: "Solicitudes de presupuesto",
                    }}
                    component={RequestToAproveScreen}
                />
                 <HomeAdminStack.Screen
                    name="requestToAprove"
                    options={{
                        title: "Detalle de solicitud",
                    }}
                    component={RequestDetailScreen}
                />
                
            </HomeAdminStack.Navigator>
        </>
    );
}
