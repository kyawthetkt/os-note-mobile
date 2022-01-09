import React from 'react';
import {ScrollView, View, Text} from 'react-native';

import style from '@style/public.login';
import validationSchema from '@validation/public.login';

import {TextInput, Button, Headline} from 'react-native-paper';
import {Formik} from 'formik';

export default () => {
  const LoginLabelGrp = {
    title: 'Login',
    phoneLabel: 'Phone No. *',
    passwordLabel: 'Password *',
    buttonLabel: 'Login',
    hasNoAccountLabel: 'Already have no account? ',
    createAccountHereLabel: 'Create Here',
  };

  const submitLogin = (values, actions) => {
    try {
      console.log('values: ', values);
      alert(JSON.stringify(values, null, 2));
      actions.setSubmitting(false);
      // const result = await saveProfile(values).unwrap();
    } catch (error) {}
  };

  return (
    <ScrollView style={style.container}>
      <View style={style.titleTextWrapper}>
        <Headline style={style.titleText}>{LoginLabelGrp.title}</Headline>
      </View>

      <Formik
        validationSchema={validationSchema}
        initialValues={{
          phone: '',
          password: '',
        }}
        onSubmit={submitLogin}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          isValid,
          dirty,
          errors,
        }) => {
          return (
            <>
              <View style={style.phoneWrapper}>
                <TextInput
                  mode="outlined"
                  label={LoginLabelGrp.phoneLabel}
                  style={style.whiteBg}
                  placeholder={LoginLabelGrp.phoneLabel}
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  value={values.phone}
                />
                {errors.phone && (
                  <Text style={style.errorMsg}>{errors.phone}</Text>
                )}
              </View>

              <View style={style.passwordWrapper}>
                <TextInput
                  mode="outlined"
                  label={LoginLabelGrp.passwordLabel}
                  style={style.whiteBg}
                  placeholder={LoginLabelGrp.passwordLabel}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password} 
                  secureTextEntry={true} 
                  right={<TextInput.Icon name="eye" />}
                />
                {errors.password && (
                  <Text style={style.errorMsg}>{errors.password}</Text>
                )}
              </View>

              <View style={style.buttonWrapper}>
                <Button
                  icon="login"
                  mode="contained"
                  disabled={!isValid || !dirty}
                  onPress={handleSubmit}>
                  {LoginLabelGrp.buttonLabel}
                </Button>
              </View>
            </>
          );
        }}
      </Formik>
      <View style={style.registrationLinkWrapper}>
        <Text style={style.registrationText}>
          {LoginLabelGrp.hasNoAccountLabel}{' '}
          <Text style={style.createAccountText}>
            {LoginLabelGrp.createAccountHereLabel}
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
};
