import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  newCourseContainer: {
    top: 10,
    padding: 15,
    width: '100%',
    height: '100%',
  },
  codeInput: {
    fontSize: 16,
    marginBottom: 15,
    borderBottomWidth: 1.0,
    color: 'black',
    borderColor: 'lightgrey',
  },
  multiOptionContainerStyle: {
    backgroundColor: 'red',
  },
  multiOptionsLabelStyle: {
    fontSize: 16,
  },
  labelStyle: {
    fontSize: 16,
  },
  containerStyle: {
    marginBottom: 5,
  },
  outerSmall: {
    height: '60%',
    width: '100%',
    backgroundColor: 'blue',
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
