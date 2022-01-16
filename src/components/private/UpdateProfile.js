import React, {useState, useEffect} from 'react';
import {ScrollView, View, Text, RefreshControl} from 'react-native';
import style from '@style/private.update-profile';
import validationSchema from '@validation/private.update-profile';
import {TextInput, Button} from 'react-native-paper';
import {Formik} from 'formik';
import Error from '@helper/error';
import Loader from '@helper/loader';
import {useNavigation} from '@react-navigation/native';
import {useProfileQuery, useUpdateProfileMutation} from '@service/profile';
import {updateProfileLabelGrp, utilLabelGrp} from '@label';

export default () => {
  const navigation = useNavigation();
  const [counter, setCounter] = useState(0);
  const [statusObj, setStatusObj] = useState({
    isSaving: false,
    errorMsg: null,
    isError: false,
    isSuccess: false,
    successMsg: null,
  });

  const {data} = useProfileQuery({counter});
  const [updateProfile] = useUpdateProfileMutation();

  const handleUpdateProfile = async obj => {
    setStatusObj(prev => ({...prev, ...{isSaving: true}}));
    const {data: updatedData, error} = await updateProfile(obj);
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

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setCounter(prev => prev + 1);
    setRefreshing(false);
  }, []);

  useEffect(() => {
    if (statusObj?.isSuccess) {
      navigation.navigate('ProfileScreen');
    }
  }, [statusObj?.isSuccess, navigation]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={style.container}>
      {statusObj.errorMsg && <Error msg={statusObj.errorMsg} />}
      {statusObj.isSaving && <Loader msg={utilLabelGrp.isSaving} />}
      {data && (
        <Formik
          validationSchema={validationSchema}
          initialValues={{
            name: data?.name,
            phone: data?.phone,
            confirm_phone: '',
            email: data?.email,
          }}
          onSubmit={(values, actions) => {
            actions.setSubmitting(true);
            handleUpdateProfile(values);
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
          }) => (
            <>
              <View style={style.inputWrapper}>
                <TextInput
                  mode="outlined"
                  label={updateProfileLabelGrp.nameLabel}
                  style={style.whiteBg}
                  placeholder={updateProfileLabelGrp.nameLabel}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                />
                {errors.name && (
                  <Text style={style.errorMsg}>{errors.name}</Text>
                )}
              </View>
              <View style={style.inputWrapper}>
                <TextInput
                  mode="outlined"
                  label={updateProfileLabelGrp.emailLabel}
                  style={style.whiteBg}
                  placeholder={updateProfileLabelGrp.emailLabel}
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
                  label={updateProfileLabelGrp.phoneLabel}
                  style={style.whiteBg}
                  placeholder={updateProfileLabelGrp.phoneLabel}
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
                  label={updateProfileLabelGrp.confirmPhoneLabel}
                  style={style.whiteBg}
                  placeholder={updateProfileLabelGrp.confirmPhoneLabel}
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
                  {updateProfileLabelGrp.saveButtonLabel}
                </Button>
              </View>
            </>
          )}
        </Formik>
      )}
    </ScrollView>
  );
};
