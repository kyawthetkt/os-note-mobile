import React, {useEffect, useState} from 'react';
import {ScrollView, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FAB, Portal, Provider, Paragraph, List} from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import {formtDate} from '@helper/date';

import style from '@style/order.detail';
const SubOrderItem = ({item}) => {
  return (
    <List.Item
      title={`${item.name} - (${item.size ? item.size : 'NA '} - ${
        item.color ? item.color : 'NA'
      })`}
      description={() => (
        <View>
          <Text>Quantity: {item.quantity}</Text>
          <Text>Sub Total Amount: {item.sub_total_price}</Text>
        </View>
      )}
      left={props => <List.Icon {...props} icon="square" />}
    />
  );
};

export default ({id}) => {
  const [state, setState] = useState({open: false});
  const onStateChange = ({open}) => setState({open});
  const {open} = state;

  const navigation = useNavigation();

  const data = {
    id: 2,
    shop_name: 'Laura',
    shop_description: 'No 32',

    customer_name: 'U Kyaw Thet',
    customer_phone: '09565666',
    customer_address: 'No 3434',

    status: 'ORDERED',
    ordered_at: '2019-12-12T00:00:00.000Z',
    delivered_at: '2019-12-12T00:00:00.000Z',
    complete_at: '2019-12-12T00:00:00.000Z',

    delivery_type: 'Delivered By',
    delivery_fee: 'Delivery Fee',

    remark: 'sssssssssssssssss',
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
      {
        id: 49,
        name: 'Primark',
        size: 'red',
        color: 'Red',
        quantity: 4,
        sub_total_price: 40000,
      },
    ],
  };

  const orderDetailLabel = {
    shopName: 'Shop Name',
    shopDescription: 'Shop Description ',
    customerName: 'Customer Name ',
    customerPhone: 'Customer Phone ',
    customerAddress: 'Customer Address ',
    orderedDate: 'Ordered Date ',
    deliveredDate: 'Delivered Date ',
    completeDate: 'Complete Date ',
    deliveryType: 'Delivered By ',
    deliveryFee: 'Delivery Fee',
    remark: 'Remak',
    files: 'Attched Files',
    voucher: 'Voucher',

    editOrderLabel: 'Edit Order',
  };

  useEffect(() => {
    navigation.setOptions({
      title: data.customer_name || 'Loading...',
    });
  }, [data.customer_name, navigation]);

  return (
    <Provider>
      <Portal>
        <ScrollView style={style.container}>
          <View style={[style.itemsWrapper]}>
            <View style={style.itemWrapper}>
              <Text style={style.labelIndex}>
                {orderDetailLabel.shopName}:
                <Text style={style.labelValue}>{data.shop_name}</Text>
              </Text>
              <Text style={style.labelIndex}>
                {orderDetailLabel.shopDescription}:
                <Text style={style.labelValue}>{data.shop_description}</Text>
              </Text>
            </View>

            <View style={style.itemWrapper}>
              <Text style={style.labelIndex}>
                {orderDetailLabel.customerPhone}:
                <Text style={style.labelValue}>{data.customer_phone}</Text>
              </Text>
              <Text style={style.labelIndex}>
                {orderDetailLabel.customerAddress}:
                <Text style={style.labelValue}>{data.customer_address}</Text>
              </Text>
            </View>

            <View style={style.itemWrapper}>
              <Text style={style.labelIndex}>
                {orderDetailLabel.orderedDate}:
                <Text style={style.labelValue}>
                  {formtDate(data.ordered_at)}
                </Text>
              </Text>
              <Text style={style.labelIndex}>
                {orderDetailLabel.deliveredDate}:
                <Text style={style.labelValue}>
                  {formtDate(data.delivered_at)}
                </Text>
              </Text>
              <Text style={style.labelIndex}>
                {orderDetailLabel.completeDate}:
                <Text style={style.labelValue}>
                  {formtDate(data.complete_at)}
                </Text>
              </Text>
            </View>

            <View style={style.itemWrapper}>
              <Text style={style.labelIndex}>
                {orderDetailLabel.deliveryType}:
                <Text style={style.labelValue}>{data.delivery_type}</Text>
              </Text>
              <Text style={style.labelIndex}>
                {orderDetailLabel.deliveryFee}:
                <Text style={style.labelValue}>{data.delivery_fee}</Text>
              </Text>
              <Text style={style.labelIndex}>
                {orderDetailLabel.remark}: <Paragraph>{data.remark}</Paragraph>
              </Text>
            </View>
            <View style={style.itemWrapper}>
              <Text style={style.labelValue}>{orderDetailLabel.files}</Text>
              {data.orderDetail.map(item => (
                <SubOrderItem key={item.id} item={item} />
              ))}
            </View>

            <View style={style.itemWrapper}>
              <FastImage
                style={{
                  width: "100%",
                  height: 230,
                }}
                source={{
                  uri: 'https://i.picsum.photos/id/118/200/300.jpg?hmac=y5ur5cobUmPTuS2C6FvS8uE6IYI07GiElMbvlmulnUA',
                  priority: FastImage.priority.normal,
                }}
                cacheControl={FastImage.cacheControl.none}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
          </View>
        </ScrollView>

        <FAB.Group
          open={open}
          style={style.fabDesign}
          icon={open ? 'close' : 'plus'}
          actions={[
            {
              icon: 'square-edit-outline',
              label: orderDetailLabel.editOrderLabel,
              onPress: () => {
                navigation.navigate('UpdatePasswordScreen');
              },
            },
            {
              icon: 'file-download',
              label: orderDetailLabel.voucher,
              onPress: () => {
                navigation.navigate('UpdatePasswordScreen');
              },
            },
          ]}
          onStateChange={onStateChange}
        />
      </Portal>
    </Provider>
  );
};
