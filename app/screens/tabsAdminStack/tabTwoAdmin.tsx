import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Alert, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Text, 
  Card, 
  Button, 
  Avatar, 
  Divider, 
  List, 
  ActivityIndicator 
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { getDataToken, removeToken } from '../../utils/storage';
import { LoginResponse } from '../../interfaces/auth.interface';

type RootStackParamList = {
  Auth: undefined;
  Tabs: undefined;
  TabsAdmin: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

export default function TabTwoAdminScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [userData, setUserData] = useState<LoginResponse['user'] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const tokenData = await getDataToken();
      if (tokenData?.user) {
        setUserData(tokenData.user);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      "Cerrar Sesión",
      "¿Estás seguro de que quieres cerrar sesión?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Cerrar Sesión",
          style: "destructive",
          onPress: async () => {
            try {
              await removeToken();
              navigation.reset({
                index: 0,
                routes: [{ name: 'Auth' }],
              });
            } catch (error) {
              console.error('Error during logout:', error);
              Alert.alert("Error", "Hubo un problema al cerrar sesión");
            }
          }
        }
      ]
    );
  };

  const getRoleDisplayName = (role: string) => {
    const roleMap: { [key: string]: string } = {
      'admin': 'Administrador',
      'user': 'Usuario',
      'collaborator': 'Colaborador',
      'manager': 'Gerente'
    };
    return roleMap[role] || role;
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Cargando perfil...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#f4511e" translucent={false} />
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Panel de Administración</Text>
        </View>

        <Card style={styles.profileCard}>
          <Card.Content style={styles.profileContent}>
            <View style={styles.avatarContainer}>
              <Avatar.Text 
                size={80} 
                label={userData?.name?.charAt(0).toUpperCase() || 'A'} 
                style={styles.avatar}
              />
            </View>
            
            <Text style={styles.userName}>{userData?.name || 'Administrador'}</Text>
            <Text style={styles.userEmail}>{userData?.email || 'admin@ejemplo.com'}</Text>
            
            <View style={styles.roleContainer}>
              <Text style={styles.roleLabel}>Rol:</Text>
              <Text style={styles.roleValue}>
                {getRoleDisplayName(userData?.role || 'admin')}
              </Text>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.infoCard}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Herramientas de Administración</Text>
            
            <List.Item
              title="Gestión de Presupuestos"
              description="Administrar presupuestos del equipo"
              left={(props) => <List.Icon {...props} icon="cash" />}
            />
            
            <Divider />
            
            <List.Item
              title="Gestión de Usuarios"
              description="Administrar usuarios y permisos"
              left={(props) => <List.Icon {...props} icon="account-group" />}
            />
            
            <Divider />
            
            <List.Item
              title="Reportes y Estadísticas"
              description="Ver reportes del sistema"
              left={(props) => <List.Icon {...props} icon="chart-line" />}
            />
          </Card.Content>
        </Card>

        <Card style={styles.actionsCard}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Acciones</Text>
            
            <Button
              mode="outlined"
              onPress={loadUserData}
              style={styles.actionButton}
              icon="refresh"
            >
              Actualizar Información
            </Button>
            
            <Button
              mode="contained"
              onPress={handleLogout}
              style={[styles.actionButton, styles.logoutButton]}
              icon="logout"
              buttonColor="#ff3b30"
            >
              Cerrar Sesión
            </Button>
          </Card.Content>
        </Card>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Budget Team App - Panel Admin v1.0
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4511e',
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  header: {
    padding: 20,
    paddingTop: 20,
    paddingBottom: 30,
    backgroundColor: '#f4511e',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  profileCard: {
    margin: 16,
    marginTop: -20,
    elevation: 4,
    borderRadius: 12,
  },
  profileContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    backgroundColor: '#f4511e',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  roleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  roleLabel: {
    fontSize: 14,
    color: '#1976d2',
    marginRight: 4,
  },
  roleValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1976d2',
  },
  infoCard: {
    margin: 16,
    marginTop: 0,
    elevation: 2,
    borderRadius: 12,
  },
  actionsCard: {
    margin: 16,
    marginTop: 0,
    elevation: 2,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  actionButton: {
    marginVertical: 8,
    borderRadius: 8,
  },
  logoutButton: {
    marginTop: 16,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#999',
  },
});