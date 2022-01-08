import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ProfileScreen from '@component/private/Profile';
import UpdateProfileScreen from '@component/private/UpdateProfile';
import UpdatePasswordScreen from '@component/private/UpdatePassword';

const Stack = createNativeStackNavigator();

const profileTab = {
  changePasswordLabel: 'ပင်မစာမျက်နှာ',
  changeProfileLabel: 'စာရင်းများ',
};

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
          title: profileTab.changeProfileLabel,
        }}
        name="UpdateProfileScreen"
        component={UpdateProfileScreen}
      />
      <Stack.Screen
        options={{
          title: profileTab.changePasswordLabel,
        }}
        name="UpdatePasswordScreen"
        component={UpdatePasswordScreen}
      />
    </Stack.Navigator>
  );
};
