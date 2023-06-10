import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
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
import DatePicker from './DatePicker';
// import DateTimePicker from '@react-native-community/datetimepicker';

import TextInput from './TextInput';
import ImagePicker from "react-native-image-picker";
import {CheckBox} from 'react-native-elements';
import { getDegreeList } from '../lists/degree';
import { getCityList } from '../lists/list';
// import ImageUploadButton from './ImageUpload';

const MyModal = ({modalVisible, toggleModal}) => {
    const {t, i18n} = useTranslation();

    const [firstName, setFirstName] = useState({ value: "", error: "" });
    const [lastName, setLastName] = useState({ value: "", error: "" });
    const [email, setEmail] = useState({ value: "", error: "" });
    const [selectedDate, setSelectedDate] = useState(null);
    const [age, setAge] = useState({ value: "", error: "" });
    const [degree, setDegree] = useState('');
    const [subject, setSubject] = useState({ value: "", error: "" });
    const [career, setCareer] = useState({ value: "", error: "" });
    const [city, setCity] = useState('');
    const [gender, setGender] = useState('');
    const [phoneNumber, setPhoneNumber] = useState({ value: "", error: "" });
    const [company, setCompany] = useState({ value: "", error: "" });
    const [checked, setChecked] = useState(false);

    // Function to handle image selection
    const [selectedImage, setSelectedImage] = useState(null);
    // const selectImage = () => {
    //     ImagePicker.showImagePicker(
    //         {
    //             title: "Select Picture",
    //             mediaType: "photo",
    //             maxWidth: 500,
    //             maxHeight: 500,
    //         },
    //         (response) => {
    //             if (!response.didCancel && !response.error) {
    //                 setSelectedImage(response.uri);
    //             }
    //         }
    //     );
    // };
    const handleImageSelect = (file) => {
        // Do something with the selected image file
        setSelectedImage(file);
    };
    
    let validationError;
    return (
        <Modal visible={modalVisible} animationType="slide" onRequestClose={toggleModal}>
            <SafeAreaView style={styles.modalContainer}>
                <ScrollView>
                    <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>{t('academicpage.dialog.close')}</Text>
                    </TouchableOpacity>
                    <TextInput  label={t('academicpage.dialog.first.name')}
                                returnKeyType="next"
                                value={firstName.value}
                                onChangeText={(text) => setFirstName({ value: text, error: "" })}
                                error={!!firstName.error}
                                errorText={firstName.error}/>
                    <TextInput  label={t('academicpage.dialog.last.name')}
                                returnKeyType="next"
                                value={lastName.value}
                                onChangeText={(text) => setLastName({ value: text, error: "" })}
                                error={!!lastName.error}
                                errorText={lastName.error}/>
                    <DatePicker
                        placeholder={t('academicpage.dialog.Birhdate')}
                        label={t('academicpage.dialog.Birhdate')}
                        value={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        error={validationError}
                    />
                    <TextInput  label={t('academicpage.dialog.email')}
                                returnKeyType="next"
                                value={email.value}
                                onChangeText={(text) => setEmail({ value: text, error: "" })}
                                error={!!email.error}
                                errorText={email.error}/>
                    <TouchableOpacity style={styles.dropDownContainer}>
                        <Dropdown placeholder={t('academicpage.dialog.city')} label={t('academicpage.dialog.city')}
                                  data={cities.map((cityIn) => ({
                                    label: cityIn.label,
                                    value: cityIn.label,
                                  }))}
                                  value={city}
                                  setValue={setCity}/>
                        <Dropdown placeholder={t('academicpage.dialog.degree')} label={t('academicpage.dialog.degree')}
                                  data={degrees.map((degreeIn) => ({
                                    label: degreeIn.label,
                                    value: degreeIn.id.toString(),
                                  }))}
                                  value={degree}
                                  setValue={setDegree}/>
                    </TouchableOpacity>
                    <TextInput  label={t('academicpage.dialog.subject')}
                                returnKeyType="next"
                                value={subject.value}
                                onChangeText={(text) => setSubject({ value: text, error: "" })}
                                error={!!subject.error}
                                errorText={subject.error}/>
                    <TextInput  label={t('academicpage.dialog.company')}
                                returnKeyType="next"
                                value={company.value}
                                onChangeText={(text) => setCompany({ value: text, error: "" })}
                                error={!!company.error}
                                errorText={company.error}/>
                    <TextInput  label={t('academicpage.dialog.job')}
                                returnKeyType="next"
                                value={career.value}
                                onChangeText={(text) => setCareer({ value: text, error: "" })}
                                error={!!career.error}
                                errorText={career.error}/>
                    <TouchableOpacity style={styles.dropDownContainer}>
                        <Dropdown placeholder={t('academicpage.dialog.sex')} label={t('academicpage.dialog.sex')}
                                  data={genderData}
                                  value={gender}
                                  setValue={setGender}/>
                    </TouchableOpacity>
                    <TextInput  label={t('academicpage.dialog.phone')}
                                returnKeyType="next"
                                value={phoneNumber.value}
                                onChangeText={(text) => setPhoneNumber({ value: text, error: "" })}
                                error={!!phoneNumber.error}
                                errorText={phoneNumber.error} />
                    {/* <Button title={t('academicpage.dialog.upload')} onPress={selectImage}/>
                    {selectedImage && (
                        <Image
                            source={{uri: selectedImage}}
                            style={{width: 200, height: 200}}
                        />
                    )} */}
                    {/* <div> */}
                        {/* <ImageUploadButton/> */}
                        {/* {selectedImage && <img src={URL.createObjectURL(selectedImage)} alt="Selected" />} */}
                    {/* </div> */}
                    <CheckBox
                        title={t('academicpage.dialog.checkbox')}
                        checked={checked}
                        onPress={() => {setChecked(!checked)}}
                    />
                    <TouchableOpacity style={styles.sendButton} onPress={toggleModal}>
                        <Text style={styles.sendButtonText}>{t('contactpage.submit')}</Text>
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
        // backgroundColor: 'white',
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

const cities = getCityList;
const degrees = getDegreeList;

const genderData = [
    {label: 'Male', value: '1'},
    {label: 'Female', value: '2'},
];

