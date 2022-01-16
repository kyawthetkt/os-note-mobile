import React, {memo} from 'react';
import {View, Text, Platform} from 'react-native';
import {
  TextInput,
  Button,
  RadioButton,
  // IconButton,
  // Colors,
} from 'react-native-paper';
// import * as ImagePicker from 'react-native-image-picker';
import style from '@style/order.form';
import {FormInputError} from '@helper/input.error';
import DatePicker from '@helper/datepicker.input';
import {formtDate} from '@helper/date';

// Later to remove
import {orderLabelGrp} from '@label';

export default memo(
  ({
    orderedDatePicker,
    deliveredDatePicker,
    completeDatePicker,
    orderStatus,
    deliveryMethod,

    handleChange,
    handleBlur,
    handleSubmit,
    values,
    // isValid,
    // dirty,
    errors,
    setFieldValue,
    setOrderedDatePicker,
    setDeliveredDatePicker,
    setCompleteDatePicker,
    isSaving,
  }) => {
    return (
      <>
        <View style={style.inputWrapper}>
          <Text style={style.lableColor}>{orderLabelGrp.status}</Text>
          <RadioButton.Group
            value={values.status}
            onValueChange={newValue => setFieldValue('status', newValue)}>
            {orderStatus.map((code, index) => (
              <RadioButton.Item
                key={index}
                label={orderLabelGrp.switchOrderStatus(code)}
                value={code}
              />
            ))}
          </RadioButton.Group>
        </View>
        <View style={style.inputWrapper}>
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
              <RadioButton.Item
                key={index}
                label={orderLabelGrp.switchDeliveryMethod(method)}
                value={method}
              />
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
            value={formtDate(values.ordered_at, 'yyyy-MM-dd')}
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
                    formtDate(new Date(value), 'yyyy-MM-dd'),
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
            value={formtDate(values.delivered_at, 'yyyy-MM-dd')}
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
                    formtDate(new Date(value), 'yyyy-MM-dd'),
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
            value={formtDate(values.complete_at, 'yyyy-MM-dd')}
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
                    formtDate(new Date(value), 'yyyy-MM-dd'),
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

        <View style={style.buttonWrapper}>
          {!isSaving ? (
            <Button
              mode="contained"
              // disabled={!isValid || !dirty}
              onPress={handleSubmit}>
              {orderLabelGrp.saveButtonLabel}
            </Button>
          ) : (
            <Text style={style.pleaseWait}>{orderLabelGrp.pleaseWaitLabel}</Text>
          )}
        </View>
      </>
    );
  },
);
