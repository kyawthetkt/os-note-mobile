import React, {useEffect, useState, useCallback} from 'react';
import {ScrollView, View, Text, RefreshControl, Alert} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {FAB, Portal, Provider, Paragraph, List} from 'react-native-paper';
// import FastImage from 'react-native-fast-image';
import {formtDate} from '@helper/date';
import style from '@style/order.detail';
import {
  useOrderQuery,
  useDeleteOrderMutation,
  usePrintPdfMutation,
} from '@service/order';
import Loader from '@helper/loader';

// Later to remove
import {orderLabelGrp, utilLabelGrp} from '@label';

const OrderDetail = ({item}) => {
  return (
    <List.Item
      title={`${item.name} - (${item.size ? item.size : 'NA '} - ${
        item.color ? item.color : 'NA'
      })`}
      description={() => (
        <View>
          <Text>
            {orderLabelGrp.quantity}: {item.quantity}
          </Text>
          <Text>
            {orderLabelGrp.subTotalAmount}: {item.sub_total_price}
          </Text>
        </View>
      )}
      left={props => <List.Icon {...props} icon="square" />}
    />
  );
};

export default () => {
  const navigation = useNavigation();
  const {
    params: {id},
  } = useRoute();
  const [deleteOrder] = useDeleteOrderMutation();
  const [printPdf] = usePrintPdfMutation();

  const [isPrinted, setIsPrinted] = useState(false);
  const [counter, setCounter] = useState(0);
  const [state, setState] = useState({open: false});
  const onStateChange = ({open}) => setState({open});
  const {open} = state;
  const {data, isFetching} = useOrderQuery({id, counter});
  const orderDetail = data?.order;
  const customer_name = orderDetail?.customer_name;

  useEffect(() => {
    navigation.setOptions({
      title: customer_name || '...',
    });
  }, [customer_name, navigation]);

  useEffect(() => {
    if (isPrinted) {
      setCounter(prev => prev + 1);
    }
  }, [isPrinted]);

  const handlePrint = async obj => {
    const {data: printed} = await printPdf(obj);
    console.log(printed);
    if (printed?.status === 'success') {
      setIsPrinted(true);
    }
    if (printed?.status === 'error') {
      Alert.alert(printed?.msg);
    }
  };

  const handleDelete = async obj => {
    const {data: deleteData} = await deleteOrder(obj);
    if (deleteData?.status === 'success') {
      navigation.navigate('OrderList');
    }
    if (deleteData?.status === 'error') {
      Alert.alert(deleteData?.msg);
    }
  };

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setCounter(prev => prev + 1);
    setRefreshing(false);
  }, []);

  return (
    <Provider>
      <Portal>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={style.container}>
          {isFetching && <Loader msg={utilLabelGrp.isFetching} />}
          {!orderDetail && !isFetching ? (
            <Text style={style.emptyOrderDetailText}>
              {orderLabelGrp.emptyOrderDetailText}
            </Text>
          ) : (
            <View style={[style.itemsWrapper]}>
              <View style={style.itemWrapper}>
                <Text style={style.labelIndex}>
                  {orderLabelGrp.shopName}:
                  <Text style={style.labelValue}>{orderDetail?.shop_name}</Text>
                </Text>
                <Text style={style.labelIndex}>
                  {orderLabelGrp.shopDescription}:
                  <Text style={style.labelValue}>
                    {orderDetail?.shop_description}
                  </Text>
                </Text>
              </View>
              <View style={style.itemWrapper}>
                <Text style={style.labelIndex}>
                  {orderLabelGrp.customerPhone}:
                  <Text style={style.labelValue}>
                    {orderDetail?.customer_phone}
                  </Text>
                </Text>
                <Text style={style.labelIndex}>
                  {orderLabelGrp.customerAddress}:
                  <Text style={style.labelValue}>
                    {orderDetail?.customer_address}
                  </Text>
                </Text>
              </View>
              <View style={style.itemWrapper}>
                <Text style={style.labelIndex}>
                  {orderLabelGrp.orderedDate}:
                  <Text style={style.labelValue}>
                    {formtDate(orderDetail?.ordered_at)}
                  </Text>
                </Text>
                <Text style={style.labelIndex}>
                  {orderLabelGrp.deliveredDate}:
                  <Text style={style.labelValue}>
                    {formtDate(orderDetail?.delivered_at)}
                  </Text>
                </Text>
                <Text style={style.labelIndex}>
                  {orderLabelGrp.completeDate}:
                  <Text style={style.labelValue}>
                    {formtDate(orderDetail?.complete_at)}
                  </Text>
                </Text>
              </View>

              <View style={style.itemWrapper}>
                <Text style={style.labelIndex}>
                  {orderLabelGrp.deliveryType}:
                  <Text style={style.labelValue}>
                    {orderLabelGrp.switchDeliveryMethod(
                      orderDetail?.delivery_type,
                    )}
                  </Text>
                </Text>
                <Text style={style.labelIndex}>
                  {orderLabelGrp.deliveryFee}:
                  <Text style={style.labelValue}>
                    {orderDetail?.delivery_fee}
                  </Text>
                </Text>
                <Text style={style.labelIndex}>
                  {orderLabelGrp.remark}:{' '}
                  <Paragraph>{orderDetail?.remark}</Paragraph>
                </Text>
              </View>
              <View style={style.itemWrapper}>
                <Text style={style.labelValue}>{orderLabelGrp.files}</Text>
                {orderDetail?.orderDetail?.map(item => (
                  <OrderDetail key={item.id} item={item} />
                ))}
              </View>
            </View>
          )}
        </ScrollView>

        <FAB.Group
          open={open}
          style={style.fabDesign}
          icon={open ? 'close' : 'plus'}
          actions={[
            {
              icon: 'square-edit-outline',
              label: orderLabelGrp.editOrderLabel,
              onPress: () => {
                navigation.navigate('OrderEdit', {id});
              },
            },
            {
              icon: 'file-download',
              label: orderLabelGrp.voucher,
              onPress: () => {
                handlePrint({
                  id: orderDetail.id,
                  user_id: orderDetail.user_id,
                });
              },
            },
            {
              icon: 'delete-empty-outline',
              label: orderLabelGrp.deleteOrderLabel,
              onPress: () => {
                handleDelete({
                  id: orderDetail.id,
                  user_id: orderDetail.user_id,
                });
              },
            },
          ]}
          onStateChange={onStateChange}
        />
      </Portal>
    </Provider>
  );
};
