import React, { useEffect, useState } from "react";
import { View, Text, ImageBackground, Pressable, SafeAreaView } from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { openDatabase } from 'react-native-sqlite-storage';

const database = require('../../components/Handlers/database.js');

const tableName = 'courses';

const courseDB = openDatabase({ name: 'CourseList.db' });

const HomeScreen = props => {
  const [allCourses, setAllCourses] = useState([]);

  const getAllCourses = () => {
    courseDB.transaction(txn => {
      txn.executeSql(
        `SELECT * FROM ${tableName} WHERE status IN ('Complete')`,
        [],
        (sqlTxn, res) => {
          console.log("Courses retrieved successfully");
          let len = res.rows.length;
          // console.warn(len)
          if (len >= 0) {
            let results = [];
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              results.push({ id: item.id, code: item.code, name: item.name, credits: item.credits, semester: item.semester, status: item.status, designator: item.designator, cnt: item.cnt });
              // console.log(results[i])
            }
            setAllCourses(results);

            // console.warn('[DATA]', results[0])
          }
        },
        error => {
          console.log("error on getting courses " + error.message);
        },
      );
    });
  }
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getAllCourses();
    });
    return unsubscribe;
  }, [navigation]);

  let credits = 0;
  for (let i = 0; i < allCourses.length; i++) {
      if (allCourses[i].cnt === 1) {
          credits += allCourses[i].credits;
      }
  }

  useEffect(async () => {
    await getAllCourses();
  }, []);

  const navigation = useNavigation();
  return (
    <View style={styles.container}>


      <ImageBackground
        source={require('../../../assets/images/griffin_background_small.jpg')}
        style={styles.image}>
      </ImageBackground>
      <SafeAreaView style={{ flex: 0.0 }}></SafeAreaView>
      <View style={styles.header}>
        <Text style={styles.title}>Countdown to Graduation
          <Text style={styles.school}>{"\n"}Chestnut Hill College</Text></Text>

      </View>
      {/* Button */}
      <View style={styles.bottomContainer}>
        <Text style={styles.countdown}>{(credits > 120) ? 0 : 120 - credits} credits until my graduation.</Text>
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
  );
};

export default HomeScreen;
