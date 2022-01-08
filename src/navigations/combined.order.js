import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ListScreen from '@component/order/List';
import DetailScreen from '@component/order/Detail';
import EditScreen from '@component/order/Edit';
import CreateScreen from '@component/order/Create';

const Stack = createNativeStackNavigator();

const profileStack = {
  orderCreateLabel: 'creat order',
  orderEditLabel: 'edi order',
};

export default () => {
  return (
    <Stack.Navigator initialRouteName="OrderCreate">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="OrderList"
        component={ListScreen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
        }}
        name="OrderDetail"
        component={DetailScreen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          title: profileStack.orderCreateLabel,
        }}
        name="OrderCreate"
        component={CreateScreen}
      />
       <Stack.Screen
        options={{
          headerShown: true,
          title: profileStack.orderEditLabel,
        }}
        name="OrderEdit"
        component={EditScreen}
      />
    </Stack.Navigator>
  );
};
