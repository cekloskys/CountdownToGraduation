import React, {useEffect, useState} from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import type {Float} from "react-native/Libraries/Types/CodegenTypes";

interface ResultsProps {
  course: {
    divisionCode: string;
    courseCode: string;
    courseTitle: string;
    credits: Float;
    creditTypeCode: string;
  }
}

const SearchCourse = ({course}: ResultsProps) => {
  const [divisionCode, setDivisionCode] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [courseTitle, setTitle] = useState('');
  const [credits, setCredits] = useState(0);
  const [creditTypeCode, setCreditTypeCode] = useState('');

  useEffect(() => {
    if (!course) {return}
    setDivisionCode(course.divisionCode);
    setCourseCode(course.courseCode);
    setTitle(course.courseTitle);
    setCredits(course.credits);
    setCreditTypeCode(course.creditTypeCode);
  }, [course]);
  const navigation = useNavigation();
  const onPress = () => {
    const post = {
      courseCode,
      courseTitle,
      credits,
      creditTypeCode,
    };
    navigation.navigate('New Course', { post: post });
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.touchable} onPress={onPress}>
        <View style={{ flex: 2 }}>
          <Text style={styles.code}>{courseCode}</Text>
          <Text numberOfLines={1} style={styles.name}>
            {courseTitle.length < 28
              ? `${courseTitle}`
              : `${courseTitle.substring(0, 28)}...`}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.credits}>{credits} cr.</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SearchCourse;
