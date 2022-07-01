import React, { useEffect, useState } from "react";
import { View, Text, SectionList, FlatList } from 'react-native';
import styles from './styles';
import Course from '../../components/Course';
import NewCourseButton from '../../components/NewCourseButton';
import { useNavigation } from '@react-navigation/native';
import { openDatabase } from 'react-native-sqlite-storage';
import CourseSectionList from "../../components/SectionList";



const tableName = 'courses';

const courseDB = openDatabase({ name: 'CourseList.db' });



const AllScreen = props => {
  /*const [completeCourses, setCompleteCourses] = useState([]);
  const [inProgressCourses, setInProgressCourses] = useState([]);
  const [notCompleteCourses, setNotCompleteCourses] = useState([]);

  const navigation = useNavigation();

  const getStatusCourses = (status) => {
    courseDB.transaction(txn => {
      txn.executeSql(
        `SELECT * FROM ${tableName} WHERE status IN ('${status}')`,
        [],
        (sqlTxn, res) => {
          console.log("Courses retrieved successfully");
          let len = res.rows.length;
          // console.warn(len)
          if (len >= 0) {
            let results = [];
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              console.log("testing" + item);
              results.push({ id: item.id, code: item.code, name: item.name, credits: item.credits, semester: item.semester, status: item.status, designator: item.designator, relatedcode: item.relatedcode, grade: item.grade, cnt: item.cnt });
               console.log(results[i])
            }
            if (status == "Complete") {
              setCompleteCourses(results);
            }
            else if (status == "In Progress") {
              setInProgressCourses(results);
            }
            else {
              setNotCompleteCourses(results);
            }

            // console.warn('[DATA]', results[0])
          }
        },
        error => {
          console.log("error on getting courses " + error.message);
        },
      );
    });
  }
  React.useEffect(async () => {
    const unsubscribe = navigation.addListener('focus', () => {
      getStatusCourses("Complete");
      getStatusCourses("In Progress");
      getStatusCourses("Not Complete");
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(async () => {
    await getStatusCourses("Complete");
    await getStatusCourses("In Progress");
    await getStatusCourses("Not Complete");
  }, []);

  var complete = 0;
  var inProgress = 0;
  var notComplete = 0;
  var gpa = 0.0;
  for (var i = 0; i < completeCourses.length; i++) {
    if (completeCourses[i].cnt === 1) {
      complete += completeCourses[i].credits;
    }
    switch (completeCourses[i].grade) {
      case "A+":
        gpa += 4.0;
        break;

      case "A":
        gpa += 4.0;
        break;

      case "A-":
        gpa += 3.67;
        break;

      case "B+":
        gpa += 3.33;
        break;

      case "B":
        gpa += 3.0;
        break;

      case "B-":
        gpa += 2.67;
        break;

      case "C+":
        gpa += 2.33;
        break;

      case "C":
        gpa += 2.0;
        break;

      case "C-":
        gpa += 1.67;
        break;

      case "D+":
        gpa += 1.33;
        break;

      case "D":
        gpa += 1.0;
        break;

      case "D-":
        gpa += 0.67;
        break;

      case "F":
        gpa += 0.0;

    }
    gpa /= completeCourses.length;
    gpa = Math.round(gpa * 100) / 100;
  }

  console.log(complete);
  for (var i = 0; i < inProgressCourses.length; i++) {
    if (inProgressCourses[i].cnt === 1) {
      inProgress += inProgressCourses[i].credits;
    }
  }
  for (var i = 0; i < notCompleteCourses.length; i++) {
    if (notCompleteCourses[i].cnt === 1) {
      notComplete += notCompleteCourses[i].credits;
    }
  }*/
  return (
    <View >
<CourseSectionList designator={["All"]}/>
      <NewCourseButton />
    </View>
  );
};

export default AllScreen;
