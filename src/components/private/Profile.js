import React, {useState, useCallback} from 'react';
import {ScrollView, View, Text, RefreshControl, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FAB, Portal, Provider} from 'react-native-paper';
import Error from '@helper/error';
import Loader from '@helper/loader';
import {useDispatch} from 'react-redux';
import {setAuthUser} from '@store/auth';
import {useProfileQuery} from '@service/profile';
import {useLogoutMutation} from '@service/auth';
import {profileViewLabel, utilLabelGrp, profileLabel} from '@label';
import style from '@style/private.profile';

export default () => {
  const [counter, setCounter] = useState(0);
  const {data, isError, isFetching} = useProfileQuery({counter});
  const dispatch = useDispatch();
  const [state, setState] = useState({open: false});
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);

  const onStateChange = ({open}) => setState({open});
  const {open} = state;
  const navigation = useNavigation();
  const [logout] = useLogoutMutation();

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setCounter(prev => prev + 1);
    setRefreshing(false);
  }, []);

  const handleLogout = async () => {
    setIsLogoutLoading(prev => !prev);
    const {data: logoutData, error} = await logout();

    if (logoutData?.status === 'success') {
      dispatch(setAuthUser({name: null, token: null}));
    }

    if (logoutData?.status === 'error' || error) {
      Alert.alert(logoutData?.status ? logoutData?.msg : error?.data?.error);
      setIsLogoutLoading(false);
    }
  };

  return (
    <Provider>
      <Portal>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={style.container}>
          {isError && <Error msg={utilLabelGrp.isError} />}
          {isFetching && <Loader msg={utilLabelGrp.isFetching} />}
          {isLogoutLoading && <Loader msg={utilLabelGrp.isLogoutLoading} />}
          <View style={[style.itemsWrapper]}>
            <View style={style.itemWrapper}>
              <Text style={style.labelIndex}>{profileViewLabel.nameLabel}</Text>
              <Text style={style.labelValue}>{data?.name}</Text>
            </View>
            <View style={style.itemWrapper}>
              <Text style={style.labelIndex}>
                {profileViewLabel.emailLabel}
              </Text>
              <Text style={style.labelValue}>{data?.phone}</Text>
            </View>
            <View style={style.itemWrapper}>
              <Text style={style.labelIndex}>
                {profileViewLabel.phoneLabel}
              </Text>
              <Text style={style.labelValue}>{data?.email}</Text>
            </View>
          </View>
        </ScrollView>
        <FAB.Group
          open={open}
          style={style.fabDesign}
          icon={open ? 'close' : 'plus'}
          actions={[
            {
              icon: 'form-textbox-password',
              label: profileLabel.changePasswordLabel,
              onPress: () => {
                navigation.navigate('UpdatePasswordScreen');
              },
            },
            {
              icon: 'account-cog-outline',
              label: profileLabel.changeProfileLabel,
              onPress: () => {
                navigation.navigate('UpdateProfileScreen');
              },
            },
            {
              icon: 'account-lock',
              label: profileLabel.logoutLabel,
              onPress: () => {
                handleLogout();
              },
            },
          ]}
          onStateChange={onStateChange}
          // onPress={() => {
          //   if (open) {
          //     // do something if the speed dial is open
          //   }
          // }}
        />
      </Portal>
    </Provider>
  );
};
