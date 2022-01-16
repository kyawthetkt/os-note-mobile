import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    padding: 0,
    marginBottom: 50,
    backgroundColor: '#FFFFFF',
    flex: 1,
    // flexDirection: 'column'
  },
  counterWrapper: {
    backgroundColor: '#F0F0F0',
    flex: 1,
    height: 'auto',
    margin: 10,
    // borderRadius: 10,
    // elevation: 10,
    // shadowColor: '#448981',
    paddingVertical: 35,
    paddingHorizontal: 10,
  },
  counterIndex: {
    color: '#2c69cc',
    fontSize: 23,
    alignSelf: 'center',
  },
  counterValue: {
    color: '#2c69cc',
    fontSize: 19,
    marginTop: 10,
    alignSelf: 'center',
  },
});
