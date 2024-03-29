import React, { useEffect, useState } from "react";
import { View, Text, SectionList, FlatList } from 'react-native';
import styles from './styles';
import Course from '../../components/Course';
import { useNavigation } from '@react-navigation/native';
import { openDatabase } from 'react-native-sqlite-storage';

const tableName = 'courses';

const courseDB = openDatabase({ name: 'CourseList.db' });

const CourseSectionList = props => {
  const designator = props;
  const [completeCourses, setCompleteCourses] = useState([]);
  const [inProgressCourses, setInProgressCourses] = useState([]);
  const [notCompleteCourses, setNotCompleteCourses] = useState([]);


  const navigation = useNavigation();
  const getStatusCourses = (status) => {
     let query = '';
     if (designator.designator[0] === "All"){
       query = `SELECT * FROM ${tableName} WHERE status IN ('${status}')`;
     }else if (designator.designator[0] === "Core" || designator.designator[0] === "Elective"){
       query = `SELECT * FROM ${tableName} WHERE status IN ('${status}') AND designator IN ('${designator.designator[0]}')`;
     }else{
       query = `SELECT * FROM ${tableName} WHERE status IN ('${status}') AND designator IN ('${designator.designator[0]}','${designator.designator[1]}')`;
     }

    courseDB.transaction(txn => {
      txn.executeSql(
          query,
        [],
        (sqlTxn, res) => {
          let len = res.rows.length;
          // console.warn(len)
          if (len >= 0) {
            let results = [];
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              results.push({ id: item.id, code: item.code, name: item.name, credits: item.credits, semester: item.semester, status: item.status, designator: item.designator, relatedcode: item.relatedcode, grade: item.grade, creditTypeCode: item.creditTypeCode, cnt: item.cnt });
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
  var gpa = 0.00;
  var completeCoursesCtr = 0;

  for (var i = 0; i < completeCourses.length; i++) {
    if (completeCourses[i].cnt === 1 && completeCourses[i].credits > 0) {
      if(completeCourses[i].grade !=='F'){
      complete += completeCourses[i].credits;
      }
      if(completeCourses[i].grade !=='P'){
        completeCoursesCtr++;
        switch (completeCourses[i].grade ) {
          case "A":
            gpa += 4.0;
            break;
          case "A-":
            gpa += 3.70;
            break;
          case "B+":
            gpa += 3.33;
            break;
          case "B":
            gpa += 3.0;
            break;
          case "B-":
            gpa += 2.70;
            break;
          case "C+":
            gpa += 2.30;
            break;
          case "C":
            gpa += 2.00;
            break;
          case "C-":
            gpa += 1.70;
            break;
          case "D+":
            gpa += 1.30;
            break;
          case "D":
            gpa += 1.0;
            break;
          case "F":
            gpa += 0.0;
        }
    }}
  }
  if (gpa !== 0) {
    gpa /= completeCoursesCtr;
    gpa = Math.round(gpa * 100) / 100;
  }

  for (var i = 0; i < inProgressCourses.length; i++) {
    if (inProgressCourses[i].cnt === 1) {
      inProgress += inProgressCourses[i].credits;
    }
    inProgressCourses[i].grade='-';
  }
  for (var i = 0; i < notCompleteCourses.length; i++) {
    if (notCompleteCourses[i].cnt === 1) {
      notComplete += notCompleteCourses[i].credits;
    }
    notCompleteCourses[i].grade='-';
  }
  return (

      <View>
            <SectionList
                         style={styles.outer}
                         sections={[
                           {title: 'Complete ' +  complete + ' credits', data: completeCourses},
                           {title: 'In Progress ' + inProgress + ' credits', data: inProgressCourses},
                           {title: 'Not Complete ' + notComplete + ' credits', data: notCompleteCourses},
                         ]}
                         renderItem={({item}) => <Course post={item}/>}
                         renderSectionHeader={({section}) => (
                             <View style={styles.completeContainer}>
                               <View style={{width: '70%'}}>
                                 <Text style={{fontSize: 18, fontWeight: 'bold'}}>{section.title}</Text>
                               </View>
                               {section.title.includes('Complete') && !section.title.includes('Not') ?
                                   <View style={{width: '30%'}}>
                                     <Text style={{
                                       fontSize: 18,
                                       fontWeight: 'bold',
                                       textAlign: 'right',
                                       marginRight: 10
                                     }}>{'Gpa: ' + gpa}</Text>
                                   </View>
                                   :
                                   <Text></Text>
                               }

                             </View>
                         )}
                         keyExtractor={(item, index) => index}
            />
      </View>
  );
};

export default CourseSectionList;
