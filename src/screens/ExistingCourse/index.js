import React, { useState } from 'react';
import {View, Text, TextInput, Alert, Pressable} from 'react-native';
import SelectBox from 'react-native-multi-selectbox'
import { xorBy } from 'lodash'
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { openDatabase } from 'react-native-sqlite-storage';

const tableName = 'courses';

const courseDB = openDatabase({ name: 'CourseList.db' });

const ExistingCourseScreen = props => {

  const navigation = useNavigation();

  const post = props.route.params.post;

  const credit = [{
    id: '1',
    item: '0'
  }, {
    id: '2',
    item: '0.5'
  }, {
    id: '3',
    item: '1'
  }, {
    id: '4',
    item: '1.5'
  }, {
    id: '5',
    item: '2'
  }, {
    id: '6',
    item: '3'
  },{
    id: '7',
    item: '4'
  }, {
    id: '8',
    item: '5'
  }, {
    id: '9',
    item: '9'
  },

  ];
  const statuses = [{
    id: '1',
    item: 'Complete'
  }, {
    id: '2',
    item: 'In Progress'
  }, {
    id: '3',
    item: 'Not Complete'
  },
  ];
  const designators = [
      {
    id: '1',
    item: '1st Major'
  }, {
    id: '2',
    item: '2nd Major'
  }, {
    id: '3',
    item: '1st Minor'
  }, {
    id: '4',
    item: '2nd Minor'
  }, {
    id: '5',
    item: 'Core'
  }, {
    id: '6',
    item: 'Elective'
  }
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

  let creditId = '';
  let creditItem = '';
  let i;
  for (i = 0; i < credit.length; i++){
    if (credit[i].item == post.credits){
      creditId = credit[i].id;
      creditItem = credit[i].item;
    }
  }
  const newCreditId = creditId;
  const newCreditItem = creditItem;

  let statusId = '';
  let statusItem = '';
  let j;
  for (j = 0; j < statuses.length; j++){
    if (statuses[j].item == post.status){
      statusId = statuses[j].id;
      statusItem = statuses[j].item;
    }
  }
  const newStatusId = statusId;
  const newStatusItem = statusItem;

  let designatorId = '';
  let designatorItem = '';
  let k;
  for (k = 0; k < designators.length; k++){
    if (designators[k].item == post.designator){
      designatorId = designators[k].id;
      designatorItem = designators[k].item;
    }
  }
  const newDesignatorId = designatorId;
  const newDesignatorItem = designatorItem;

  let gradeLetterId = '';
  let gradeLetterItem = '';
  let l;
  for (l = 0; l < gradeLetters.length; l++){
    if (gradeLetters[l].item == post.grade){
      gradeLetterId = gradeLetters[l].id;
      gradeLetterItem = gradeLetters[l].item;
    }
  }
  const newGradeId = gradeLetterId;
  const newGradeItem = gradeLetterItem;

  let pfLetterId = '';
  let pfLetterItem = '';
  let m;

  for (m = 0; m < passFail.length; m++){
    if (passFail[m].item == post.grade){

      pfLetterId = passFail[m].id;
      pfLetterItem = passFail[m].item;
    }
  }
  const newpfLetterId = pfLetterId;
  const newpfLetterItem = pfLetterItem;

  let pfAndGLetterId = '';
  let pfAndGLetterItem = '';
  let n;

  for (n = 0; n < gradeAndPassFail.length; n++){
    if (gradeAndPassFail[n].item === post.grade){

      pfAndGLetterId = gradeAndPassFail[n].id;
      pfAndGLetterItem = gradeAndPassFail[n].item;
    }
  }
  const newpfAndGLetterId = pfAndGLetterId;
  const newpfAndGLetterItem = pfAndGLetterItem;

  console.log("Grade " + newpfLetterItem);

  const [code, setCode] = useState(post.code);
  const [name, setName] = useState(post.name);
  const [credits, setCredits] = useState(post.credits);
  const [status, setStatus] = useState({id: newStatusId, item: newStatusItem});
  const [designator, setDesignator] = useState({id: newDesignatorId, item: newDesignatorItem});
  const [cnt, setCnt] = useState(post.cnt);
  const [selectedDesignators, setSelectedDesignators] = useState([{id: '1', item: '1st Major'}])
  const [relatedCode, setRelatedCode] = useState(post.relatedcode)
  const [toggleGrade, setToggleGrade] = useState(false);
  const [selectedGradeLetters, setSelectedGradeLetters] = useState({id: newGradeId, item: newGradeItem});
  const [selectedPassFail, setSelectedPassFail] = useState({id: newpfLetterId, item: newpfLetterItem});
  const [selectedGradeAndPassFail, setSelectedGradeAndPassFail] = useState({id: newpfAndGLetterId, item: newpfAndGLetterItem});
  const [creditTypeCode, setCreditTypeCode] = useState(post.creditTypeCode);

  function _toggleGrade() {
    setToggleGrade(!toggleGrade);
  }

  const onCourseUpdate = () => {
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
          (!selectedGradeLetters.item || selectedGradeLetters.length === 0)) {
        alert('Please select a grade.');
        return;
      } else if (creditTypeCode === "PF" && (!selectedPassFail.item || selectedPassFail.length === 0)) {
        alert('Please select a grade.');
        return;
      } else if (creditTypeCode !== "PF" && creditTypeCode !== "CR"
          && (!selectedGradeAndPassFail.item || selectedGradeAndPassFail.length === 0)) {
        alert('Please select a grade.');
        return;
      }
    }
    const updateCourse = () => {
      let grade = '';
      if(creditTypeCode ==="PF") {
        grade = selectedPassFail.item
      }else if(creditTypeCode ==="CR"){
        grade = selectedGradeLetters.item
      }else if (creditTypeCode !== "PF" && creditTypeCode !== "CR"){
        grade = selectedGradeAndPassFail.item
      }
      courseDB.transaction(txn => {
        txn.executeSql(
            `UPDATE ${tableName} SET code = '${code}', name = '${name}', credits = '${credits}', status = '${status.item}', designator = '${designator.item}', grade = '${grade}', creditTypeCode ='${creditTypeCode}' WHERE id = ${post.id}`, [],
            (sqlTxn, res) => {
              console.log(`${code} updated successfully`);
            },
            error => {
              console.log("error on updating course " + error.message);
            },
        );
      });
    }

    updateCourse();

    const updateRelatedCourses = () => {
      let grade = '';
      if(creditTypeCode ==="PF") {
        grade = selectedPassFail.item
      }else if(creditTypeCode ==="CR"){
        grade = selectedGradeLetters.item
      }else if (creditTypeCode !== "PF" && creditTypeCode !== "CR"){
        grade = selectedGradeAndPassFail.item
      }
      courseDB.transaction(txn => {
        txn.executeSql(
            `UPDATE ${tableName} SET code = '${code}', name = '${name}', credits = '${credits}', status = '${status.item}',  grade = '${grade}', creditTypeCode = '${creditTypeCode}' WHERE relatedcode = '${post.code}'`, [],
            (sqlTxn, res) => {
              console.log(`${code} updated successfully`);
            },
            error => {
              console.log("error on updating course " + error.message);
            },
        );
      });
    }
    updateRelatedCourses();
    alert('Course Updated!');
    navigation.navigate('All')
  };

  const showConfirmDialog = () => {
    return Alert.alert(
        "Are your sure?",
        "Are you sure you want to remove this course?",
        [
          {
            text: "Yes",
            onPress: () => {
              onCourseDelete();
            },
          },
          {
            text: "No",
          },
        ]
    );
  };

  const onCourseDelete = () => {
    const deleteCourse = () => {
      courseDB.transaction(txn => {
        txn.executeSql(
            `DELETE FROM ${tableName} WHERE id = ${post.id}`, [],
            (sqlTxn, res) => {
              console.log(`${code} deleted successfully`);
            },
            error => {
              console.log("error on deleting course " + error.message);
            },
        );
      });
    }

    deleteCourse();

    const deleteRelatedCourses = () => {
      courseDB.transaction(txn => {
        txn.executeSql(
            `DELETE FROM ${tableName} WHERE relatedcode = '${post.code}'`, [],
            (sqlTxn, res) => {
              console.log(`${code} deleted successfully`);
            },
            error => {
              console.log("error on deleting course " + error.message);
            },
        );
      });
    }

    deleteRelatedCourses();

    const getStatusCourses = () => {
      courseDB.transaction(txn => {
        txn.executeSql(
            `SELECT * FROM ${tableName}`,
            [],
            (sqlTxn, res) => {
              console.log("Courses retrieved successfully");
              let len = res.rows.length;
              if (len < 1) {
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Home" }],
                });
                alert('Course Deleted!');
                navigation.navigate('Home')
              }
              else {
                alert('Course Deleted!');
                navigation.navigate('Get started!')
              }
            },
            error => {
              console.log("error on getting courses " + error.message);
            },
        );
      });
    }
    getStatusCourses();
  };
  function Grade() {
    console.log(selectedGradeLetters.item);
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
              placeholder={'Enter Course Code'}
              placeholderTextColor={'grey'}
              clearButtonMode={'while-editing'}
              maxLength={10}
          />
          <TextInput
              value={name}
              onChangeText={value => setName(value)}
              style={styles.nameInput}
              placeholder={'Enter Course Name'}
              placeholderTextColor={'grey'}
              clearButtonMode={'while-editing'}
          />
          <TextInput
              value={credits.toString()}
              onChangeText={value => setCredits(value)}
              style={styles.semesterInput}
              clearButtonMode={'while-editing'}
              maxLength={11}
              placeholder={'Enter Number of Credits'}
          />
          <SelectBox
              label="Select Course Designators"
              options={designators}
              value={designator}
              hideInputFilter={true}
              onChange={onChangeDesignator()}
              hideInputFilter={true}
              arrowIconColor={'grey'}
              searchIconColor={'grey'}
              toggleIconColor={'grey'}
              optionsLabelStyle={styles.multiOptionsLabelStyle}
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
          <Pressable accessibilityRole={'button'} style={styles.searchButtonUpdate} onPress={onCourseUpdate}>
            <Text style={styles.searchButtonText} >Update</Text>
          </Pressable>
          <Pressable accessibilityRole={'button'} style={styles.searchButton} onPress={showConfirmDialog}>
            <Text style={styles.searchButtonText}>Delete</Text>
          </Pressable>
        </View>
      </View>

  );

  function onChange() {
    return (val) => setStatus(val)
  }

  function onChangeGrades(){
     return (val) => setSelectedGradeLetters(val)
  }

  function onChangeDesignator() {
    return (val) => setDesignator(val)
  }
  function onMultiChange() {
    return item =>
        setSelectedGradeLetters(xorBy(selectedGradeLetters, [item], 'id'));
  }
  function onChangePassFail(){
    return (val) => setSelectedPassFail(val);
  }
  function onChangeGradeAndPassFail(){
    return (val) => setSelectedGradeAndPassFail(val);
  }
};

export default ExistingCourseScreen;
