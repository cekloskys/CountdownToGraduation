import React, { useEffect, useState } from "react";
import { View, Text, SectionList, FlatList } from 'react-native';
import styles from './styles';
import Course from '../../components/Course';
import NewCourseButton from '../../components/NewCourseButton';
import { useNavigation } from '@react-navigation/native';
import { openDatabase } from 'react-native-sqlite-storage';
import CourseSectionList from "../../components/SectionList";
import {useQuery, gql} from '@apollo/client';
import 'localstorage-polyfill';

const MY_COURSES_BY = gql`
  query CoursesBy(
    $divisionCodes: [String]
    $courseCode: String
    $courseTitle: String
  ) {
    coursesBy(
      divisionCodes: $divisionCodes
      courseCode: $courseCode
      courseTitle: $courseTitle
    ) {
      divisionCode
      courseCode
      courseTitle
      credits
      creditTypeCode
    }
  }
`;

const AllScreen = props => {

  const {_, __, ___} = useQuery(MY_COURSES_BY, {
    variables: {divisionCodes: []},
    fetchPolicy: 'network-only',
    errorPolicy: 'ignore'
  });

  return (
    <View >
<CourseSectionList designator={["All"]}/>
      <NewCourseButton />
    </View>
  );
};

export default AllScreen;
