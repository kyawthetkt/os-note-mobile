import React, {useEffect} from 'react';
import {ScrollView, View, Text} from 'react-native';
import {format} from 'date-fns';
import {useNavigation} from '@react-navigation/native';
import style from '@style/order.detail';

export default ({id}) => {
  const title = 'Hello' || 'Fetching...';
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title,
    });
  }, [title, navigation]);

  const order = {
    id: 2,
    shop_name: 'Laura',
    shop_description: 'No 32',
    customer_name: 'U Kyaw Thet',
    customer_phone: '09565666',
    customer_address: 'No 3434',
    ordered_at: '2019-12-12T00:00:00.000Z',
    delivered_at: '2019-12-12T00:00:00.000Z',
    complete_at: '2019-12-12T00:00:00.000Z',
    delivery_type: 'BY_COURIER',
    delivery_fee: null,
    remark: 'sssssssssssssssss',
    status: 'ORDERED',
    files:
      'images\\110e06582b8b386f863a1958b1b83758d.png,images\\e7e6e88278a81cfd6a94d7d392ca8e1c.jpg',
    voucher: null,
    orderDetail: [
      {
        id: 48,
        name: 'Zara',
        size: 'red',
        color: 'Red',
        quantity: 4,
        sub_total_price: 40000,
      },
    ],
  };

  return (
    <ScrollView style={style.container}>
      <Text>heel - {id}</Text>
    </ScrollView>
  );
};
