import React, {useState} from 'react';
import {ScrollView, View, Text} from 'react-native';
import {List, FAB, Portal, Provider} from 'react-native-paper';
import {formtDate} from '@helper/date';
import {useNavigation} from '@react-navigation/native';
import style from '@style/order.list';

const OrderItem = ({item, onPress}) => {

  const orderItemLabel = {
    orderDate: 'Order Dates',
    totalAmount: 'Total Amounts',
  };

  return (
    <List.Item
      onPress={() => onPress(item.id)}
      title={`${item.customer_name} - ${item.customer_phone}`}
      description={() => (
        <View>
          <Text>{orderItemLabel.orderDate}: {formtDate(item.ordered_at)}</Text>
          <Text>
          {orderItemLabel.totalAmount}:{' '}
            {item.orderDetail.reduce(
              (sum, obj) => sum + obj.sub_total_price,
              0,
            )}
          </Text>
        </View>
      )}
      left={props => <List.Icon {...props} icon="square" />}
    />
  );
};

export default () => {
  const [state, setState] = useState({open: false});
  const onStateChange = ({open}) => setState({open});
  const {open} = state;

  const navigation = useNavigation();
  const data = [
    {
      id: 2,
      // shop_name: 'Laura',
      // shop_description: 'No 32',
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
    },
  ];

  const orderListLabel = {
    createNewOrder: 'Create New Order', 
  };

  const viewOrder = orderId => {
    navigation.navigate('OrderDetail', {id: orderId});
  };

  return (
    <Provider>
      <Portal>
        <ScrollView style={style.container}>
          {data.map(item => (
            <OrderItem key={item.id} item={item} onPress={viewOrder} />
          ))}
        </ScrollView>

        <FAB.Group
          open={open}
          style={style.fabDesign}
          icon={open ? 'close' : 'plus'}
          actions={[
            {
              icon: 'card-plus',
              label: `${orderListLabel.createNewOrder}`,
              onPress: () => {
                navigation.navigate('OrderCreate');
              },
            },
          ]}
          onStateChange={onStateChange}
        />
      </Portal>
    </Provider>
  );
};
