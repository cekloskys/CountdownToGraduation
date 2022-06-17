import React, { useState, useEffect } from "react";
import {Text, View, FlatList, Alert, Pressable } from 'react-native';
import styles from './styles';
import NewCourseButton from '../../components/NewCourseButton';
import { useNavigation } from '@react-navigation/native';
import SearchCourse from "../../components/SearchCourse";
import { useQuery, gql } from "@apollo/client";
import { useRoute } from '@react-navigation/native';
import 'localstorage-polyfill'; 

const MY_COURSES = gql`
query getCourses {
  courses {
    divisionCode
    courseCode
    courseTitle
    credits
  }
}
`;

const MY_COURSES_BY_CODE = gql`
query getCoursesByCode($courseCode: String) {
  courseByCode(courseCode: $courseCode) {
    divisionCode
    courseCode
    courseTitle
    credits
    creditTypeCode
  }
}
`;

const MY_COURSES_BY_DIVISION_CODES = gql`
query CourseByDivision($divisionCodes: [String]) {
  courseByDivision(divisionCodes: $divisionCodes) {
    divisionCode
    courseCode
    courseTitle
    credits
  }
}
`;

const MY_COURSES_BY = gql`
query CoursesBy($divisionCodes: [String], $courseCode: String, $courseTitle: String) {
  coursesBy(divisionCodes: $divisionCodes, courseCode: $courseCode, courseTitle: $courseTitle) {
    divisionCode
    courseCode
    courseTitle
    credits
    creditTypeCode
  }
}
`;

function SearchResults() {

  // const route = useRoute();
  // const courseCode = route.params.courseCode;
  // const divisionCodes = route.params.divisionCodes;
  // const courseTitle = route.params.courseTitle

  const navigation = useNavigation();


  const divisionCodes = JSON.parse(localStorage.getItem('division'))
  const courseCode = localStorage.getItem('code')
  const courseTitle = localStorage.getItem('title')
  
  console.log(divisionCodes);
  console.log(courseCode);
  console.log(courseTitle);

  
  const addCustomCourse = () => {
    const post = {
      courseCode: '',
      courseTitle: '',
      credits: '',
    };
    navigation.navigate('New Course', {post: post});
  };

  const [results, setResults] = useState([]);

  // const {data, error, loading} = useQuery(MY_COURSES);
  // const {data, error, loading} = useQuery(MY_COURSES_BY_CODE, {variables: {courseCode}});
  const {data, error, loading} = useQuery(MY_COURSES_BY, {variables: {divisionCodes: divisionCodes, courseCode: courseCode, courseTitle: courseTitle}});
  //console.log(data);
  useEffect(() => {
    if (error) {
      console.log(error.stack);
      Alert.alert('Error fetching courses!', error.message);
    }
  }, [error]);

  useEffect(() => {
    //  console.log('Testing');
    console.log(data);
    if (data) {    
      setResults(data.coursesBy);
    }
  }, [data]);

  return (
    <View>
      <FlatList
        data={results}
        renderItem={({item}) => <SearchCourse course={item}/>}
        style={styles.outer}
      />
      <Text style={styles.customCourseButtonText}>Dont See The Course Your Looking For Add Your Own</Text>
      <Pressable style={styles.customCourseButton} onPress={addCustomCourse}>
        <Text style={styles.filterButtonText}>Custom Course</Text>
      </Pressable>
    </View>
  )
  
};
function SearchResultsScreen() {

  const route = useRoute();
  const courseCode = route.params.courseCode;
  const divisionCodes = route.params.divisionCodes;
  
  console.log(divisionCodes);
  console.log(courseCode);

  const [results, setResults] = useState([]);

  // const {data, error, loading} = useQuery(MY_COURSES);
  // const {data, error, loading} = useQuery(MY_COURSES_BY_CODE, {variables: {courseCode}});
  const {data, error, loading} = useQuery(MY_COURSES_BY, {variables: {divisionCodes: divisionCodes, courseCode: courseCode}});

  useEffect(() => {
    if (error) {
      Alert.alert('Error fetching courses!', error.message);
    }
  }, [error]);

  useEffect(() => {
    // console.log('Testing');
    if (data) {
      console.log(data);
      setResults(data.coursesBy);
    }
  }, [data]);

  const navigation = useNavigation();

  return (
    <View>
      <View>
        <FlatList
            data={results}
            renderItem={({item}) => <SearchCourse course={item}/>}
            style={styles.outer}
        />
      </View>
      <NewCourseButton />
    </View>
  );
};

export default SearchResults;