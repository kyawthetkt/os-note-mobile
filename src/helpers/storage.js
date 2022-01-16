import EncryptedStorage from 'react-native-encrypted-storage';

export const storeUser = async ({token}) => {
  try {
    await EncryptedStorage.setItem(
      'user_session',
      JSON.stringify({
        token,
      }),
    );
    return true;
  } catch (error) {
    // There was an error on the native side
  }
};

export const retrieveUser = async () => {
  try {
    const session = await EncryptedStorage.getItem('user_session');
    if (session !== undefined) {
      if (session) {
        return JSON.parse(session);
      }
    }
    return null;
  } catch (error) {
    // There was an error on the native side
  }
};

export const removeUser = async () => {
  try {
    await EncryptedStorage.removeItem('user_session');
    // Congrats! You've just removed your first value!
    return true;
  } catch (error) {
    // There was an error on the native side
    return false;
  }
};

export const getToken = async () => {
  const info = await retrieveUser();
  if (info?.token) {
    return info?.token;
  }
};
