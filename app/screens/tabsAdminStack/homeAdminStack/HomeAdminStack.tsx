import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeAdminScreen from "./HomeAdminScreen";
import { BudgetsScreen } from "./BudgetsScreen";
import RequestToAproveScreen from "./RequestListScreen";
import RequestDetailScreen from "./RequestDetailScreen";


const HomeAdminStack = createNativeStackNavigator();

export default function HomeAdminStackScreen() {
    return (
        <HomeAdminStack.Navigator
            initialRouteName="homeAdmin"
            screenOptions={{
                headerShown: true,
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
                    title: "Solicitudes de presupuesto",
                }}
                component={RequestDetailScreen}
            />
            
        </HomeAdminStack.Navigator>
    );
}
