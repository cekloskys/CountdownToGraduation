import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
} from 'react-native';
import styles from '../NewCourse/styles';
import {useNavigation} from '@react-navigation/native';
import SelectBox from 'react-native-multi-selectbox'
import { xorBy, sortBy } from 'lodash'

const SearchScreen = props => {

  const [courseCode, setCourseCode] = useState('');
  const [selectedDivisionCodes, setSelectedDivisionCodes] = useState([])
  const navigation = useNavigation();

    const divisionCodes = [{
        id: '1',
        item: 'BU'
    }, {
        id: '2',
        item: 'BI'
    }, {
        id: '3',
        item: 'CH'
    }, {
        id: '4',
        item: 'CS'
    }, {
        id: '5',
        item: 'CR'
    }, {
        id: '6',
        item: 'SO'
    }
    ];

  const onCourseAdd = () => {
    navigation.navigate('Search Results', {divisionCodes: selectedDivisionCodes});
  };

  return (
      <View style={styles.container}>
        <View style={styles.newCourseContainer}>
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
                options={divisionCodes}
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
        <View style={styles.bottomContainer}>
          <Pressable style={styles.searchButton} onPress={onCourseAdd}>
            <Text style={styles.searchButtonText}>Search</Text>
          </Pressable>
        </View>
      </View>
  );

  function onMultiChange() {
      return (item) => setSelectedDivisionCodes(xorBy(selectedDivisionCodes, [item], 'id'))
  }
};

export default SearchScreen;
