import React from 'react';
import {ScrollView, View, Text} from 'react-native';
import style from '@style/private.home';

export default () => {
  return (
    <ScrollView style={style.container}>
      <View style={{backgroundColor: "tan", flex: 1}}>
        <Text>Private Page</Text>
      </View>
    </ScrollView>
  );
};
