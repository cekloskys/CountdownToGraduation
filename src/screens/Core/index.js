import React, { useEffect, useState } from "react";
import { View, Text, SectionList, FlatList } from 'react-native';
import styles from './styles';
import Course from '../../components/Course';
import NewCourseButton from '../../components/NewCourseButton';
import { useNavigation } from '@react-navigation/native';
import { openDatabase } from 'react-native-sqlite-storage';
import CourseSectionList from "../../components/SectionList";


const database = require('../../components/Handlers/database.js');

const tableName = 'courses';

const courseDB = openDatabase({ name: 'CourseList.db' });

const CoreScreen = props => {
  return (
    <View>
      <CourseSectionList designator={["Core"]}/>
      <NewCourseButton />
    </View>
  );
};

export default CoreScreen;
