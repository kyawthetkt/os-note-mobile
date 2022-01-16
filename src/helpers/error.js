import React from 'react';
import {Text, View} from 'react-native';
import style from '@style/error';

export default ({msg}) => {
  return (
    <View style={style.wrapper}>
      <Text style={style.textWrapper}>{msg ? msg : 'Try Agin.'}</Text>
    </View>
  );
};
