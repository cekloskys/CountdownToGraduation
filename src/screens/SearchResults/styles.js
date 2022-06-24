import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  completeContainer: {
    width: '100%',
    height: 36,
    backgroundColor: 'lightgrey',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  text: {
    justifyContent: 'center',
  },
  filterButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  searchButton: {
    backgroundColor: 'red',
    height: 50,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  searchButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default styles;
