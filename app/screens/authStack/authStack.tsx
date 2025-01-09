import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './login';

const AuthStack = createNativeStackNavigator();


export default function AuthStackScreen() {

  return (
    <AuthStack.Navigator
      initialRouteName='login'
        screenOptions={{
        headerShown: false,
      }}
    >
        <AuthStack.Screen name='login' component={LoginScreen} />
    </AuthStack.Navigator>
  );
}
