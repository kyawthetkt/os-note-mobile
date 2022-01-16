import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getItem() {
  const value = await AsyncStorage.getItem('user');
  return value ? JSON.parse(value) : null;
}
export async function setItem(value) {
  return AsyncStorage.setItem('user', JSON.stringify(value));
}
export async function removeItem() {
  return AsyncStorage.removeItem('user');
}
