import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

const DropdownComponent = ({ placeholder, label, data, value, setValue, errorText }) => {
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && styles.focusedLabel]}>
          {label}
        </Text>
      );
    }
    return null;
  };

  return (
    <View
        style={styles.container}
        underlineColor="transparent"
        mode="outlined"
    >
      <Dropdown
        style={[errorText? styles.errorDropDown : styles.dropdown, isFocus && styles.focusedDropdown]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={value ? value : !isFocus ? placeholder || 'Select item' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue({value: item.label, error: ""});
          setIsFocus(false);
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color={isFocus ? 'blue' : 'black'}
            name="Safety"
            size={20}
          />
        )}
      />
      {renderLabel()}

      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: '100%',
  },
  dropdown: {
    height: 50,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 8,
  },
  errorDropDown: {
    height: 50,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#8b0000',
    borderRadius: 5,
    paddingHorizontal: 8,
  },
  focusedDropdown: {
    borderColor: '#00008B',
    borderWidth: 1.5,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 18,
    top: 0,
    zIndex: 1,
    paddingHorizontal: 8,
    fontSize: 14,
    color: '#00008B',
  },
  focusedLabel: {
    top: 0,
    color: '#00008B',
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  error: {
    fontSize: 13,
    color: 'red',
    paddingTop: 8,
  },
});
