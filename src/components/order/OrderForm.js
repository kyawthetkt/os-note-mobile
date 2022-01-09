/* eslint-disable no-alert */
import React, {useState} from 'react';
import {ScrollView, View, Text, Platform} from 'react-native';
import {
  TextInput,
  Button,
  RadioButton,
  IconButton,
  Colors,
  List,
} from 'react-native-paper';
import {Formik} from 'formik';
import {format} from 'date-fns';
import * as ImagePicker from 'react-native-image-picker';
import FastImage from 'react-native-fast-image';

import style from '@style/order.create';
import validationSchema from '@validation/order.form';
import {FormInputError} from '@helper/input.error';
import DatePicker from '@helper/datepicker.input';
import SubOrderForm from '@component/order/SubOrderForm';

// Later to remove
import {orderLabelGrp} from '@util/order.label';

export default () => {
  const [orderedDatePicker, setOrderedDatePicker] = useState(false);
  const [deliveredDatePicker, setDeliveredDatePicker] = useState(false);
  const [completeDatePicker, setCompleteDatePicker] = useState(false);

  const [addSubOrder, setAddSubOrder] = useState(false);

  const [imageFile, setImageFile] = useState({});

  const [newSubOrderForm, setNewSubOrderForm] = useState(false);
  const [activeOd, setActiveOd] = useState({
    name: '',
    color: '',
    size: '',
    quantity: '',
    sub_total_price: '',
  });

  const orderStatus = ['ORDERED', 'DELIVERED', 'COMPLETE'];
  const deliveryMethod = ['BY_COURIER', 'BY_BUS', 'OTHER'];

  const submitForm = (values, actions) => {
    try {
      console.log('values: ', values);
      // const formData = new FormData();
      // formData.append("profileImages[]", values);

      alert(JSON.stringify(values, null, 2));
      actions.setSubmitting(false);
    } catch (error) {}
  };
  const handleFilePicker = async () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
        path: 'images',
      },
      res => {
        if (res.didCancel) {
        } else if (res.error) {
        } else if (res.customButton) {
        } else {
          setImageFile({
            uri: res.assets[0].uri,
            name: res.assets[0].fileName,
            type: res.assets[0].type,
          });
        }
      },
    );
  };

  return (
    <ScrollView style={style.container}>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          status: 'ORDERED',
          shop_name: '',
          shop_description: '',
          customer_name: '',
          customer_phone: '',
          customer_address: '',
          order_detail: [
            {
              id: 11,
              name: 'dd',
              size: 'small',
              color: 'red',
              quantity: 10,
              sub_total_price: 2000,
            },
            {
              id: 12,
              name: 'gwwrgwr',
              size: 'm',
              color: 'tan',
              quantity: 3,
              sub_total_price: 40,
            },
          ],
          delivery_type: 'BY_COURIER',
          delivery_fee: '',
          ordered_at: '',
          delivered_at: '',
          complete_at: '',
          remark: '',
          files: '',
        }}
        onSubmit={submitForm}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          isValid,
          dirty,
          errors,
          setFieldValue,
        }) => {
          console.log(errors.order_detail);
          return (
            <>
              <View style={style.inputWrapper}>
                <Text style={style.lableColor}>{orderLabelGrp.status}</Text>
                <RadioButton.Group
                  value={values.status}
                  onValueChange={newValue => setFieldValue('status', newValue)}>
                  {orderStatus.map((code, index) => (
                    <RadioButton.Item key={index} label={code} value={code} />
                  ))}
                </RadioButton.Group>
              </View>
              <View style={style.inputWrapper}>
                {values.order_detail.map((item, index) => (
                  <List.Item
                    key={index}
                    title={`${item.name}`}
                    description={() => (
                      <View>
                        <Text>
                          Size: {item.size} - Color: {item.color}
                        </Text>
                        <Text>Quantity: {item.quantity}</Text>
                        <Text>Sub Total Price: {item.sub_total_price}</Text>
                        <Button
                          style={{width: 80}}
                          mode="contained"
                          onPress={() => setNewSubOrderForm(prev => !prev)}>
                          Edit
                        </Button>
                        <Button
                          style={{width: 120, marginTop: 2}}
                          mode="contained"
                          onPress={() => alert('delete')}>
                          Delete
                        </Button>
                        {item.isEditted && <SubOrderForm />}
                      </View>
                    )}
                    left={props => <List.Icon {...props} icon="square" />}
                  />
                ))}
              </View>
              {/* {newSubOrderForm && (
                <View style={style.inputWrapper}>
                  <SubOrderForm />
                </View>
              )} */}
              {/* <View style={style.inputWrapper}>
              <TextInput
                mode="outlined"
                label={orderLabelGrp.shopName}
                style={style.whiteBg}
                placeholder={orderLabelGrp.shopName}
                onChangeText={handleChange('shop_name')}
                onBlur={handleBlur('shop_name')}
                value={values.shop_name}
              />
              <FormInputError msg={errors.shop_name} />
            </View>
            <View style={style.inputWrapper}>
              <TextInput
                mode="outlined"
                multiline={true}
                label={orderLabelGrp.shopDescription}
                style={style.textAreaWhiteBg}
                placeholder={orderLabelGrp.shopDescription}
                onChangeText={handleChange('shop_description')}
                onBlur={handleBlur('shop_description')}
                value={values.shop_description}
              />
              <FormInputError msg={errors.shop_description} />
            </View>

            <View style={style.inputWrapper}>
              <TextInput
                mode="outlined"
                label={orderLabelGrp.customerName}
                style={style.whiteBg}
                placeholder={orderLabelGrp.customerName}
                onChangeText={handleChange('customer_name')}
                onBlur={handleBlur('customer_name')}
                value={values.customer_name}
              />
              <FormInputError msg={errors.customer_name} />
            </View>

            <View style={style.inputWrapper}>
              <TextInput
                mode="outlined"
                label={orderLabelGrp.customerPhone}
                style={style.whiteBg}
                placeholder={orderLabelGrp.customerPhone}
                onChangeText={handleChange('customer_phone')}
                onBlur={handleBlur('customer_phone')}
                value={values.customer_phone}
              />
              <FormInputError msg={errors.customer_phone} />
            </View>

            <View style={style.inputWrapper}>
              <TextInput
                mode="outlined"
                label={orderLabelGrp.customerAddress}
                style={style.textAreaWhiteBg}
                placeholder={orderLabelGrp.customerAddress}
                onChangeText={handleChange('customer_address')}
                onBlur={handleBlur('customer_address')}
                value={values.customer_address}
              />
              <FormInputError msg={errors.customer_address} />
            </View>

            <View style={style.inputWrapper}>
              <Text style={style.lableColor}>{orderLabelGrp.deliveryType}</Text>
              <RadioButton.Group
                value={values.delivery_type}
                onValueChange={newValue =>
                  setFieldValue('delivery_type', newValue)
                }>
                {deliveryMethod.map((method, index) => (
                  <RadioButton.Item key={index} label={method} value={method} />
                ))}
              </RadioButton.Group>
            </View>

            <View style={style.inputWrapper}>
              <TextInput
                mode="outlined"
                label={orderLabelGrp.deliveryFee}
                style={style.whiteBg}
                placeholder={orderLabelGrp.deliveryFee}
                onChangeText={handleChange('delivery_fee')}
                onBlur={handleBlur('delivery_fee')}
                value={values.delivery_fee}
              />
              <FormInputError msg={errors.delivery_fee} />
            </View>

            <View style={style.inputWrapper}>
              <TextInput
                mode="outlined"
                label={orderLabelGrp.orderedDate}
                style={style.whiteBg}
                placeholder={orderLabelGrp.orderedDate}
                onChangeText={handleChange('ordered_at')}
                onBlur={handleBlur('ordered_at')}
                value={values.ordered_at}
                right={
                  <TextInput.Icon
                    name="calendar"
                    onPress={() => setOrderedDatePicker(true)}
                  />
                }
              />
              {orderedDatePicker && (
                <DatePicker
                  name={values.ordered_at}
                  handelOnChange={(event, value) => {
                    if (Platform.OS === 'android') {
                      setOrderedDatePicker(false);
                    }
                    if (value) {
                      setFieldValue(
                        'ordered_at',
                        format(new Date(value), 'yyyy-MM-dd'),
                      );
                    }
                  }}
                />
              )}
              <FormInputError msg={errors.ordered_at} />
            </View>

            <View style={style.inputWrapper}>
              <TextInput
                mode="outlined"
                label={orderLabelGrp.deliveredDate}
                style={style.whiteBg}
                placeholder={orderLabelGrp.deliveredDate}
                onChangeText={handleChange('delivered_at')}
                onBlur={handleBlur('delivered_at')}
                value={values.delivered_at}
                right={
                  <TextInput.Icon
                    name="calendar"
                    onPress={() => setDeliveredDatePicker(true)}
                  />
                }
              />
              {deliveredDatePicker && (
                <DatePicker
                  name={values.delivered_at}
                  handelOnChange={(event, value) => {
                    if (Platform.OS === 'android') {
                      setDeliveredDatePicker(false);
                    }
                    if (value) {
                      setFieldValue(
                        'delivered_at',
                        format(new Date(value), 'yyyy-MM-dd'),
                      );
                    }
                  }}
                />
              )}
              <FormInputError msg={errors.delivered_at} />
            </View>

            <View style={style.inputWrapper}>
              <TextInput
                mode="outlined"
                label={orderLabelGrp.completeDate}
                style={style.whiteBg}
                placeholder={orderLabelGrp.completeDate}
                onChangeText={handleChange('complete_at')}
                onBlur={handleBlur('complete_at')}
                value={values.complete_at}
                right={
                  <TextInput.Icon
                    name="calendar"
                    onPress={() => setCompleteDatePicker(true)}
                  />
                }
              />
              {completeDatePicker && (
                <DatePicker
                  name={values.complete_at}
                  handelOnChange={(event, value) => {
                    if (Platform.OS === 'android') {
                      setCompleteDatePicker(false);
                    }
                    if (value) {
                      setFieldValue(
                        'complete_at',
                        format(new Date(value), 'yyyy-MM-dd'),
                      );
                    }
                  }}
                />
              )}
              <FormInputError msg={errors.complete_at} />
            </View>

            <View style={style.inputWrapper}>
              <TextInput
                mode="outlined"
                multiline={true}
                label={orderLabelGrp.remark}
                style={style.textAreaWhiteBg}
                placeholder={orderLabelGrp.remark}
                onChangeText={handleChange('remark')}
                onBlur={handleBlur('remark')}
                value={values.remark}
              />
              <FormInputError msg={errors.remark} />
            </View>

            <View style={style.inputWrapper}>
              <Text style={style.lableColor}>
                {orderLabelGrp.attachmentFile}{' '}
                {Object.keys(imageFile).length > 0 && (
                  <TextInput.Icon
                    onPress={() => setImageFile({})}
                    name="delete-forever"
                  />
                )}
              </Text>
              <IconButton
                icon="file-upload-outline"
                color={Colors.red500}
                size={50}
                onPress={handleFilePicker}
              />
            </View> */}

              <View style={style.buttonWrapper}>
                <Button
                  mode="contained"
                  disabled={!isValid || !dirty}
                  onPress={handleSubmit}>
                  {orderLabelGrp.saveButtonLabel}
                </Button>
              </View>
            </>
          );
        }}
      </Formik>
    </ScrollView>
  );
};
