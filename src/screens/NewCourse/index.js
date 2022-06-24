import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Pressable,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  FlatList,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SelectBox from 'react-native-multi-selectbox';
import {xorBy, sortBy} from 'lodash';
import styles from '../NewCourse/styles';
import {useNavigation} from '@react-navigation/native';
const database = require('../../components/Handlers/database.js');

const NewCourseScreen = props => {
  const post = props.route.params.post;

  const [code, setCode] = useState(post.courseCode);
  const [name, setName] = useState(post.courseTitle);
  const [semester, setSemester] = useState('Fall 2022');
  const [credits, setCredits] = useState(post.credits);
  const [status, setStatus] = useState('');
  const [designator, setDesignator] = useState('');
  const [selectedDesignators, setSelectedDesignators] = useState([]);

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
  const navigation = useNavigation();

  const onCourseAdd = () => {
    if (!code) {
      alert('Please fill in code');
      return;
    }
    if (!name) {
      alert('Please fill in Course Name');
      return;
    }
    if (!selectedDesignators || selectedDesignators.length === 0) {
      alert('Please select Designators');
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

    /* const course = {
      code,
      name,
      credits,
      semester,
      status,
      designator,
    }; */
    // console.log(code);
    const sortedSelectedDesignators = sortBy(selectedDesignators, 'id');
    // console.log(sortedSelectedDesignators);
    let i = 0;
    sortedSelectedDesignators.forEach(item => {
      if (i === 0) {
        database
          .addCourse(
            code,
            name,
            credits,
            semester,
            status.item,
            item.item,
            code,
            1,
          )
          .catch(e => {
            console.log(e);
          });
      } else {
        database
          .addCourse(
            code,
            name,
            credits,
            semester,
            status.item,
            item.item,
            code,
            0,
          )
          .catch(e => {
            console.log(e);
          });
      }
      i++;
    });

    alert('Course Created!');
    navigation.navigate('Get started!');
  };

  return (
    <View style={styles.container}>
      <View style={styles.newCourseContainer}>
        <TextInput
          autoCapitalize={'characters'}
          value={code}
          onChangeText={value => setCode(value)}
          style={styles.codeInput}
          clearButtonMode={'while-editing'}
          placeholder={'Enter Course Code'}
          maxLength={10}
        />
        <TextInput
          value={name}
          onChangeText={value => setName(value)}
          style={styles.nameInput}
          clearButtonMode={'while-editing'}
          placeholder={'Enter Course Title'}
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
          label="Designators ..."
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
};

export default NewCourseScreen;
