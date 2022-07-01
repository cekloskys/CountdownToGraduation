import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
  },
  button: {
    backgroundColor: 'red',
    borderRadius: 30,
  },
  buttonText: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  searchButton: {
    backgroundColor: 'red',
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    right: 20,
  },
  searchButtonUpdate: {
    backgroundColor: 'red',
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    right: 80,
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  gradeButton: {
    backgroundColor: 'red',
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    right: 140,
  },
  gradeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  bottomContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    height: 50,
    position: 'absolute',
    bottom: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 210,
    left: 150,
  },
  newCourseContainer: {
    top: 10,
    padding: 15,
    width: '100%',
  },
  codeInput: {
    fontSize: 16,
    marginBottom: 15,
    borderBottomWidth: 1.0,
    color: 'black',
    borderColor: 'lightgrey',
  },
  nameInput: {
    fontSize: 16,
    marginBottom: 15,
    borderBottomWidth: 1.0,
    color: 'black',
    borderColor: 'lightgrey',
  },
  semesterInput: {
    fontSize: 16,
    marginBottom: 10,
    borderBottomWidth: 1.0,
    color: 'black',
    borderColor: 'lightgrey',
  },
  creditsInput: {
    fontSize: 18,
    borderBottomWidth: 1.0,
    borderColor: 'lightgrey',
    marginBottom: 20,
  },
  dropDownButton: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    marginBottom: 20,
    borderColor: 'lightgrey',
    borderWidth: 1.0,
  },
  dropDownButtonText: {
    textAlign: 'left',
    fontSize: 18,
  },
  dropDownStyle: {},
  dropDownRowStyle: {
    borderBottomColor: '#C5C5C5',
  },
  dropDownRowTextStyle: {
    textAlign: 'left',
    fontSize: 16,
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
  textSpacer: {
    marginBottom: 40
  },
  outerBig: {
    height: '84%',
  },
  outerSmall: {
    height: '66%',
  },
});

export default styles;
