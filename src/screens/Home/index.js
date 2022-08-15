import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Pressable,
  SafeAreaView, Image, Alert,
} from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {openDatabase} from 'react-native-sqlite-storage';
import {useQuery, gql} from '@apollo/client';
import 'localstorage-polyfill';
import {ALERT_TYPE, Dialog, Root, Toast} from "react-native-alert-notification";

const GET_MINORS = gql`
  query Minors {
    minors {
      title
      required
      elective
      count
    }
  }
`;

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

const database = require('../../components/Handlers/database.js');

const tableName = 'courses';

const courseDB = openDatabase({name: 'CourseList.db'});

const HomeScreen = props => {

  const [minors, setMinors] = useState([]);

  const [allCourses, setAllCourses] = useState([]);

  const {data, __, ___} = useQuery(MY_COURSES_BY, {
    variables: {divisionCodes: []},
    fetchPolicy: 'network-only',
    errorPolicy: 'ignore'
  });
  // console.log(data);

  const getAllCourses = () => {
    courseDB.transaction(txn => {
      txn.executeSql(
        `SELECT * FROM ${tableName} WHERE status IN ('Complete')`,
        [],
        (sqlTxn, res) => {
          console.log('Courses retrieved successfully');
          let len = res.rows.length;
          // console.warn(len)
          if (len >= 0) {
            let results = [];
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              results.push({
                id: item.id,
                code: item.code,
                name: item.name,
                credits: item.credits,
                semester: item.semester,
                status: item.status,
                designator: item.designator,
                grade: item.grade,
                creditTypeCode: item.creditTypeCode,
                cnt: item.cnt,
              });
              // console.log(results[i])
            }
            setAllCourses(results);

            // console.warn('[DATA]', results[0])
          }
        },
        error => {
          console.log('error on getting courses ' + error.message);
        },
      );
    });
  };
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getAllCourses();
    });
    return unsubscribe;
  }, [navigation]);

  let credits = 0;
  for (let i = 0; i < allCourses.length; i++) {
    if (allCourses[i].cnt === 1 && allCourses[i].grade !=='F') {
      credits += allCourses[i].credits;
    }
  }

  useEffect(async () => {
    await getAllCourses();
  }, []);

  const navigation = useNavigation();

  //localStorage.setItem('apTransferNotificationDisplayed', 'false');
  var gpa = 0.00;
  var allCoursesCtr = 0;
  var complete = 0;

  for (var i = 0; i < allCourses.length; i++) {
    if (allCourses[i].cnt === 1 && allCourses[i].credits > 0) {
      if(allCourses[i].grade !=='F'){
        complete += allCourses[i].credits;
      }
      if(allCourses[i].grade !=='P'){
        allCoursesCtr++;
        switch (allCourses[i].grade ) {
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
    gpa /= allCoursesCtr;
    gpa = Math.round(gpa * 100) / 100;
  }

  const {data: minordata, error: minorerror, loading} = useQuery(GET_MINORS)

  useEffect(() => {
    if (minorerror) {
      console.log(minorerror.stack);
      Alert.alert('Error fetching Minors!', minorerror.message);
    }
  }, [minorerror]);

  useEffect(() => {
    if (minordata) {
      setMinors(minordata.minors);
    }
  }, [minordata]);



  var minorsUpdate = [];
  minors.forEach(minor => {
    minorsUpdate.push({
      title: minor.title,
      required: minor.required,
      count: minor.count
    });
  });

  minorsUpdate.forEach(item => {
    allCourses.forEach(course => {
      item.required.forEach(req => {
        if (req === course.code){
          item.count++;
        }
      });
    });
  });

  var storedMinors = [];

  minorsUpdate.forEach(item =>{
    if (item.count >= 3){
      if (storedMinors.indexOf(item.title) === -1) {
        storedMinors.push(item.title)
      }
    }
  });

console.log(storedMinors);

  const displayNotifications = () => {
    if (localStorage.getItem('apTransferNotificationDisplayed') == null) {
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Welcome',
        textBody: 'Don\'t forget to input your AP/Transfer courses please.',
        button: 'Close',
      });
      localStorage.setItem('apTransferNotificationDisplayed', 'true');
    }
    else {
      if (gpa !== 0 && gpa >= 3.0 && credits < 30 && storedMinors.length !== 0) {
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Congratulations!',
          textBody: 'Your GPA is at ' + gpa + '. Keep up the great work!',
          button: 'Close',
          onPressButton: () => {
            Dialog.show({
              type: ALERT_TYPE.SUCCESS,
              title: 'Reminder',
              textBody: 'You may want to consider the following minors '+ storedMinors + '.',
              button: 'Close',
            });
          },
        });
      } else if (gpa !== 0 && gpa >= 3.0 && credits < 30) {
          Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'Congratulations!',
            textBody: 'Your GPA is at ' + gpa + '. Keep up the great work!',
            button: 'Close',
          });
        }else if ((gpa >= 3.0 && credits >= 30 && credits < 60) && storedMinors.length !== 0) {
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Congratulations!',
          textBody: 'Your GPA is at ' + gpa + '. Keep up the great work!',
          button: 'Close',
          onPressButton: () => {
            Dialog.show({
              type: ALERT_TYPE.SUCCESS,
              title: 'You got this!',
              textBody: 'Congratulations you\'re a Sophomore.' + ' You may want to consider the following minors '+ storedMinors + '.',
              //autoClose: 3000,
              button: 'Close',
            });
          },
        });
      }else if (gpa >= 3.0 && credits >= 30 && credits < 60) {
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Congratulations!',
          textBody: 'Your GPA is at ' + gpa + '. Keep up the great work!',
          button: 'Close',
          onPressButton: () => {
            Dialog.show({
              type: ALERT_TYPE.SUCCESS,
              title: 'You got this!',
              textBody: 'Congratulations you\'re a Sophomore.',
              //autoClose: 3000,
              button: 'Close',
            });
          },
        });
      } else if ((gpa >= 3.0 && credits >= 60 && credits < 90) && storedMinors.length !== 0) {
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Congratulations!',
          textBody: 'Your GPA is at ' + gpa + '. Keep up the great work!',
          button: 'Close',
          onPressButton: () => {
            Dialog.show({
              type: ALERT_TYPE.SUCCESS,
              title: 'You got this!',
              textBody: 'Congratulations you\'re a Junior.'+ ' You may want to consider the following minors '+ storedMinors + '.',
              //autoClose: 3000,
              button: 'Close',
            });
          },
        });
      }else if (gpa >= 3.0 && credits >= 60 && credits < 90) {
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Congratulations!',
          textBody: 'Your GPA is at ' + gpa + '. Keep up the great work!',
          button: 'Close',
          onPressButton: () => {
            Dialog.show({
              type: ALERT_TYPE.SUCCESS,
              title: 'You got this!',
              textBody: 'CCongratulations you\'re a Junior.',
              //autoClose: 3000,
              button: 'Close',
            });
          },
        });
      } else if (gpa >= 3.0 && credits >= 90 && storedMinors.length !== 0) {
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Congratulations!',
          textBody: 'Your GPA is at ' + gpa + '. Keep up the great work!',
          button: 'close',
          onPressButton: () => {
            Dialog.show({
              type: ALERT_TYPE.SUCCESS,
              title: 'You got this!',
              textBody: 'Congratulations you\'re a Senior.'+ ' You may want to consider the following minors '+ storedMinors + '.',
              //autoClose: 3000,
              button: 'Close',
            });
          },
        });
      } else if (gpa >= 3.0 && credits >= 90) {
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Congratulations!',
          textBody: 'Your GPA is at ' + gpa + '. Keep up the great work!',
          button: 'close',
          onPressButton: () => {
            Dialog.show({
              type: ALERT_TYPE.SUCCESS,
              title: 'You got this!',
              textBody: 'Congratulations you\'re a Senior.',
              //autoClose: 3000,
              button: 'Close',
            });
          },
        });
      } else if (gpa !== 0 && gpa < 3.0 && credits < 30) {
        Dialog.show({
          type: ALERT_TYPE.WARNING,
          title: 'Careful!',
          textBody: 'Your gpa is ' + gpa + '. Please check in with your advisors.',
          button: 'Close',
        });
      } else if (gpa < 3.0 && credits >= 30 && credits < 60) {
        Dialog.show({
          type: ALERT_TYPE.WARNING,
          title: 'Careful!',
          textBody: 'Your gpa is ' + gpa + '. Please check in with your advisors.',
          button: 'Close',
          onPressButton: () => {
            Dialog.show({
              type: ALERT_TYPE.SUCCESS,
              title: 'You got this!',
              textBody: 'Congratulations you\'re a Sophomore.',
              //autoClose: 3000,
              button: 'Close',
            });
          },
        });
      } else if (gpa < 3.0 && credits >= 60 && credits < 90) {
        Dialog.show({
          type: ALERT_TYPE.WARNING,
          title: 'Careful!',
          textBody: 'Your gpa is ' + gpa + '. Please check in with your advisors.',
          button: 'Close',
          onPressButton: () => {
            Dialog.show({
              type: ALERT_TYPE.SUCCESS,
              title: 'You got this!',
              textBody: 'Congratulations you\'re a Junior.',
              //autoClose: 3000,
              button: 'Close',
            });
          },
        });
      } else if (gpa < 3.0 && credits >= 90) {
        Dialog.show({
          type: ALERT_TYPE.WARNING,
          title: 'Careful!',
          textBody: 'Your gpa is ' + gpa + '. Please check in with your advisors.',
          button: 'Close',
          onPressButton: () => {
            Dialog.show({
              type: ALERT_TYPE.SUCCESS,
              title: 'You got this!',
              textBody: 'Congratulations you\'re a Senior.',
              //autoClose: 3000,
              button: 'Close',
            });
          },
        });
      }
    }
  };
  return (
      <Root>
    <View style={styles.container}>
      <SafeAreaView style={{flex: 0.0}} />
      <View style={styles.header}>
        <Text style={styles.title}>
          Countdown to Graduation
          <Text style={styles.school}>{'\n'}Chestnut Hill College</Text>
        </Text>
      </View>
      <View style={styles.box}>
        <Pressable onPress={displayNotifications}>
          <Image
              source={require('../../../assets/images/griffin_new.png')}
          />
        </Pressable>
      </View>
      {/* Button */}
      <View style={styles.bottomContainer}>
        <Text style={styles.countdown}>
          {credits > 120 ? 0 : 120 - credits} credits until my graduation.
        </Text>
        <Pressable
            accessible={true}
            accessibilityRole={"button"}
          style={styles.searchButton}
          onPress={() => navigation.navigate('Get started!')}>
          <AntDesign name="user" size={25} color={'#f15454'} />
          <Text style={styles.searchButtonText}> Get started!</Text>
        </Pressable>
      </View>
    </View>
      </Root>
  );
};

export default HomeScreen;
