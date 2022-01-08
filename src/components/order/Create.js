/* eslint-disable no-alert */
import React from 'react';
import {ScrollView, View, Text} from 'react-native';

import style from '@style/order.create';
import validationSchema from '@validation/private.update-profile';

import {TextInput, Button} from 'react-native-paper';
import {Formik} from 'formik';

export default () => {
  const createOrderLabelGrp = {
    updateProfileTitle: 'Update Profile',
    nameLabel: 'Name *',
    emailLabel: 'E-mail',
    phoneLabel: 'Phone No. *',
    confirmPhoneLabel: 'Confirm Phone No. *',
    saveButtonLabel: 'Save',
  };

  const submitProfile = (values, actions) => {
    try {
      console.log('values: ', values);
      alert(JSON.stringify(values, null, 2));
      actions.setSubmitting(false);
    } catch (error) {}
  };

  return (
    <ScrollView style={style.container}>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          name: '',
          phone: '',
          confirm_phone: '',
          email: '',
        }}
        onSubmit={submitProfile}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          isValid,
          dirty,
          errors,
        }) => (
          <>
            <View style={style.inputWrapper}>
              <TextInput
                mode="outlined"
                label={createOrderLabelGrp.nameLabel}
                style={style.whiteBg}
                placeholder={createOrderLabelGrp.nameLabel}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
              />
              {errors.name && <Text style={style.errorMsg}>{errors.name}</Text>}
            </View>
            <View style={style.inputWrapper}>
              <TextInput
                mode="outlined"
                label={createOrderLabelGrp.emailLabel}
                style={style.whiteBg}
                placeholder={createOrderLabelGrp.emailLabel}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
              {errors.email && (
                <Text style={style.errorMsg}>{errors.email}</Text>
              )}
            </View>

            <View style={style.inputWrapper}>
              <TextInput
                mode="outlined"
                label={createOrderLabelGrp.phoneLabel}
                style={style.whiteBg}
                placeholder={createOrderLabelGrp.phoneLabel}
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                value={values.phone}
              />
              {errors.phone && (
                <Text style={style.errorMsg}>{errors.phone}</Text>
              )}
            </View>

            <View style={style.inputWrapper}>
              <TextInput
                mode="outlined"
                label={createOrderLabelGrp.confirmPhoneLabel}
                style={style.whiteBg}
                placeholder={createOrderLabelGrp.confirmPhoneLabel}
                onChangeText={handleChange('confirm_phone')}
                onBlur={handleBlur('confirm_phone')}
                value={values.confirm_phone}
              />
              {errors.confirm_phone && (
                <Text style={style.errorMsg}>{errors.confirm_phone}</Text>
              )}
            </View>

            <View style={style.buttonWrapper}>
              <Button
                mode="contained"
                disabled={!isValid || !dirty}
                onPress={handleSubmit}>
                {createOrderLabelGrp.saveButtonLabel}
              </Button>
            </View>
          </>
        )}
      </Formik>
    </ScrollView>
  );
};
