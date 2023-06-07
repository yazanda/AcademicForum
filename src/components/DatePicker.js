import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Platform, DatePickerIOS, DatePickerAndroid, TouchableOpacity, Text } from 'react-native';
import DatePickerA from 'react-native-datepicker';


const DatePicker = ({ label, placeholder, value, onChange, error }) => {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const handleDateChange = (date) => {
        onChange(date);
        setShowDatePicker(false);
    };
    const handleShowDatePicker = () => {
        setShowDatePicker(!showDatePicker);
    }

    const openAndroidDatePicker = async () => {
        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                date: value || new Date(),
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                const selectedDate = new Date(year, month, day);
                handleDateChange(selectedDate);
            }
        } catch ({ code, message }) {
            console.warn('Cannot open date picker', message);
        }
    };

    const renderDatePicker = () => {
        if (isFocused && Platform.OS === 'ios') {
            return (
                <DatePickerIOS
                    date={value || new Date()}
                    onDateChange={handleDateChange}
                    mode="date"
                />
            );
        } else if (isFocused && Platform.OS === 'android') {
            return (
                <DatePickerAndroid
                    date={value || new Date()}
                    onDateChange={handleDateChange}
                    mode="date"
                />
            );
        }
        return null;
    };

    return (
        <View style={styles.container}>
            {isFocused && (
                <Text style={[styles.label, { color: 'blue' }]}>{label}</Text>
            )}
            <TouchableOpacity
                style={[styles.inputContainer, isFocused && { borderColor: 'blue' }]}
                onPress={() => {
                    handleShowDatePicker();
                    setIsFocused(true);
                }}
                onBlur={() => setIsFocused(false)}
            >
                <TextInput
                    style={[styles.textInput, error && styles.errorTextInput]}
                    value={value ? value.toDateString() : ''}
                    placeholder={!isFocused ? placeholder : ''}
                    placeholderTextColor={'black'}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onChangeText={(text) => {
                        if (text === '') {
                            onChange(null); // Clear the date by setting it to null
                        }
                    }}
                    editable={true}
                />
            </TouchableOpacity>
            {renderDatePicker()}
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingLeft: 16,
        paddingRight: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0.5,
        borderRadius: 8,
        position: 'relative',
        overflow: 'hidden',
        marginBottom: 16,
    },
    textInput: {
        flex: 1,
        height: 50,
        paddingHorizontal: 8,
    },
    errorTextInput: {
        borderColor: 'red',
    },
    label: {
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        left: 22,
        top: -10,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    labelFocused: {
        color: 'blue',
        transform: [{ translateY: 0 }, { scale: 1 }],
    },
    errorText: {
        color: 'red',
    },
});

export default DatePicker;
