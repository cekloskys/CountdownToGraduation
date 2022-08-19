import React from "react";
import { View } from 'react-native';
import NewCourseButton from '../../components/NewCourseButton';
import { openDatabase } from 'react-native-sqlite-storage';
import CourseSectionListMajor from "../../components/SectionListMajor";


const database = require('../../components/Handlers/database.js');

const tableName = 'courses';

const courseDB = openDatabase({ name: 'CourseList.db' });

const CoreScreen = props => {
  return (
    <View>
      <CourseSectionListMajor designator={["Core"]}/>
      <NewCourseButton />
    </View>
  );
};

export default CoreScreen;
