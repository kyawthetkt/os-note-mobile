import React, {useEffect, useState} from 'react';
import {View, Platform} from 'react-native';
import {TextInput, Button, RadioButton} from 'react-native-paper';
import {useNavigation, useRoute} from '@react-navigation/native';
import DatePicker from '@helper/datepicker.input';
import {formtDate} from '@helper/date';
import style from '@style/order.search';
// Later to remove
import {orderLabelGrp} from '@label';

export default () => {
  const navigation = useNavigation();
  const {params} = useRoute();

  const [startDate, setStartDate] = useState(params.startDate);
  const [endDate, setEndDate] = useState(params.endDate);
  const [showStartDatepicker, setShowStartDatepicker] = useState(false);
  const [showEndDatepicker, setShowEndDatepicker] = useState(false);
  const [selectedOrderStatus, setSelectedOrderStatus] = useState(params.status);
  const [startDateLabel, setStartDateLabel] = useState(null);
  const [endDateLabel, setEndDateLabel] = useState(null);
  const orderStatus = ['ORDERED', 'DELIVERED', 'COMPLETE'];

  useEffect(() => {
    setSelectedOrderStatus(() => selectedOrderStatus);
    setStartDateLabel(orderLabelGrp.switchOrderDateStatus(selectedOrderStatus));
    setEndDateLabel(orderLabelGrp.switchOrderDateStatus(selectedOrderStatus));
  }, [selectedOrderStatus]);

  return (
    <View style={style.containter}>
      <View style={style.statusWrapper}>
        <RadioButton.Group
          value={selectedOrderStatus}
          onValueChange={newValue => setSelectedOrderStatus(newValue)}>
          {orderStatus.map((code, index) => (
            <RadioButton.Item
              key={index}
              label={orderLabelGrp.switchOrderStatus(code)}
              value={code}
            />
          ))}
        </RadioButton.Group>
      </View>

      <View style={style.startDateWraper}>
        <TextInput
          mode="outlined"
          label={startDateLabel}
          placeholder={startDateLabel}
          value={formtDate(new Date(startDate), 'yyyy-MM-dd')}
          right={
            <TextInput.Icon
              name="calendar"
              onPress={() => setShowStartDatepicker(true)}
            />
          }
        />
        {showStartDatepicker && (
          <DatePicker
            name={formtDate(new Date(startDate), 'yyyy-MM-dd')}
            handelOnChange={(event, value) => {
              if (Platform.OS === 'android') {
                setShowStartDatepicker(false);
              }
              if (value) {
                value
                  ? setStartDate(formtDate(new Date(value), 'yyyy-MM-dd'))
                  : '';
              }
            }}
          />
        )}
      </View>
      <View style={style.endDateWrapper}>
        <TextInput
          mode="outlined"
          label={endDateLabel}
          placeholder={endDateLabel}
          value={formtDate(new Date(endDate), 'yyyy-MM-dd')}
          right={
            <TextInput.Icon
              name="calendar"
              onPress={() => setShowEndDatepicker(true)}
            />
          }
        />

        {showEndDatepicker && (
          <DatePicker
            name={formtDate(new Date(endDate), 'yyyy-MM-dd')}
            handelOnChange={(event, value) => {
              if (Platform.OS === 'android') {
                setShowStartDatepicker(false);
              }
              if (value) {
                value
                  ? setEndDate(formtDate(new Date(value), 'yyyy-MM-dd'))
                  : '';
              }
            }}
          />
        )}
      </View>

      <View style={style.searchButtonWrapper}>
        <Button
          style={style.searchButton}
          mode="contained"
          onPress={() => {
            navigation.navigate('OrderList', {
              ipp: params.ipp,
              status: selectedOrderStatus,
              endDate,
              startDate,
            });
          }}>
          {orderLabelGrp.searchLabel}
        </Button>
      </View>
    </View>
  );
};
