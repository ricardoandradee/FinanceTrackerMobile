import React, { Component, useEffect, useCallback } from 'react';
import { 
    View, 
    Text, 
    StyleSheet
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function AsyncStoragePicker(props) {
    const initialValue = { label: '', value: '' };
    const [pickerValue, setPickerValue] = React.useState(initialValue);
    const [state, setState] = React.useState({ values:[], selectedValue: '' });
    const { storageKey } = props;

    useEffect(async() => {
        await AsyncStorage.getItem(storageKey)
        .then(response => {      
            if (response !== null) {
                var parsedValue = JSON.parse(response);
                setState({values:parsedValue});
            }
        });
    }, []);

    return (
        <Picker
            selectedValue={pickerValue.label}
            style={styles.picker_component}
            onValueChange={
                (val, idx) => 
                {
                    setPickerValue({label:val});
                    props.onPickerChange(val);
                }
            }
      >
          {state.values.map((item, index) => {
              return(
                <Picker.Item key={item.value} value={item.value} label={item.label} />
              )
          })}
      </Picker>
    )
}

const styles = StyleSheet.create({
    picker_component: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#47126b',
        width: '100%'
    }
  });