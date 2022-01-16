import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigationLabelGrp} from '@label';
import ListScreen from '@component/order/List';
import DetailScreen from '@component/order/Detail';
import EditScreen from '@component/order/Edit';
import CreateScreen from '@component/order/Create';
import SearchFormScreen from '@component/order/SearchForm';

const Stack = createNativeStackNavigator();

export default () => {
  return (
    <Stack.Navigator initialRouteName="OrderList">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="OrderList"
        component={ListScreen}
      />
      <Stack.Screen
        options={{
          title: navigationLabelGrp.searchOrderLabel,
        }}
        name="SearchForm"
        component={SearchFormScreen}
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
          title: navigationLabelGrp.orderCreateLabel,
        }}
        name="OrderCreate"
        component={CreateScreen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          title: navigationLabelGrp.orderEditLabel,
        }}
        name="OrderEdit"
        component={EditScreen}
      />
    </Stack.Navigator>
  );
};
