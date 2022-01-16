import React from 'react';
import {Text} from 'react-native';
import style from '@style/error';

export const FormInputError = ({msg}) =>
  msg ? <Text style={style.textWrapper}>{msg}</Text> : null;
