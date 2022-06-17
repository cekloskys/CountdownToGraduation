import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  completeContainer: {
    width: '100%',
    height: 36,
    backgroundColor: 'lightgrey',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  text:{
    justifyContent: 'center'
  },
  
  filterButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  customCourseButton: {
    backgroundColor: 'red',
    position: 'relative',
    width: '20%',
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    alignSelf: 'center'
  },
  customCourseButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'center',
  },
  
});

export default styles;
