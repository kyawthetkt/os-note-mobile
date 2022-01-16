import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from '@component/public/Home';
import LoginScreen from '@component/public/Login';
import RegisterScreen from '@component/public/Register';
import {navigationLabelGrp} from '@label';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const LoginRegister = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Login"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Register"
        component={RegisterScreen}
      />
    </Stack.Navigator>
  );
};

export default () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          const activeColor = focused ? '#000000' : '#999999';
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'LoginRegister') {
            iconName = 'login';
          } else {
            iconName = 'cloud-question';
          }
          return (
            <MaterialCommunityIcons
              name={iconName}
              color={activeColor}
              size={23}
            />
          );
        },
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#999999',
        tabBarStyle: {
          position: 'absolute',
          borderTopColor: '#C0C0C0',
          backgroundColor: '#FFFFFF',
          paddingBottom: 2,
          paddingTop: 2,
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          title: navigationLabelGrp.homeLabel,
        }}
      />
      <Tab.Screen
        name="LoginRegister"
        component={LoginRegister}
        options={{
          headerShown: false,
          title: navigationLabelGrp.loginRegisterLabel,
        }}
      />
    </Tab.Navigator>
  );
};
