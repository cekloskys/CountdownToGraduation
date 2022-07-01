import React, { useEffect, useState } from 'react';
import { View, Text, SectionList } from 'react-native';
import styles from './styles';
import Course from '../../components/Course';
import NewCourseButton from '../../components/NewCourseButton';
import { useNavigation } from '@react-navigation/native';
import { openDatabase } from 'react-native-sqlite-storage';
import CourseSectionList from "../../components/SectionList";

const database = require('../../components/Handlers/database.js');

const tableName = 'courses';

const courseDB = openDatabase({ name: 'CourseList.db' });

const MinorScreen = props => {
  /*
  const [completeCourses, setCompleteCourses] = useState([]);
  const [inProgressCourses, setInProgressCourses] = useState([]);
  const [notCompleteCourses, setNotCompleteCourses] = useState([]);
  const [completeMajorCourses, setCompleteMajorCourses] = useState([]);
  const [inProgressMajorCourses, setInProgressMajorCourses] = useState([]);
  const [notCompleteMajorCourses, setNotCompleteMajorCourses] = useState([]);

  const getStatusCourses = (status) => {
    courseDB.transaction(txn => {
      txn.executeSql(
        `SELECT * FROM ${tableName} WHERE status IN ('${status}') AND designator IN ('1st Minor', '2nd Minor')`,
        [],
        (sqlTxn, res) => {
          console.log("Courses retrieved successfully");
          let len = res.rows.length;
          // console.warn(len)
          if (len >= 0) {
            let results = [];
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              results.push({ id: item.id, code: item.code, name: item.name, credits: item.credits, semester: item.semester, status: item.status, designator: item.designator, relatedcode: item.relatedcode, cnt: item.cnt });
              // console.log(results[i])
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

  const getStatusMajorCourses = (status) => {
    courseDB.transaction(txn => {
      txn.executeSql(
          `SELECT * FROM ${tableName} WHERE status IN ('${status}') AND designator IN ('2nd Major', '1st Major')`,
          [],
          (sqlTxn, res) => {
            console.log("Courses retrieved successfully");
            let len = res.rows.length;
            // console.warn(len)
            if (len >= 0) {
              let results = [];
              for (let i = 0; i < len; i++) {
                let item = res.rows.item(i);
                results.push({ id: item.id, code: item.code, name: item.name, credits: item.credits, semester: item.semester, status: item.status, designator: item.designator, relatedcode: item.relatedcode, cnt: item.cnt });
                // console.log(results[i])
              }
              if (status == "Complete") {
                setCompleteMajorCourses(results);
              }
              else if (status == "In Progress") {
                setInProgressMajorCourses(results);
              }
              else {
                setNotCompleteMajorCourses(results);
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

  const navigation = useNavigation();

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getStatusCourses("Complete");
      getStatusCourses("In Progress");
      getStatusCourses("Not Complete");
      getStatusMajorCourses("Complete");
      getStatusMajorCourses("In Progress");
      getStatusMajorCourses("Not Complete");
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(async () => {
    await getStatusCourses("Complete");
    await getStatusCourses("In Progress");
    await getStatusCourses("Not Complete");
    await getStatusMajorCourses("Complete");
    await getStatusMajorCourses("In Progress");
    await getStatusMajorCourses("Not Complete");
  }, []);

  var complete = 0;
  var inProgress = 0;
  var notComplete = 0;

  for (var i = 0; i < completeCourses.length; i++) {
    if (completeCourses[i].cnt === 1) {
      complete += completeCourses[i].credits;
    } else {
      for (var j = 0; j < completeMajorCourses.length; j++) {
        if (completeCourses[i].code === completeMajorCourses[j].code){
          complete += completeCourses[i].credits;
          break;
        }
      }
    }
  }
  for (var i = 0; i < inProgressCourses.length; i++) {
    if (inProgressCourses[i].cnt === 1) {
      inProgress += inProgressCourses[i].credits;
    } else {
      for (var j = 0; j < inProgressMajorCourses.length; j++) {
        if (inProgressCourses[i].code === inProgressMajorCourses[j].code){
          inProgress += inProgressCourses[i].credits;
          break;
        }
      }
    }
  }
  for (var i = 0; i < notCompleteCourses.length; i++) {
    if (notCompleteCourses[i].cnt === 1) {
      notComplete += notCompleteCourses[i].credits;
    } else {
      for (var j = 0; j < notCompleteMajorCourses.length; j++) {
        if (notCompleteCourses[i].code === notCompleteMajorCourses[j].code){
          notComplete += notCompleteCourses[i].credits;
          break;
        }
      }
    }
  }
*/
  return (
    <View>
      <CourseSectionList designator={['1st Minor' , '2nd Minor']}/>
      <NewCourseButton />
    </View>
  );
};
export default MinorScreen;
