import React, {useEffect, useState} from 'react';
import FormFields from '@component/order/OrderForm';
import {mainOrderFormSchema} from '@validation/order.form';
import {ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useCreateMutation} from '@service/order';
import {Formik} from 'formik';
import Error from '@helper/error';
import editStyle from '@style/order.form';

export default () => {
  const navigation = useNavigation();
  const [create] = useCreateMutation();
  const [id, setId] = useState(null);

  const [statusObj, setStatusObj] = useState({
    isSaving: false,
    isError: false,
    errorMsg: null,
    isSuccess: null,
    successMsg: null,
  });

  const [orderedDatePicker, setOrderedDatePicker] = useState(false);
  const [deliveredDatePicker, setDeliveredDatePicker] = useState(false);
  const [completeDatePicker, setCompleteDatePicker] = useState(false);
  const orderStatus = ['ORDERED', 'DELIVERED', 'COMPLETE'];
  const deliveryMethod = ['BY_COURIER', 'BY_BUS', 'OTHER'];

  const handleCreateOrder = async obj => {
    setStatusObj(prev => ({...{prev}, ...{isSaving: true}}));
    const {data, error} = await create(obj);
    console.log(data, error)
    if (data?.status === 'success') {
      setStatusObj(prev => ({
        ...{prev},
        ...{isSuccess: true, isSaving: false, successMsg: data.msg},
      }));
      setId(data?.data?.id);
    }
    if (data?.status === 'error') {
      setStatusObj(prev => ({
        ...{prev},
        ...{isError: true, isSaving: false, errorMsg: error?.data?.msg},
      }));
    }
  };

  useEffect(() => {
    if (statusObj.isSuccess) {
      navigation.navigate('OrderEdit', {id});
    }
  }, [id, statusObj.isSuccess, navigation]);

  return (
    <ScrollView style={editStyle.container}>
      {statusObj.isError && <Error msg={statusObj.errorMsg} />}
      <>
        <Formik
          validationSchema={mainOrderFormSchema}
          initialValues={{
            id: '',
            status: 'ORDERED',
            shop_name: '',
            shop_description: '',
            customer_name: '',
            customer_phone: '',
            customer_address: '',
            delivery_type: 'BY_COURIER',
            delivery_fee: '',
            ordered_at: new Date(),
            delivered_at: new Date(),
            complete_at: new Date(),
            remark: '',
          }}
          onSubmit={(values, actions) => {
            // console.log(values);
            handleCreateOrder(values);
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
    </ScrollView>
  );
};
