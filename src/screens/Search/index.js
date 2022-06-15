import React, {useState} from 'react';
import {View, Text, TextInput, Pressable, StyleSheet} from 'react-native';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import SelectBox from 'react-native-multi-selectbox';
import {xorBy, sortBy} from 'lodash';
import 'localstorage-polyfill';
import SearchResults from '../SearchResults';

function SearchScreen() {
  const [courseCode, setCourseCode] = useState('');
  const [courseTitle, setCourseTitle] = useState('');
  const [selectedDivisionCodes, setSelectedDivisionCodes] = useState([]);
  const [toggleFilter, setFilter] = useState(false);

  const codes = [];

  selectedDivisionCodes.forEach(item => {
    codes.push(item.id);
  });

  console.log(codes);

  const navigation = useNavigation();

  const divisions = [
    {
      id: 'AH',
      item: 'Art History',
    },
    {
      id: 'AS',
      item: 'Art',
    },
    {
      id: 'BI',
      item: 'Biology',
    },
    {
      id: 'BU',
      item: 'Business',
    },
    {
      id: 'CH',
      item: 'Chemistry',
    },
    {
      id: 'CO',
      item: 'Communication',
    },
    {
      id: 'CS',
      item: 'Computer Science',
    },
    {
      id: 'ED',
      item: 'Education',
    },
    {
      id: 'EN',
      item: 'English',
    },
    {
      id: 'FA',
      item: 'Music',
    },
    {
      id: 'FL',
      item: 'Foreign Language ',
    },
    {
      id: 'GL',
      item: 'Global Awarness',
    },
    {
      id: 'HP',
      item: 'History',
    },
    {
      id: 'ID',
      item: 'Honor',
    },
    {
      id: 'IL',
      item: 'Liberal Arts',
    },
    {
      id: 'MA',
      item: 'Math',
    },
    {
      id: 'PE',
      item: 'Health/Exercise Science',
    },
    {
      id: 'PO',
      item: 'Politics',
    },
    {
      id: 'PS',
      item: 'Psycology',
    },
    {
      id: 'RS',
      item: 'Religion/Philosophy',
    },
    {
      id: 'SO',
      item: 'Public Service',
    },
  ];

  // const onCourseAdd = () => {
  //   navigation.navigate('Search Results');
  //   // navigation.navigate('Search Results', {divisionCodes: codes, courseCode: courseCode, courseTitle: courseTitle});
  // };

  function _toggleFilter() {
    setFilter(!toggleFilter);
  }

  function Filter() {
    if (toggleFilter) {
      return (
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
            options={divisions}
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
      );
    } else {
      return null;
    }
  }

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
          maxLength={10}
        />
        <Pressable style={styles.filterButton} onPress={_toggleFilter}>
          <Text style={styles.filterButtonText}>Filter</Text>
        </Pressable>
        <Text style={styles.textSpacer}></Text>
        {Filter()}
        <View style={toggleFilter ? styles.outerSmall : styles.outerBig}>
          <SearchResults />
        </View>
      </View>
      <View style={styles.bottomContainer}></View>
    </View>
  );

  function onMultiChange() {
    return item =>
      setSelectedDivisionCodes(xorBy(selectedDivisionCodes, [item], 'id'));
  }
}

export default SearchScreen;
