import { StyleSheet, Dimensions, StatusBar } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  header: {
    marginTop: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    flex: 1,
    position: 'absolute',
  },
  title: {
    fontSize: 45,
    fontWeight: 'bold',
    position: 'absolute',
    top: 0,
    color: 'white',
    width: '100%',
    textAlign: 'center',
  },
  school: {
    fontSize: 25,
    fontWeight: 'bold',
    position: 'absolute',
    color: 'white',
    width: '100%',
    textAlign: 'center',
  },
  countdown: {
    fontSize: 20,
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 80,
    color: 'white',
    width: '100%',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  bottomContainer: {
    width: '100%',
    height: 60,
    position: 'absolute',
    bottom: 30,
  },
  searchButton: {
    backgroundColor: 'white',
    margin: 2,
    height: 50,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    zIndex: 100,
    width: Dimensions.get('screen').width - 20,
    marginHorizontal: 10,
  },
  searchButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;
