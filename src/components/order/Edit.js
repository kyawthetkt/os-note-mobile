import React, {useEffect, useState, useCallback} from 'react';
import FormFields from '@component/order/OrderForm';
import {mainOrderFormSchema} from '@validation/order.form';
import {RefreshControl, ScrollView} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import {useOrderQuery, useUpdateMutation} from '@service/order';
import {Formik} from 'formik';
import Error from '@helper/error';
import editStyle from '@style/order.form';
import OrderDetailList from '@component/order/OrderDetailList';

export default () => {
  const navigation = useNavigation();
  const {
    params: {id},
  } = useRoute();
  // const id = 2;
  const [counter, setCounter] = useState(0);
  const {data} = useOrderQuery({id, counter});
  const [update] = useUpdateMutation();

  const [statusObj, setStatusObj] = useState({
    isSaving: false,
    isError: false,
    errorMsg: null,
    isSuccess: null,
    successMsg: null,
  });

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setCounter(prev => prev + 1);
    setRefreshing(false);
  }, []);

  const [orderedDatePicker, setOrderedDatePicker] = useState(false);
  const [deliveredDatePicker, setDeliveredDatePicker] = useState(false);
  const [completeDatePicker, setCompleteDatePicker] = useState(false);
  const orderStatus = ['ORDERED', 'DELIVERED', 'COMPLETE'];
  const deliveryMethod = ['BY_COURIER', 'BY_BUS', 'OTHER'];

  const handleUpdateOrder = async obj => {
    setStatusObj(prev => ({...{prev}, ...{isSaving: true}}));
    const {data: updateData, error} = await update(obj);
    if (updateData?.status === 'success') {
      setStatusObj(prev => ({
        ...{prev},
        ...{isSuccess: true, isSaving: false, successMsg: updateData.msg},
      }));
    }
    if (error) {
      setStatusObj(prev => ({
        ...{prev},
        ...{isError: true, isSaving: false, errorMsg: error?.data?.msg},
      }));
    }
  };

  useEffect(() => {
    if (statusObj.isSuccess) {
      navigation.navigate('OrderDetail', {id});
    }
  }, [id, statusObj.isSuccess, navigation]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={editStyle.container}>
      {statusObj.isError && <Error msg={statusObj.errorMsg} />}

      {id && data?.order && (
        <OrderDetailList list={data?.order?.orderDetail} orderId={id} />
      )}
      {data?.order && (
        <>
          <Formik
            validationSchema={mainOrderFormSchema}
            initialValues={{
              id: id,
              status: data.order.status,
              shop_name: data.order.shop_name,
              shop_description: data.order.shop_description,
              customer_name: data.order.customer_name,
              customer_phone: data.order.customer_phone,
              customer_address: data.order.customer_address,
              delivery_type: data.order.delivery_type,
              delivery_fee: data.order.delivery_fee,
              ordered_at: data.order.ordered_at,
              delivered_at: data.order.delivered_at,
              complete_at: data.order.complete_at,
              remark: data.order.remark
                ? data.order.remark.trim()
                : data.order.remark,
            }}
            onSubmit={(values, actions) => {
              handleUpdateOrder(values);
            }}>
            {props => {
              return (
                <FormFields
                  orderedDatePicker={orderedDatePicker}
                  deliveredDatePicker={deliveredDatePicker}
                  completeDatePicker={completeDatePicker}
                  orderStatus={orderStatus}
                  deliveryMethod={deliveryMethod}
                  setOrderedDatePicker={setOrderedDatePicker}
                  setDeliveredDatePicker={setDeliveredDatePicker}
                  setCompleteDatePicker={setCompleteDatePicker}
                  isSaving={statusObj.isSaving}
                  {...props}
                />
              );
            }}
          </Formik>
        </>
      )}
    </ScrollView>
  );
};
