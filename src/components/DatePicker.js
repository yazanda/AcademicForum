import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DatePicker = ({ label, value, onChange, placeholder, error }) => {
    const [showDatePicker, setShowDatePicker] = useState(false);
    // const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef(null);

    const handleDateChange = (event, date) => {
        setShowDatePicker(Platform.OS === 'ios');
        if (date) {
            onChange(date);
        }
    };

    const handleShowDatePicker = () => {
        setShowDatePicker(true);
        // setIsFocused(true);
    };

    const handleHideDatePicker = () => {
        setShowDatePicker(false);
        // setIsFocused(false);
    };

    const handleConfirm = () => {
        handleHideDatePicker();
        inputRef.current.blur();
        if (value === null) {
            onChange(new Date());
        }
        // Handle confirmation logic here
        console.log('Selected date:', value);
    };

    const renderDatePicker = () => {
        if (showDatePicker) {
            return (
                <DateTimePicker
                    value={value ?  value : new Date()}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={handleDateChange}
                    textColor={Platform.OS === 'ios' ? 'black' : 'default'}
                />
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
            {(showDatePicker || value !== null) && (
                <Text style={[styles.label, { color: '#00008B' }]}>{label}</Text>
            )}
            <View style={[error ? styles.errorInputContainer : styles.inputContainer , showDatePicker && styles.focusedInput]}>
                <TextInput
                    ref={inputRef}
                    style={[styles.textInput, error && styles.errorTextInput, { color: value ? 'black' : 'gray' }]}
                    value={value ? value.toDateString() : ''}
                    placeholder={!showDatePicker ? placeholder : ''}
                    placeholderTextColor={'black'}
                    editable={true}
                    onTouchStart={() => setShowDatePicker(true)}
                    onBlur={()=> setShowDatePicker(false)}
                />
                {Platform.OS === 'ios' && showDatePicker && (
                    <Button
                        title="Confirm"
                        onPress={handleConfirm}
                        style={styles.confirmButton}
                    />
                )}
            </View>
            {renderDatePicker()}
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'gray',
        position: 'relative',
        overflow: 'hidden',
    },
    errorInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#8b0000',
        position: 'relative',
        overflow: 'hidden',
    },
    focusedInput: {
        borderColor: '#00008B',
        borderWidth: 1.5,
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
        backgroundColor: 'white',
        left: 22,
        top: 0,
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
    confirmButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        height: '100%',
        paddingHorizontal: 16,
    },
});

export default DatePicker;
