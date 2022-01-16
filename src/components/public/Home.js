import React from 'react';
import {ScrollView, View, Image} from 'react-native';
import style from '@style/public.home';

export default () => {
  return (
    <ScrollView style={style.container}>
      <View  style={style.imageWrapper}>
        <Image source={require('@image/os-shopping-image.png')} />
      </View>
      <View  style={style.imageWrapper}>
        <Image source={require('@image/os-shopping-image2.png')} />
      </View>
    </ScrollView>
  );
};
