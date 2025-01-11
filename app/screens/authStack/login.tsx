import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Headline, Subheading } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from '../../services/auth.service'; // Importa el servicio de login
import { useNavigation } from '@react-navigation/native';

import { StackNavigationProp } from '@react-navigation/stack';

type LoginScreenNavigationProp = StackNavigationProp<{
  Login: undefined;
  Tabs: undefined;
  TabsAdmin: undefined;
}, 'Login'>;

type LoginScreenProps = {
  navigation: LoginScreenNavigationProp;
};
const LoginScreen: React.FC<LoginScreenProps> = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);


  
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const dataLogin = await login(email, password); // Llamada al servicio de login
      Alert.alert('Login Successful', 'Welcome back!');

      if(dataLogin.user.role === 'admin'){
        navigation.navigate('TabsAdmin');
      } else {
        navigation.navigate('Tabs');
      }
      // navigation.navigate('Tabs');
    } catch (error:any) {
      console.error('Login failed:', error);
      Alert.alert('Login Failed', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Headline style={styles.title}>Iniciar sesion</Headline>
      <Subheading style={styles.subtitle}>Ingresa tus credenciales</Subheading>
      
      <TextInput
        label="Email"
        value={email}
        keyboardType='email-address'
        onChangeText={setEmail}
        style={styles.input}
        mode="outlined"
      />
      
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
        mode="outlined"
      />
      
      <Button mode="contained" onPress={handleLogin} style={styles.button}
              loading={isLoading}
              disabled={isLoading}>
        Iniciar sesion
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
  },
});

export default LoginScreen;
