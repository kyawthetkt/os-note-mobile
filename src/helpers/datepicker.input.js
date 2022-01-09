import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

export default ({name, handelOnChange}) => {
  return (
    <DateTimePicker
      testID="dateTimePicker"
      value={name ? new Date(name) : new Date()}
      mode={'date'}
      is24Hour={true}
      display="calendar"
      onChange={handelOnChange}
    />
  );
};
