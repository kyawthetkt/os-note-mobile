/* eslint-disable no-alert */
import React from 'react';
import {ScrollView, View, Text} from 'react-native';

import style from '@style/private.update-password';
import validationSchema from '@validation/private.update-password';

import {TextInput, Button } from 'react-native-paper';
import {Formik} from 'formik';

export default () => {
  const updatePasswordLabelGrp = {
    title: 'Change Password',
    passwordLabel: 'Password *',
    confirmPasswordLabel: 'Confirm Password *',
    saveButtonLabel: "Save",
  };

  const savePassword = (values, actions) => {
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
          password: '',
          confirm_password: '',
        }}
        onSubmit={savePassword}>
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
                label={updatePasswordLabelGrp.passwordLabel}
                style={style.whiteBg}
                placeholder={updatePasswordLabelGrp.passwordLabel}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry={true}
              />
              {errors.password && (
                <Text style={style.errorMsg}>{errors.password}</Text>
              )}
            </View>

            <View style={style.inputWrapper}>
              <TextInput
                mode="outlined"
                label={updatePasswordLabelGrp.confirmPasswordLabel}
                style={style.whiteBg}
                placeholder={updatePasswordLabelGrp.confirmPasswordLabel}
                onChangeText={handleChange('confirm_password')}
                onBlur={handleBlur('confirm_password')}
                value={values.confirm_password}
                secureTextEntry={true}
              />
              {errors.confirm_password && (
                <Text style={style.errorMsg}>{errors.confirm_password}</Text>
              )}
            </View>
           

            <View style={style.buttonWrapper}>
              <Button
                mode="contained"
                disabled={!isValid || !dirty}
                onPress={handleSubmit}>
                {updatePasswordLabelGrp.saveButtonLabel}
              </Button>
            </View>
          </>
        )}
      </Formik>
     
    </ScrollView>
  );
};
