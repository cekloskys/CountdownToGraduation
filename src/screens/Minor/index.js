import React from 'react';
import { View } from 'react-native';
import NewCourseButton from '../../components/NewCourseButton';
import { openDatabase } from 'react-native-sqlite-storage';
import CourseSectionListMajor from "../../components/SectionListMajor";

const database = require('../../components/Handlers/database.js');

const tableName = 'courses';

const courseDB = openDatabase({ name: 'CourseList.db' });

const MinorScreen = props => {
  return (
    <View>
      <CourseSectionListMajor designator={['1st Minor' , '2nd Minor']}/>
      <NewCourseButton />
    </View>
  );
};
export default MinorScreen;
