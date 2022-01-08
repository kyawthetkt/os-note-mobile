import React, { useState } from 'react';
import {ScrollView, View, Text } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FAB, Portal, Provider} from 'react-native-paper';
import style from '@style/private.profile';

export default () => {
  const [state, setState] = useState({open: false});
  const onStateChange = ({open}) => setState({open});
  const {open} = state;

  const navigation = useNavigation();
  const name = 'Kyaw Thet';
  const phone = '0945444466';
  const email = 'Kyawthet@gmail.com';

  const profileLabel = {
    changePasswordLabel: 'Change Password',
    changeProfileLabel: 'Change Profile',
    logoutLabel: 'Logout',
  } 

  return (
    <Provider>
      <Portal>
        <ScrollView style={style.container}>
          <View style={[style.itemsWrapper]}>
            <View style={style.itemWrapper}>
              <Text style={style.labelIndex}>Name:</Text>
              <Text style={style.labelValue}>{name}</Text>
            </View>
            <View style={style.itemWrapper}>
              <Text style={style.labelIndex}>Phone:</Text>
              <Text style={style.labelValue}>{phone}</Text>
            </View>
            <View style={style.itemWrapper}>
              <Text style={style.labelIndex}>E-mail:</Text>
              <Text style={style.labelValue}>{email}</Text>
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
                navigation.navigate('UpdateProfileScreen');
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
