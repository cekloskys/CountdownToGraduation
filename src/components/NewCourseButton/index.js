import React from 'react';
import {TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';

const NewCourseButton = props => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
        accessibilityHint={"Create a new course"}
        accessibilityRole={"button"}
      style={styles.button}
      onPress={() => navigation.navigate('Search')}>
      <Ionicons name={'add'} size={30} color={'white'} />
    </TouchableOpacity>
  );
};

export default NewCourseButton;
