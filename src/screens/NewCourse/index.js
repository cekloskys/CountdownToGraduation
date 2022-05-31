import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Pressable,
  ScrollView,
  Platform,
  KeyboardAvoidingView, FlatList
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SelectBox from 'react-native-multi-selectbox'
import { xorBy, sortBy } from 'lodash'
import styles from '../NewCourse/styles';
import {useNavigation} from '@react-navigation/native';
const database = require('../../components/Handlers/database.js');

const NewCourseScreen = props => {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [semester, setSemester] = useState('');
  const [credits, setCredits] = useState('');
  const [status, setStatus] = useState('');
  const [designator, setDesignator] = useState('');
  const [selectedDesignators, setSelectedDesignators] = useState([])

  // const statuses = ['Complete', 'In Progress', 'Not Complete'];
  /* const designators = [
    '1st Major',
    '2nd Major',
    '1st Minor',
    '2nd Minor',
    'Core',
    'Elective',
  ]; */
  const credit = [{
    id: '1',
    item: '1'
  }, {
    id: '2',
    item: '2'
  }, {
    id: '3',
    item: '3'
  }, {
    id: '4',
    item: '4'
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
    if (!semester) {
      alert('Please fill in Semester');
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

    const course = {
      code,
      name,
      credits,
      semester,
      status,
      designator,
    };
    // console.log(selectedDesignators);
    const sortedSelectedDesignators = sortBy(selectedDesignators, 'id');
    // console.log(sortedSelectedDesignators);
    let i = 0;
    sortedSelectedDesignators.forEach( item => {
      if (i === 0) {
        database
            .addCourse(code, name, credits.item, semester, status.item, item.item, code, 1)
            .catch(e => {
              console.log(e);
            });
      } else {
        database
            .addCourse(code, name, credits.item, semester, status.item, item.item, code, 0)
            .catch(e => {
              console.log(e);
            });
      };
      i++;
    })

    /*
        console.warn(
          code,
          name,
          semester,
          credits,
          status,
          designator
        );
        */
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
          <TextInput
              value={semester}
              onChangeText={value => setSemester(value)}
              style={styles.semesterInput}
              placeholder={'Semester'}
              placeholderTextColor={'grey'}
              clearButtonMode={'while-editing'}
              maxLength={11}
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
        </View>
        <View style={styles.bottomContainer}>
          <Pressable style={styles.searchButton} onPress={onCourseAdd}>
            <Text style={styles.searchButtonText}>Add</Text>
          </Pressable>
        </View>
      </View>


  );

  function onMultiChange() {
    return (item) => setSelectedDesignators(xorBy(selectedDesignators, [item], 'id'))
  }

  function onChange() {
    return (val) => setStatus(val)
  }

  function onChangeCredits() {
    return (val) => setCredits(val)
  }
};

export default NewCourseScreen;
