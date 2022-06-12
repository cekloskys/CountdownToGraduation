import React, { useState, useEffect } from "react";
import {View, FlatList, Alert } from 'react-native';
import styles from './styles';
import NewCourseButton from '../../components/NewCourseButton';
import { useNavigation } from '@react-navigation/native';
import SearchCourse from "../../components/SearchCourse";
import { useQuery, gql } from "@apollo/client";
import { useRoute } from '@react-navigation/native';

const MY_COURSES = gql`
query getCourses {
  getCourses {
    divisionCode
    courseCode
    courseTitle
    credits
  }
}
`;

const MY_COURSES_BY_CODE = gql`
query getCoursesByCode ($courseCode: String!) {
  getCoursesByCode (courseCode: $courseCode) {
    divisionCode
    courseCode
    courseTitle
    credits
    creditTypeCode
  }
}
`;

const MY_COURSES_BY_DIVISION_CODES = gql`
query getCoursesByDivisionCodes ($divisionCodes: [String!]) {
  getCoursesByDivisionCodes (divisionCodes: $divisionCodes) {
    divisionCode
    courseCode
    courseTitle
    credits
    creditTypeCode
  }
}
`;

const SearchResultsScreen = props => {

  const route = useRoute();
  const courseCode = route.params.courseCode;
  const divisionCodes = route.params.divisionCodes;
  const [codes, setCodes] = useState([]);

  divisionCodes.forEach( item => {
    codes.push(item.item);
  });

  // console.log(codes);

  const [results, setResults] = useState([]);

  // const {data, error, loading} = useQuery(MY_COURSES);
  // const {data, error, loading} = useQuery(MY_COURSES_BY_CODE, {variables: {courseCode}});
  const {data, error, loading} = useQuery(MY_COURSES_BY_DIVISION_CODES, {variables: {divisionCodes: codes}});

  useEffect(() => {
    if (error) {
      Alert.alert('Error fetching courses!', error.message);
    }
  }, [error]);

  useEffect(() => {
    // console.log('Testing');
    if (data) {
      console.log(data);
      setResults(data.getCoursesByDivisionCodes);
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

export default SearchResultsScreen;
