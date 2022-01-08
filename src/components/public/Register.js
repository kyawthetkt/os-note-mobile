/* eslint-disable no-alert */
import React from 'react';
import {ScrollView, View, Text} from 'react-native';

import style from '@style/public.register';
import validationSchema from '@validation/public.register';

import {TextInput, Button, Headline, Switch} from 'react-native-paper';
import {Formik} from 'formik';

export default () => {
  const registerLabelGrp = {
    title: 'Register',
    nameLabel: 'Name *',
    emailLabel: 'E-mail',
    phoneLabel: 'Phone No. *',
    confirmPhoneLabel: 'Confirm Phone No. *',
    passwordLabel: 'Password *',
    confirmPasswordLabel: 'Confirm Password *',
    buttonLabel: 'Register',
    hasAccountLabel: 'Already have account? ',
    loginHereLabel: 'Login Here',
    memorezePhonePassword: 'Please memorize your phone number and password.',
  };

  const submitLogin = (values, actions) => {
    try {
      console.log('values: ', values);
      alert(JSON.stringify(values, null, 2));
      actions.setSubmitting(false);
    } catch (error) {}
  };

  return (
    <ScrollView style={style.container}>
      <View style={style.titleTextWrapper}>
        <Headline style={style.titleText}>
          {registerLabelGrp.title}
        </Headline>
      </View>

      <Formik
        validationSchema={validationSchema}
        initialValues={{
          name: '',
          phone: '',
          confirm_phone: '',
          email: '',
          password: '',
          confirm_password: '',
          accept_tos: false,
        }}
        onSubmit={submitLogin}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          values,
          isValid,
          dirty,
          errors,
        }) => (
          <>
            <View style={style.inputWrapper}>
              <TextInput
                mode="outlined"
                label={registerLabelGrp.nameLabel}
                style={style.whiteBg}
                placeholder={registerLabelGrp.nameLabel}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
              />
              {errors.name && <Text style={style.errorMsg}>{errors.name}</Text>}
            </View>
            <View style={style.inputWrapper}>
              <TextInput
                mode="outlined"
                label={registerLabelGrp.emailLabel}
                style={style.whiteBg}
                placeholder={registerLabelGrp.emailLabel}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
              {errors.email && (
                <Text style={style.errorMsg}>{errors.email}</Text>
              )}
            </View>

            <View style={style.inputWrapper}>
              <Text style={style.memorizeText}>
                {registerLabelGrp.memorezePhonePassword}
              </Text>
              <TextInput
                mode="outlined"
                label={registerLabelGrp.phoneLabel}
                style={style.whiteBg}
                placeholder={registerLabelGrp.phoneLabel}
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
                label={registerLabelGrp.confirmPhoneLabel}
                style={style.whiteBg}
                placeholder={registerLabelGrp.confirmPhoneLabel}
                onChangeText={handleChange('confirm_phone')}
                onBlur={handleBlur('confirm_phone')}
                value={values.confirm_phone}
              />
              {errors.confirm_phone && (
                <Text style={style.errorMsg}>{errors.confirm_phone}</Text>
              )}
            </View>

            <View style={style.inputWrapper}>
              <TextInput
                mode="outlined"
                label={registerLabelGrp.passwordLabel}
                style={style.whiteBg}
                placeholder={registerLabelGrp.passwordLabel}
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
                label={registerLabelGrp.confirmPasswordLabel}
                style={style.whiteBg}
                placeholder={registerLabelGrp.confirmPasswordLabel}
                onChangeText={handleChange('confirm_password')}
                onBlur={handleBlur('confirm_password')}
                value={values.confirm_password}
                secureTextEntry={true}
              />
              {errors.confirm_password && (
                <Text style={style.errorMsg}>{errors.confirm_password}</Text>
              )}
            </View>
            <View style={style.inputWrapper}>
              <Text style={style.tosText}>Accept Terms Of Service</Text>
              <Text>
                <Switch
                  value={values.accept_tos}
                  onValueChange={() => {
                    setFieldValue('accept_tos', !values.accept_tos);
                  }}
                />
              </Text>
              {errors.accept_tos && (
                <Text style={style.errorMsg}>{errors.accept_tos}</Text>
              )}
            </View>

            <View style={style.buttonWrapper}>
              <Button
                icon="login"
                mode="contained"
                disabled={!isValid || !dirty}
                onPress={handleSubmit}>
                {registerLabelGrp.buttonLabel}
              </Button>
            </View>
          </>
        )}
      </Formik>
      <View style={style.registrationLinkWrapper}>
        <Text style={style.registrationText}>
          {registerLabelGrp.hasAccountLabel}{' '}
          <Text style={style.createAccountText}>
            {registerLabelGrp.loginHereLabel}
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
};
