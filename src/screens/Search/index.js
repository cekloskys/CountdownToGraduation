import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Pressable, StyleSheet, Alert} from 'react-native';
import styles from './styles';
import SelectBox from 'react-native-multi-selectbox';
import {xorBy, sortBy} from 'lodash';
import 'localstorage-polyfill';
import SearchResults from '../SearchResults';
import {useQuery, gql} from '@apollo/client';
import 'localstorage-polyfill';

const GET_DIVISIONS = gql`
  query Divisions {
    divisions {
      code
      name
    }
  }
`;

function SearchScreen() {
  const [courseCode, setCourseCode] = useState('');
  const [courseTitle, setCourseTitle] = useState('');
  const [selectedDivisionCodes, setSelectedDivisionCodes] = useState([]);
  const [toggleFilter, setFilter] = useState(false);
  const [divisions, setDivisions] = useState([])
  console.log(toggleFilter);

  const {data, error, loading} = useQuery(GET_DIVISIONS)

  useEffect(() => {
    if (error) {
      console.log(error.stack);
      Alert.alert('Error fetching Divisions!', error.message);
    }
  }, [error]);

  useEffect(() => {
    console.log(data);
    if (data) { 
      setDivisions(data.divisions);
    }
  }, [data]);

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
  localStorage.setItem('title', courseTitle);
  localStorage.setItem('code', courseCode);

  return (
    <View style={styles.container}>
      <View style={styles.newCourseContainer}>
        <TextInput
          autoCapitalize={'none'}
          value={courseTitle}
          onChangeText={value => setCourseTitle(value)}
          style={styles.codeInput}
          placeholder={'Title'}
          placeholderTextColor={'grey'}
          clearButtonMode={'while-editing'}
          maxLength={25}
        />
        <View>
          <TextInput
            autoCapitalize={'characters'}
            value={courseCode}
            onChangeText={value => setCourseCode(value)}
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
        </View>
        <View style={styles.outerSmall}>
          <SearchResults />
        </View>
      </View>
    </View>
  );

  function onMultiChange() {
    return item =>
      setSelectedDivisionCodes(xorBy(selectedDivisionCodes, [item], 'id'));
  }
}

export default SearchScreen;
