import React, { useState } from 'react';
import {View, Text, TouchableOpacity, TextInput, Alert, Pressable, Platform, KeyboardAvoidingView} from 'react-native';
import SelectBox from 'react-native-multi-selectbox'
import { xorBy } from 'lodash'
import styles from './styles';
import SelectDropdown from 'react-native-select-dropdown/src/SelectDropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { openDatabase } from 'react-native-sqlite-storage';
import {value} from "lodash/seq";
import ExistingCourse from "./index";

const tableName = 'courses';

const courseDB = openDatabase({ name: 'CourseList.db' });

const ExistingCourseScreen = props => {

  const navigation = useNavigation();

  const post = props.route.params.post;
  console.log(post);

  //const statuses = ['Complete', 'In Progress', 'Not Complete'];
  //const designators = ['1st Major', '2nd Major', '1st Minor', '2nd Minor', 'Core', 'Elective']

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
  const designators = [{
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
      item: 'A+',
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

  const [code, setCode] = useState(post.code);
  const [name, setName] = useState(post.name);
  const [credits, setCredits] = useState({id: newCreditId, item: newCreditItem});
  const [status, setStatus] = useState({id: newStatusId, item: newStatusItem});
  const [designator, setDesignator] = useState({id: newDesignatorId, item: newDesignatorItem});
  const [cnt, setCnt] = useState(post.cnt);
  const [selectedDesignators, setSelectedDesignators] = useState([{id: '1', item: '1st Major'}])
  const [relatedCode, setRelatedCode] = useState(post.relatedcode)
  const [toggleGrade, setGrade] = useState(false);
  const [selectedGradeLetters, setSelectedGradeLetters] = useState([]);
  const [grades] = useState('');
  const [selectedPassFail, setSelectedPassFail] = useState([]);
  const [creditTypeCode, setCreditTypeCode] = useState(post.creditTypeCode);


  function _toggleGrade() {
    setGrade(!toggleGrade);
  }

  const onCourseUpdate = () => {
    // console.warn(designator);
    if (!code) {
      alert('Please fill in code');
      return;
    }
    if (!name) {
      alert('Please fill in Course Name');
      return;
    }
    if (!designator) {
      alert('Please select a Designator');
      return;
    }
    if (!credits) {
      alert('Please select the Credits');
      return;
    }
    if (!status) {
      alert('Please select a Status');
      return;
    }
    if (status.item==="Complete" && creditTypeCode ==="CR" && (!selectedGradeLetters || selectedGradeLetters.length ===0)) {
      alert('Please select a Grade');
      return;
    }
    const updateCourse = () => {
      /* if (status.item === 'In Progress' || status.item === 'Not Complete'){
        setCnt(0);
      } else {
        setCnt(1);
      } */
      // console.log('[DATA]', 'updateCourse: ' +  selectedGradeLetters.item);
      let grade = '';
      if(creditTypeCode ==="PF") {
        grade = selectedPassFail.item
      }else{
        grade = selectedGradeLetters.item
      }
      courseDB.transaction(txn => {
        txn.executeSql(
            `UPDATE ${tableName} SET code = '${code}', name = '${name}', credits = '${credits.item}', status = '${status.item}', designator = '${designator.item}', grade = '${grade}', creditTypeCode ='${creditTypeCode}' WHERE id = ${post.id}`, [],
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
    // alert('Course Updated!');

    const updateRelatedCourses = () => {
      let grade = '';
      if(creditTypeCode ==="PF") {
        grade = selectedPassFail.item
      }else{
        grade = selectedGradeLetters.item
      }
      // console.log('[DATA]', 'updateCourse: ' + code + name);
      courseDB.transaction(txn => {
        txn.executeSql(
            `UPDATE ${tableName} SET code = '${code}', name = '${name}', credits = '${credits.item}', status = '${status.item}',  grade = '${grade}', creditTypeCode = '${creditTypeCode}' WHERE relatedcode = '${post.code}'`, [],
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
      // console.log('[DATA]', 'Delete: ' + code + name);
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
  console.log(status);
console.log(newStatusId);
  console.log(creditTypeCode, "Hi");
  function Grade(){
    if(status.item === "Complete") {
      if(creditTypeCode==="CR") {
        return (
            <SelectBox
                label="Grade ..."
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
      }else if(creditTypeCode ==="PF"){
        return (
            <SelectBox
                label="Grade ..."
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
      }

    } else {
      return null;
    }
  }


  // console.warn("[DBUG]", credits);

  // console.log('DGUB')

  return (
      <View style={styles.container}>
        <View style={styles.newCourseContainer}>
          <TextInput
              autoCapitalize={'characters'}
              value={code}
              onChangeText={value => setCode(value)}
              style={styles.codeInput}
              placeholder={'Code'}
              placeholderTextColor={'grey'}
              clearButtonMode={'while-editing'}
              maxLength={10}
          />
          <TextInput
              value={name}
              onChangeText={value => setName(value)}
              style={styles.nameInput}
              placeholder={'Name'}
              placeholderTextColor={'grey'}
              clearButtonMode={'while-editing'}
              
          />
          <SelectBox
              label="Designator ..."
              options={designators}
              value={designator}
              hideInputFilter={true}
              onChange={onChangeDesignator()}
              hideInputFilter={false}
              arrowIconColor={'grey'}
              searchIconColor={'grey'}
              toggleIconColor={'grey'}
              optionsLabelStyle={styles.multiOptionsLabelStyle}
              labelStyle={styles.labelStyle}
              containerStyle={styles.containerStyle}
          />
          <SelectBox
              label="Credits ..."
              options={credit}
              value={credits}
              onChange={onChangeCredits()}
              hideInputFilter={true}
              arrowIconColor={'grey'}
              searchIconColor={'grey'}
              toggleIconColor={'grey'}
              optionsLabelStyle={styles.multiOptionsLabelStyle}
              labelStyle={styles.labelStyle}
              containerStyle={styles.containerStyle}
          />
          <SelectBox
              label="Status ..."
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
          <Pressable style={styles.searchButtonUpdate} onPress={onCourseUpdate}>
            <Text style={styles.searchButtonText}>Update</Text>
          </Pressable>
          <Pressable style={styles.searchButton} onPress={showConfirmDialog}>
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

  function onChangeCredits() {
    return (val) => setCredits(val)
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
};

export default ExistingCourseScreen;
