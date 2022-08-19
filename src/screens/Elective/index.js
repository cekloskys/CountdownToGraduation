import React from "react";
import { View } from 'react-native';
import NewCourseButton from '../../components/NewCourseButton';
import { openDatabase } from 'react-native-sqlite-storage';
import CourseSectionListMajor from "../../components/SectionListMajor";

const tableName = 'courses';

const courseDB = openDatabase({ name: 'CourseList.db' });

const ElectiveScreen = props => {

  return (
    <View>
      <CourseSectionListMajor designator={["Elective"]}/>
      <NewCourseButton />
    </View>
  );
};
export default ElectiveScreen;
