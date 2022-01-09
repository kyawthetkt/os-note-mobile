import React from 'react';
import {Text} from 'react-native';

export const FormInputError = ({msg}) =>
  msg ? <Text style={{color: 'red'}}>{msg}</Text> : null;
