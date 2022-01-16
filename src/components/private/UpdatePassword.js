import React, {useEffect, useState} from 'react';
import {ScrollView, View, Text} from 'react-native';
import style from '@style/private.update-password';
import validationSchema from '@validation/private.update-password';
import Error from '@helper/error';
import Loader from '@helper/loader';
import {TextInput, Button} from 'react-native-paper';
import {Formik} from 'formik';
import {useNavigation} from '@react-navigation/native';
import {useUpdatePasswordMutation} from '@service/profile';
import {updatePasswordLabelGrp, utilLabelGrp} from '@label';

export default () => {
  const navigation = useNavigation();
  const [updateP‌assword] = useUpdatePasswordMutation();

  const [statusObj, setStatusObj] = useState({
    isSaving: false,
    errorMsg: null,
    isError: false,
    isSuccess: false,
    successMsg: null,
  });

  const handleUpdatePassword = async obj => {
    setStatusObj(prev => ({...prev, ...{isSaving: true}}));
    const {data: updatedData, error} = await updateP‌assword(obj);
    if (updatedData?.status === 'success') {
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
        return navigation.navigate('ProfileScreen');
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [statusObj?.isSuccess, navigation]);

  return (
    <ScrollView style={style.container}>
      {statusObj.isError && <Error msg={utilLabelGrp.isError} />}
      {statusObj.isSaving && <Loader msg={utilLabelGrp.isSaving} />}
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          password: '',
          confirm_password: '',
        }}
        onSubmit={(values, actions) => {
          actions.setSubmitting(true);
          handleUpdatePassword(values);
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
                  right={<TextInput.Icon name="eye" />}
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
                  right={<TextInput.Icon name="eye" />}
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
          );
        }}
      </Formik>
    </ScrollView>
  );
};
