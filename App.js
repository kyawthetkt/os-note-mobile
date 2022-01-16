import React, {useState, useEffect} from 'react';
// import {SafeAreaView} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import PrivateTab from '@navigation/private.tab';
import PublicTab from '@navigation/public.tab';
import {Provider} from 'react-redux';
import {useDispatch} from 'react-redux';
import {getItem as getToken} from '@store/storage';
import {selectCurrentUser} from '@store/auth';
import {store} from '@store';
import {setAuthUser} from '@store/auth';
import {useSelector} from 'react-redux';

export const App = () => {
  const dispatch = useDispatch();
  const [token, setToken] = useState(null);
  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    const authUser = async () => {
      try {
        const authObj = await getToken();
        if (authObj) {
          setToken(authObj.token);
          if (user.name == null) {
            dispatch(setAuthUser({name: authObj.name, token: authObj.token}));
          }
        } else {
          setToken(null);
        }
      } catch (error) {
        setToken(null);
      }
    };
    authUser();
  }, [user.name, dispatch]);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {token ? <PrivateTab /> : <PublicTab />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
