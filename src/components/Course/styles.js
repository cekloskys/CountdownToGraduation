import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  touchable: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
    paddingBottom: 5,
  },
  code: {
    fontSize: 18,
    marginLeft: 10,
    flex: 1,
    flexWrap: 'wrap',
    fontWeight: 'bold',
  },
  name: {
    fontSize: 18,
    marginLeft: 10,
    flex: 1,
    flexWrap: 'wrap',
  },
  designator: {
    fontSize: 14,
    marginLeft: 10,
    flex: 1,
    flexWrap: 'wrap',
    fontStyle: 'italic',
  },
  semester: {
    fontSize: 18,
    marginLeft: 10,
    flex: 1,
    flexWrap: 'wrap',
  },
  credits: {
    fontSize: 18,
    marginLeft: 10,
    flex: 1,
    flexWrap: 'wrap',
    color: 'red',
  },
});

export default styles;
