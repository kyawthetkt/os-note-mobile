import React, {useState} from 'react';
import {ScrollView, View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import style from '@style/public.login';
import validationSchema from '@validation/public.login';
import {LoginLabelGrp} from '@label';
import Loader from '@helper/loader';
import Error from '@helper/error';
import {TextInput, Button, Headline} from 'react-native-paper';
import {Formik} from 'formik';
import {useLoginMutation} from '@service/auth';
import {useDispatch} from 'react-redux';
import {setAuthUser} from '@store/auth';

export default () => {
  const dispatch = useDispatch();
  const [statusObj, setStatusObj] = useState({
    isLoading: false,
    isError: false,
    isLogging: false,
    errorMsg: '',
  });
  const navigation = useNavigation();
  const [login] = useLoginMutation();

  const Login = async requestData => {
    setStatusObj(prev => ({...prev, ...{isLoading: true}}));
    const {data, error} = await login(requestData);

    if (data?.status === 'success') {
      dispatch(setAuthUser({name: 'USER', token: data?.token}));
      setStatusObj(prev => ({...prev, ...{isLoading: false}}));
    }
    if (error) {
      setStatusObj(prev => ({
        ...prev,
        ...{isLoading: false, isError: true, errorMsg: error?.data?.message},
      }));
    }
  };

  return (
    <ScrollView style={style.container}>
      <View style={style.titleTextWrapper}>
        <Headline style={style.titleText}>{LoginLabelGrp.title}</Headline>
      </View>
      {statusObj.isError && <Error msg={statusObj.errorMsg} />}
      {statusObj.isLoading && <Loader msg="Logging in..." />}
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          phone: '095252525',
          password: '',
        }}
        onSubmit={(values, actions) => {
          actions.setSubmitting(true);
          Login(values);
          actions.setSubmitting(false);
        }}>
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
              {!statusObj.isLoading && (
                <View style={style.buttonWrapper}>
                  <Button
                    mode="contained"
                    disabled={!isValid || !dirty}
                    onPress={handleSubmit}>
                    {LoginLabelGrp.buttonLabel}
                  </Button>
                </View>
              )}
            </>
          );
        }}
      </Formik>

      {!statusObj.isLoading && (
        <View style={style.registrationLinkWrapper}>
          <Text style={style.registrationText}>
            {LoginLabelGrp.hasNoAccountLabel}{' '}
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={style.createAccountText}>
                {LoginLabelGrp.createAccountHereLabel}
              </Text>
            </TouchableOpacity>
          </Text>
        </View>
      )}
    </ScrollView>
  );
};
