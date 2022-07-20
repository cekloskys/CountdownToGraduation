import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Pressable, FlatList, Alert} from 'react-native';
import styles from './styles';
import SelectBox from 'react-native-multi-selectbox';
import {xorBy, sortBy} from 'lodash';
import 'localstorage-polyfill';
import SearchResults from '../SearchResults';
import {useQuery, gql} from '@apollo/client';
import 'localstorage-polyfill';
import SearchCourse from '../../components/SearchCourse';
import {useNavigation} from '@react-navigation/native';

const GET_DIVISIONS = gql`
  query Divisions {
    divisions {
      code
      name
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

function SearchScreen() {
  const navigation = useNavigation();

  const [courseCodeInput, setCourseCodeInput] = useState('');
  const [courseTitleInput, setCourseTitleInput] = useState('');
  const [selectedDivisionCodes, setSelectedDivisionCodes] = useState([]);
  const [divisions, setDivisions] = useState([])

  const {data: divdata, error: diverror, ___} = useQuery(GET_DIVISIONS)

  useEffect(() => {
    if (diverror) {
      console.log(diverror.stack);
      Alert.alert('Error fetching Divisions!', diverror.message);
    }
  }, [diverror]);

  useEffect(() => {
    console.log(divdata);
    if (divdata) {
      setDivisions(divdata.divisions);
    }
  }, [divdata]);

  const codes = [];

  selectedDivisionCodes.forEach(item => {
    codes.push(item.id);
  });

  console.log(codes);

  const  mappedDivisions = divisions.map(division => {
    return {
      id: division.code,
      item: division.name
    }
  })

  localStorage.setItem('division', JSON.stringify(codes));
  localStorage.setItem('title', courseTitleInput);
  localStorage.setItem('code', courseCodeInput);

  const divisionCodes = JSON.parse(localStorage.getItem('division'));
  const courseCode = localStorage.getItem('code');
  const courseTitle = localStorage.getItem('title');

  const addCustomCourse = () => {
    const post = {
      courseCode: '',
      courseTitle: '',
      credits: '',
    };
    navigation.navigate('New Course', {post: post});
  };

  const [results, setResults] = useState([]);

  const {data, error, courseloading} = useQuery(MY_COURSES_BY, {
    variables: {
      divisionCodes: divisionCodes,
      courseCode: courseCode,
      courseTitle: courseTitle,
    },
  });

  useEffect(() => {
    if (error) {
      console.log(error.stack);
      Alert.alert('Error fetching courses!', error.message);
    }
  }, [error]);

  useEffect(() => {
    console.log(data);
    if (data) {
      setResults(data.coursesBy);
    }
  }, [data]);

  return (
    <View style={styles.container}>
      <View style={styles.newCourseContainer}>
        <TextInput
          autoCapitalize={'none'}
          value={courseTitle}
          onChangeText={value => setCourseTitleInput(value)}
          style={styles.codeInput}
          placeholder={'Title'}
          placeholderTextColor={'grey'}
          clearButtonMode={'while-editing'}
          maxLength={25}
        />
          <TextInput
            autoCapitalize={'characters'}
            value={courseCode}
            onChangeText={value => setCourseCodeInput(value)}
            style={styles.codeInput}
            placeholder={'Code'}
            placeholderTextColor={'grey'}
            clearButtonMode={'while-editing'}
            maxLength={10}
          />
          <SelectBox
            label="Division Codes ..."
            options={mappedDivisions}
            selectedValues={selectedDivisionCodes}
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
        <Pressable style={styles.searchButton} onPress={addCustomCourse}>
          <Text style={styles.searchButtonText}>
            Don't see your course, add it yourself!
          </Text>
        </Pressable>
        <FlatList
            data={results}
            renderItem={({item, index}) => <SearchCourse course={item} />}
            keyExtractor={(item, index) => index}
        />
      </View>
    </View>
  );

  function onMultiChange() {
    return item =>
      setSelectedDivisionCodes(xorBy(selectedDivisionCodes, [item], 'id'));
  }
}

export default SearchScreen;
