import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import PrivateHomeScreen from '@component/private/Home';
import CombinedOrderScreen from '@navigation/combined.order';
import CombinedProfileScreen from '@navigation/combined.profile';

const Tab = createBottomTabNavigator();

const privateTab = {
  homeLabel: 'ပင်မစာမျက်နှာ',
  orderLabel: 'စာရင်းများ',
  profileLabel: 'မိမိအချက်အလက်',
};

export default () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName='Order'
        screenOptions={({route}) => ({
          tabBarIcon: ({focused}) => {
            const activeColor = focused ? '#000000' : '#999999';
            let iconName;
            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Order') {
              iconName = 'format-list-checks';
            } else if (route.name === 'Profile') {
              iconName = 'account';
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
          component={PrivateHomeScreen}
          options={{
            headerShown: false,
            title: privateTab.homeLabel,
          }}
        />
        <Tab.Screen
          name="Order"
          component={CombinedOrderScreen}
          options={{
            headerShown: false,
            title: privateTab.orderLabel,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={CombinedProfileScreen}
          options={{
            headerShown: false,
            title: privateTab.profileLabel,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
