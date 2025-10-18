import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Headline, Subheading, HelperText } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from '../../services/auth.service'; // Importa el servicio de login
import { useNavigation } from '@react-navigation/native';
import { useValidation } from '../../hooks/useValidation';
import { loginValidator } from '../../utils/validation';

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

  // Hook de validación
  const {
    errors,
    isValid,
    validateField,
    validateAll,
    clearErrors,
    hasError,
    getFieldError
  } = useValidation({
    validator: loginValidator,
    validateOnChange: true
  });

  const navigation = useNavigation<LoginScreenNavigationProp>();

  // Función para manejar cambios en los campos con validación
  const handleFieldChange = (field: string, value: string) => {
    switch (field) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
    }
    validateField(field, value);
  };
  const handleLogin = async () => {
    // Validación completa antes de enviar
    const formData = { email, password };
    const isFormValid = validateAll(formData);

    if (!isFormValid) {
      Alert.alert("Error", "Por favor, corrige los errores en el formulario.");
      return;
    }

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
        label="Email *"
        value={email}
        keyboardType='email-address'
        onChangeText={(value) => handleFieldChange('email', value)}
        style={styles.input}
        mode="outlined"
        error={hasError('email')}
        placeholder="usuario@ejemplo.com"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <HelperText type="error" visible={hasError('email')}>
        {getFieldError('email')}
      </HelperText>
      
      <TextInput
        label="Contraseña *"
        value={password}
        onChangeText={(value) => handleFieldChange('password', value)}
        style={styles.input}
        secureTextEntry
        mode="outlined"
        error={hasError('password')}
        placeholder="Mínimo 6 caracteres"
      />
      <HelperText type="error" visible={hasError('password')}>
        {getFieldError('password')}
      </HelperText>
      
      <Button 
        mode="contained" 
        onPress={handleLogin} 
        style={styles.button}
        loading={isLoading}
        disabled={isLoading || !isValid}
      >
        Iniciar sesión
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
    marginBottom: 10,
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 30,
    fontSize: 16,
    opacity: 0.7,
  },
  input: {
    marginBottom: 5,
  },
  button: {
    marginTop: 30,
    paddingVertical: 8,
  },
});

export default LoginScreen;
