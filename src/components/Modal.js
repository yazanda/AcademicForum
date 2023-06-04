import React, { useState } from 'react';
import {
    View,
    Modal,
    Button,
    Text,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    StyleSheet,
} from 'react-native';
import Dropdown from './DropDown';
import DatePicker from 'react-native-datepicker';
import TextInput from './TextInput';
import ImagePicker from "react-native-image-picker";
import {CheckBox} from 'react-native-elements';

const MyModal = ({ modalVisible, toggleModal }) => {
    // Function to handle image selection
    const [selectedImage, setSelectedImage] = useState(null);
    const selectImage = () => {
        ImagePicker.showImagePicker(
            {
                title: "Select Picture",
                mediaType: "photo",
                maxWidth: 500,
                maxHeight: 500,
            },
            (response) => {
                if (!response.didCancel && !response.error) {
                    setSelectedImage(response.uri);
                }
            }
        );
    };
    //***********************************************************************************
    // Function to handle checkBox
    const [checked, setChecked] = useState(false);
    const toggleCheckbox = () => {
        setChecked(!checked);
    };
    //***********************************************************************************
    const [date, setDate] = useState(null);

    const handleDateChange = (newDate) => {
        setDate(newDate);
    };

    return (
        <Modal visible={modalVisible} animationType="slide" onRequestClose={toggleModal}>
            <SafeAreaView style={styles.modalContainer}>
                <ScrollView>
                    <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                    <TextInput placeholder="First Name" label="First Name" />
                    <TextInput placeholder="Last Name" label="Last Name" />
                    <TextInput placeholder="BirthDate" label="BirthDate" />
                    {/*<DatePicker*/}
                    {/*    style={styles.input}*/}
                    {/*    date={date}*/}
                    {/*    mode="date"*/}
                    {/*    placeholder="Select BirthDate"*/}
                    {/*    format="YYYY-MM-DD"*/}
                    {/*    minDate="1900-01-01"*/}
                    {/*    maxDate={new Date()}*/}
                    {/*    confirmBtnText="Confirm"*/}
                    {/*    cancelBtnText="Cancel"*/}
                    {/*    onDateChange={handleDateChange}*/}
                    {/*    customStyles={{*/}
                    {/*        dateInput: styles.dateInput,*/}
                    {/*        dateText: styles.dateText,*/}
                    {/*        placeholderText: styles.dateText,*/}
                    {/*    }}*/}
                    {/*    showIcon={false}*/}
                    {/*/>*/}
                    <TextInput placeholder="Email" label="Email" />
                    <TouchableOpacity style={styles.dropDownContainer}>
                        <Dropdown placeholder="Select City" label="Select City" data={cityData} />
                        <Dropdown placeholder="Select Degree" label="Select Degree" data={degreeData} />
                    </TouchableOpacity>
                    <TextInput placeholder="Major" label="Major" />
                    <TextInput placeholder="Company Name" label="Company Name" />
                    <TextInput placeholder="Position" label="Position" />
                    <TouchableOpacity style={styles.dropDownContainer}>
                        <Dropdown placeholder="Select Gender" label="Select Gender" data={genderData} />
                    </TouchableOpacity>
                    <TextInput placeholder="Phone Number" style={styles.input} />
                    <Button title="Upload Picture" onPress={selectImage}/>
                    {selectedImage && (
                        <Image
                            source={{uri: selectedImage}}
                            style={{width: 200, height: 200}}
                        />
                    )}
                    <CheckBox
                        title='I confirm that the information I provided is reliable and accurate, and I also agree to bear the responsibility for publishing unreliable information, as well as I agree to publish the image of my personal file, which does not have any copying rights, publicly on the site and on the application the Arab Academic Forum database.'
                        checked={checked}
                        onPress={toggleCheckbox}
                    />
                    <TouchableOpacity style={styles.sendButton} onPress={toggleModal}>
                        <Text style={styles.sendButtonText}>Send</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        </Modal>
    );
};

export default MyModal;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'white',
        padding: 16,
        justifyContent: "center",
    },
    closeButton: {
        alignSelf: 'center',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        elevation: 2,
    },
    closeButtonText: {
        color: 'blue',
        fontSize: 16,
    },
    input: {
        width: '80%',
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    dateInput: {
        borderWidth: 0,
        borderBottomWidth: 0,
        alignItems: 'flex-start',
    },
    dateText: {
        paddingTop: 10,
    },
    sendButton: {
        backgroundColor: "green",
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        width: '50%',
        alignSelf: 'center', // Add this line to center the button
        marginTop: 20, // Add margin-top to create some space between the checkbox and the button
        alignItems: 'center',
    },
    sendButtonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
    },
});

const cityData = [
    { label: 'City 1', value: '1' },
    { label: 'City 2', value: '2' },
    { label: 'City 3', value: '3' },
];

const degreeData = [
    { label: 'Degree 1', value: '1' },
    { label: 'Degree 2', value: '2' },
    { label: 'Degree 3', value: '3' },
];

const genderData = [
    { label: 'Male', value: '1' },
    { label: 'Female', value: '2' },
];
