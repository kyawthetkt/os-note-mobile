import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {isValid} from 'date-fns';

export default ({name, handelOnChange}) => {
  return (
    <DateTimePicker
      testID="dateTimePicker"
      value={isValid(name) ? new Date(name) : new Date()}
      mode={'date'}
      is24Hour={true}
      display="calendar"
      onChange={handelOnChange}
    />
  );
};
