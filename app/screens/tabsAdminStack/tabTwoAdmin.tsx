import {  ScrollView, StyleSheet, View } from "react-native";
import { Button, Title } from "react-native-paper";



export default function TabTwoAdminScreen() {
    return (
        <ScrollView style={styles.container}>
            <Title style={styles.title}>Admin</Title>
            <View>
                <Button
                    mode="contained"
                    style={styles.button}
                >
                    Presupuestos
                </Button>
                <Button
                    mode="contained"
                    style={styles.button}
                >
                    Usuarios
                </Button>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
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
});