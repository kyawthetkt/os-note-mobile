import React from 'react';
import {ScrollView, View, Text} from 'react-native';
import style from '@style/public.home';

export default () => {
  return (
    <ScrollView style={style.container}>
      <View>
        <Text>Home Page</Text>
      </View>
    </ScrollView>
  );
};
