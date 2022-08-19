import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';

const NewCourseButton = props => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
        accessibilityHint={"Search for a Course"}
        accessibilityRole={"button"}
      style={styles.button}
      onPress={() => navigation.navigate('Search')}>
      {/*<Ionicons name={'add'} size={30} color={'white'} />*/}
        <Text style={{fontWeight: 'bold', fontSize: 12, color: 'white'}}>
            Search
        </Text>
    </TouchableOpacity>
  );
};

export default NewCourseButton;
