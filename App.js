import React from 'react';
import {SafeAreaView} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import style from '@style/public.app';
import PrivateTab from '@navigation/private.tab';

// import Home from '@component/public/Home';
// import Login from '@component/public/Login';
// import Register from '@component/public/Register';

export default () => {
  return (
    <SafeAreaProvider>
    <PrivateTab />
    </SafeAreaProvider> 
  );
};
