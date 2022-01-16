import {useEffect, useState} from 'react';
import {getToken, storeUser, removeUser} from '@helper/storage';

export default () => {
  const [authenticated, setAuthenticated] = useState(false);

  const logout = async () => {
    await removeUser();
    setAuthenticated(false);
  };

  const login = async ({token}) => {
    const done = await storeUser({token});
    if (done) {
      setAuthenticated(true);
    }
  };

  useEffect(() => {
    const getSesion = async () => {
      const token = await getToken();
      console.log(token);
      if (token) {
        setAuthenticated(true);
      }
    };
    getSesion();
  }, []);

  return {
    authenticated,
    login,
    logout,
  };
};
