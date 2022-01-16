import React, {useEffect, useState} from 'react';
import {ScrollView, View, Text, TouchableOpacity} from 'react-native';
import {TextInput, Button, Headline, Switch} from 'react-native-paper';
import {Formik} from 'formik';

import Loader from '@helper/loader';
import Error from '@helper/error';
import style from '@style/public.register';
import validationSchema from '@validation/public.register';
import {useNavigation} from '@react-navigation/native';
import {registerLabelGrp} from '@label';
import {useRegisterMutation} from '@service/auth';

export default () => {
  const navigation = useNavigation();
  const [register] = useRegisterMutation();

  const [statusObj, setStatusObj] = useState({
    isSaving: false,
    errorMsg: null,
    isError: false,
    isSuccess: false,
    successMsg: null,
  });

  const handleRegister = async obj => {
    const {data, error} = await register(obj);
    if (data?.status === 'success') {
      setStatusObj(prev => ({...prev, ...{isSaving: false, isSuccess: true}}));
    }
    if (error) {
      setStatusObj(prev => ({
        ...prev,
        ...{isSaving: false, isError: true, errorMsg: error?.data?.message},
      }));
    }
  };

  useEffect(() => {
    if (statusObj?.isSuccess) {
      const timer = setTimeout(() => {
        return navigation.navigate('Login', {msg: statusObj?.successMsg});
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [statusObj?.isSuccess, statusObj?.successMsg, navigation]);

  return (
    <ScrollView style={style.container}>
      <View style={style.titleTextWrapper}>
        <Headline style={style.titleText}>{registerLabelGrp.title}</Headline>
      </View>
      {statusObj?.isError && <Error msg={statusObj?.errorMsg} />}
      {statusObj?.isSaving && <Loader msg="Registering..." />}
      {statusObj?.isSuccess && <Loader msg={statusObj?.successMsg} />}
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          name: 'ssss',
          phone: '0933333',
          confirm_phone: '0933333',
          email: 'kk@gmail.com',
          password: '11111111',
          confirm_password: '11111111',
          accept_tos: true,
        }}
        onSubmit={async (values, actions) => {
          actions.setSubmitting(true);
          delete values.id;
          handleRegister(values);
          actions.setSubmitting(true);
        }}>
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
                right={<TextInput.Icon name="eye" />}
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
                right={<TextInput.Icon name="eye" />}
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
            {statusObj.isSaving === false && (
              <View style={style.buttonWrapper}>
                <Button
                  mode="contained"
                  // disabled={!isValid || !dirty}
                  onPress={handleSubmit}>
                  {registerLabelGrp.buttonLabel}
                </Button>
              </View>
            )}
          </>
        )}
      </Formik>
      {!statusObj.isSaving && (
        <View style={style.registrationLinkWrapper}>
          <Text style={style.registrationText}>
            {registerLabelGrp.hasAccountLabel}{' '}
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={style.createAccountText}>
                {registerLabelGrp.loginHereLabel}
              </Text>
            </TouchableOpacity>
          </Text>
        </View>
      )}
    </ScrollView>
  );
};
