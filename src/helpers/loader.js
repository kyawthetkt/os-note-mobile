import React from 'react';
import {Text, View, ActivityIndicator} from 'react-native';
import style from '@style/loader';

export default ({msg}) => {
  return (
    <View style={style.wrapper}>
      <ActivityIndicator size="large" color={'red'} />
      <Text style={style.textWrapper}>{msg ? msg : 'Loading...'}</Text>
    </View>
  );
};
