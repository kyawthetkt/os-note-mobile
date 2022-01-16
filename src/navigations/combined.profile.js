import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigationLabelGrp} from '@label';
import ProfileScreen from '@component/private/Profile';
import UpdateProfileScreen from '@component/private/UpdateProfile';
import UpdatePasswordScreen from '@component/private/UpdatePassword';

const Stack = createNativeStackNavigator();

export default () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="ProfileScreen"
        component={ProfileScreen}
      />
      <Stack.Screen
        options={{
          title: navigationLabelGrp.changeProfileLabel,
        }}
        name="UpdateProfileScreen"
        component={UpdateProfileScreen}
      />
      <Stack.Screen
        options={{
          title: navigationLabelGrp.changePasswordLabel,
        }}
        name="UpdatePasswordScreen"
        component={UpdatePasswordScreen}
      />
    </Stack.Navigator>
  );
};
