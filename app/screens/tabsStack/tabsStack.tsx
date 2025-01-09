import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabOneScreen from './homeStack/tabOne';
import TabTwoScreen from './two';
import HomeStackScreen from './homeStack/homeStack';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
export function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

const Tab = createBottomTabNavigator();

export default function TabsStack() {

  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeStackScreen}
       options={{
        headerShown: false,
        tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
      }}
       />
      <Tab.Screen name="Settings" component={TabTwoScreen} />
    </Tab.Navigator>
  );
}
