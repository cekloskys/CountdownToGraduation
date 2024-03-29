import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
} from 'react-native';
import SelectBox from 'react-native-multi-selectbox';
import {xorBy, sortBy} from 'lodash';
import styles from '../NewCourse/styles';
import {useNavigation} from '@react-navigation/native';
import {openDatabase} from "react-native-sqlite-storage";
const database = require('../../components/Handlers/database.js');
const courseDB = openDatabase({ name: 'CourseList.db' });
const tableName = 'courses';

const NewCourseScreen = props => {
  const post = props.route.params.post;

  const [code, setCode] = useState(post.courseCode);
  const [name, setName] = useState(post.courseTitle);
  const [credits, setCredits] = useState(post.credits);
  const [status, setStatus] = useState('');
  const [designator, setDesignator] = useState('');
  const [selectedDesignators, setSelectedDesignators] = useState([]);
  const [selectedGradeLetters, setSelectedGradeLetters] = useState([]);
  const [selectedPassFail, setSelectedPassFail] = useState([]);
  const [selectedGradeAndPassFail, setSelectedGradeAndPassFail] = useState([]);
  const [creditTypeCode, setCreditTypeCode] = useState(post.creditTypeCode);

  const statuses = [
    {
      id: '1',
      item: 'Complete',
    },
    {
      id: '2',
      item: 'In Progress',
    },
    {
      id: '3',
      item: 'Not Complete',
    },
  ];
  const designators = [
    {
      id: '1',
      item: '1st Major',
    },
    {
      id: '2',
      item: '2nd Major',
    },
    {
      id: '3',
      item: '1st Minor',
    },
    {
      id: '4',
      item: '2nd Minor',
    },
    {
      id: '5',
      item: 'Core',
    },
    {
      id: '6',
      item: 'Elective',
    },
  ];
  const gradeLetters = [
    {
      id: '1',
      item: 'A',
    },
    {
      id: '2',
      item: 'A-',
    },
    {
      id: '3',
      item: 'B+',
    },
    {
      id: '4',
      item: 'B',
    },
    {
      id: '5',
      item: 'B-',
    },
    {
      id: '6',
      item: 'C+',
    },
    {
      id: '7',
      item: 'C',
    },
    {
      id: '8',
      item: 'C-',
    },
    {
      id: '9',
      item: 'D+',
    },
    {
      id: '10',
      item: 'D',
    },
    {
      id: '11',
      item: 'F',
    },
  ];
  const passFail = [
    {
      id: '1',
      item: 'P',
    },
    {
      id: '2',
      item: 'F',
    },
  ];
  const gradeAndPassFail = [
    {
      id: '1',
      item: 'P',
    },
    {
      id: '2',
      item: 'A',
    },
    {
      id: '3',
      item: 'A-',
    },
    {
      id: '4',
      item: 'B+',
    },
    {
      id: '5',
      item: 'B',
    },
    {
      id: '6',
      item: 'B-',
    },
    {
      id: '7',
      item: 'C+',
    },
    {
      id: '8',
      item: 'C',
    },
    {
      id: '9',
      item: 'C-',
    },
    {
      id: '10',
      item: 'D+',
    },
    {
      id: '11',
      item: 'D',
    },
    {
      id: '12',
      item: 'F',
    },
  ];
  const navigation = useNavigation();

  const [len, setLen] = useState(0);
  const getCourses = (code) => {
    const query = `SELECT * FROM ${tableName} WHERE code IN ('${code}')`;
    courseDB.transaction(txn => {
      txn.executeSql(
          query,
          [],
          (sqlTxn, res) => {
            setLen(res.rows.length);
          },
          error => {
          },
      );
    });
  }

  React.useEffect(async () => {
    const unsubscribe = navigation.addListener('focus', () => {
      getCourses(code);
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(async () => {
    await getCourses(code);
  }, []);

  const onCourseAdd = () => {
    if (!code) {
      alert('Please enter a course code.');
      return;
    }
    if (!name) {
      alert('Please enter a course title.');
      return;
    }
    if (!credits) {
      alert('Please enter number of credits.');
      return;
    }
    if (!selectedDesignators || selectedDesignators.length === 0) {
      alert('Please select course designators.');
      return;
    }
    if (!status) {
      alert('Please select course status.');
      return;
    }
    if (status.item==="Complete") {
      if (creditTypeCode === "CR" &&
          (!selectedGradeLetters || selectedGradeLetters.length === 0)) {
        alert('Please select a grade.');
        return;
      } else if (creditTypeCode === "PF" && (!selectedPassFail || selectedPassFail.length === 0)) {
        alert('Please select a grade.');
        return;
      } else if (creditTypeCode !== "PF" && creditTypeCode !== "CR"
      && (!selectedGradeAndPassFail || selectedGradeAndPassFail.length === 0)) {
        alert('Please select a grade.');
        return;
      }
    }

    const sortedSelectedDesignators = sortBy(selectedDesignators, 'id');

            if (len === 0) {
              let i = 0;
              let grade = '';
              sortedSelectedDesignators.forEach(item => {
                if(creditTypeCode ==="PF") {
                  grade = selectedPassFail.item
                }else if(creditTypeCode ==="CR"){
                  grade = selectedGradeLetters.item
                }else if (creditTypeCode !== "PF" && creditTypeCode !== "CR"){
                  grade = selectedGradeAndPassFail.item
                }
                if (i === 0) {
                  database
                      .addCourse(code, name, credits, status.item, item.item, code, grade, creditTypeCode,1)
                      .catch(e => {
                        console.log(e);
                      });
                } else {
                  database
                      .addCourse(code, name, credits, status.item, item.item, code, grade, creditTypeCode, 0)
                      .catch(e => {
                        console.log(e);
                      });
                };
                i++;
              });
            } else {
              let grade = '';
              const cnt = 0;
              sortedSelectedDesignators.forEach(item => {
                if(creditTypeCode ==="PF") {
                  grade = selectedPassFail.item
                }else if(creditTypeCode ==="CR"){
                  grade = selectedGradeLetters.item
                }else if (creditTypeCode !== "PF" && creditTypeCode !== "CR"){
                  grade = selectedGradeAndPassFail.item
                }
                database
                    .addCourse(code, name, credits, status.item, item.item, code, grade, creditTypeCode, cnt)
                    .catch(e => {
                      console.log(e);
                    });
              });
            }

    alert('Course Created!');
    navigation.navigate('Get started!');
  };

  function Grade() {
    if (status.item === "Complete") {
      if (creditTypeCode === "CR") {
        return (
            <SelectBox
                label="Select Grade"
                options={gradeLetters}
                value={selectedGradeLetters}
                onChange={onChangeGrades()}
                hideInputFilter={true}
                arrowIconColor={'grey'}
                searchIconColor={'grey'}
                toggleIconColor={'grey'}
                optionsLabelStyle={styles.multiOptionsLabelStyle}
                labelStyle={styles.labelStyle}
                containerStyle={styles.containerStyle}
            />
        );
      } else if (creditTypeCode === "PF") {
        return (
            <SelectBox
                label="Select Grade"
                options={passFail}
                value={selectedPassFail}
                onChange={onChangePassFail()}
                hideInputFilter={true}
                arrowIconColor={'grey'}
                searchIconColor={'grey'}
                toggleIconColor={'grey'}
                optionsLabelStyle={styles.multiOptionsLabelStyle}
                labelStyle={styles.labelStyle}
                containerStyle={styles.containerStyle}
            />
        );
      } else if (creditTypeCode !== "PF" && creditTypeCode !== "CR") {
        return (
            <SelectBox
                label="Select Grade"
                options={gradeAndPassFail}
                value={selectedGradeAndPassFail}
                onChange={onChangeGradeAndPassFail()}
                hideInputFilter={true}
                arrowIconColor={'grey'}
                searchIconColor={'grey'}
                toggleIconColor={'grey'}
                optionsLabelStyle={styles.multiOptionsLabelStyle}
                labelStyle={styles.labelStyle}
                containerStyle={styles.containerStyle}
            />
        );

      } else {
        return null;
      }
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.newCourseContainer}>
        <TextInput
          autoCapitalize={'characters'}
          value={code}
          onChangeText={value => setCode(value)}
          style={styles.codeInput}
          placeholderTextColor="grey"
          clearButtonMode={'while-editing'}
          placeholder={'Enter Course Code'}
          maxLength={10}
        />
        <TextInput
          value={name}
          onChangeText={value => setName(value)}
          placeholderTextColor="grey"
          style={styles.nameInput}
          clearButtonMode={'while-editing'}
          placeholder={'Enter Course Title'}
        />
        <TextInput
          value={credits.toString()}
          onChangeText={value => setCredits(value)}
          placeholderTextColor="grey"
          style={styles.semesterInput}
          clearButtonMode={'while-editing'}
          maxLength={11}
          placeholder={'Enter Number of Credits'}
        />
        <SelectBox
          label="Select Course Designators"
          options={designators}
          selectedValues={selectedDesignators}
          onMultiSelect={onMultiChange()}
          onTapClose={onMultiChange()}
          hideInputFilter={true}
          isMulti
          arrowIconColor={'grey'}
          searchIconColor={'grey'}
          toggleIconColor={'grey'}
          multiOptionContainerStyle={styles.multiOptionContainerStyle}
          multiOptionsLabelStyle={styles.multiOptionsLabelStyle}
          labelStyle={styles.labelStyle}
          containerStyle={styles.containerStyle}
        />
        <SelectBox
          label="Select Course Status"
          options={statuses}
          value={status}
          onChange={onChange()}
          hideInputFilter={true}
          arrowIconColor={'grey'}
          searchIconColor={'grey'}
          toggleIconColor={'grey'}
          optionsLabelStyle={styles.multiOptionsLabelStyle}
          labelStyle={styles.labelStyle}
          containerStyle={styles.containerStyle}
        />
        {Grade()}
      </View>
      <View style={styles.bottomContainer}>
        <Pressable style={styles.searchButton} onPress={onCourseAdd}>
          <Text style={styles.searchButtonText}>Add</Text>
        </Pressable>
      </View>
    </View>
  );

  function onMultiChange() {
    return item =>
      setSelectedDesignators(xorBy(selectedDesignators, [item], 'id'));
  }

  function onChange() {
    return val => setStatus(val);
  }
  function onChangeGrades(){
    return (val) => setSelectedGradeLetters(val);
  }
  function onChangePassFail(){
    return (val) => setSelectedPassFail(val);
  }
  function onChangeGradeAndPassFail(){
    return (val) => setSelectedGradeAndPassFail(val);
  }

};

export default NewCourseScreen;
