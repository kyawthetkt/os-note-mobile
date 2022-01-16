import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {navigationLabelGrp} from '@label';
import PrivateHomeScreen from '@component/private/Home';
import CombinedOrderScreen from '@navigation/combined.order';
import CombinedProfileScreen from '@navigation/combined.profile';

const Tab = createBottomTabNavigator();

export default () => {
  return (
    <Tab.Navigator
      initialRouteName="PrivateHome"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          const activeColor = focused ? '#000000' : '#999999';
          let iconName;
          if (route.name === 'PrivateHome') {
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
        name="PrivateHome"
        component={PrivateHomeScreen}
        options={{
          headerShown: false,
          title: navigationLabelGrp.homeLabel,
        }}
      />
      <Tab.Screen
        name="Order"
        component={CombinedOrderScreen}
        options={{
          headerShown: false,
          title: navigationLabelGrp.orderLabel,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={CombinedProfileScreen}
        options={{
          headerShown: false,
          title: navigationLabelGrp.profileLabel,
        }}
      />
    </Tab.Navigator>
  );
};
