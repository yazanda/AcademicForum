import React, {useState, useEffect} from 'react';
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
import * as ImagePicker from 'expo-image-picker';
import TextInput from './TextInput';
import {CheckBox} from 'react-native-elements';
import { getDegreeList } from '../lists/degree';
import { getCityList } from '../lists/list';
import axios from 'axios';

const MyModal = ({modalVisible, toggleModal}) => {
    const {t, i18n} = useTranslation();

    const [firstName, setFirstName] = useState({ value: "", error: "" });
    const [lastName, setLastName] = useState({ value: "", error: "" });
    const [email, setEmail] = useState({ value: "", error: "" });
    const [selectedDate, setSelectedDate] = useState(null);
    const [age, setAge] = useState({ value: "", error: "" });
    const [degree, setDegree] = useState({ value: "", error: "" });
    const [subject, setSubject] = useState({ value: "", error: "" });
    const [career, setCareer] = useState({ value: "", error: "" });
    const [city, setCity] = useState({ value: "", error: "" });
    const [gender, setGender] = useState({ value: "", error: "" });
    const [phoneNumber, setPhoneNumber] = useState({ value: "", error: "" });
    const [company, setCompany] = useState({ value: "", error: "" });
    const [checked, setChecked] = useState(false);

    // Function to handle image selection
    const [selectedImage, setSelectedImage] = useState(null);
    
      const openImagePicker = async () => {

        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            console.log('Permission to access image gallery denied');
            return;
        }     

        const result = await ImagePicker.launchImageLibraryAsync();
        if (result && !result.canceled) {
            const selectedImage = result.assets[0].uri;
            setSelectedImage(selectedImage);
        }
      };

      const uploadToCloudinary = async () => {
        try {
          const formData = new FormData();
          formData.append('file', selectedImage);
          formData.append('upload_preset', 'ml_default');
    
          const response = await axios.post(
            'https://api.cloudinary.com/v1_1/djc1iyjjm/image/upload',
            formData
          );
    
          console.log(response.data);
          // Handle the Cloudinary response here
        } catch (error) {
            if (error.response) {
                console.log('Error response:', error.response.data);
                console.log('Error status code:', error.response.status);
                console.log('Error headers:', error.response.headers);
              } else if (error.request) {
                console.log('No response received:', error.request);
              } else {
                console.log('Error:', error.message);
              }
          // Handle the error here
        }
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
                                  value={city.value}
                                  setValue={setCity}
                                  errorText={city.error}/>
                        <Dropdown placeholder={t('academicpage.dialog.degree')} label={t('academicpage.dialog.degree')}
                                  data={degrees.map((degreeIn) => ({
                                    label: degreeIn.label,
                                    value: degreeIn.id.toString(),
                                  }))}
                                  value={degree.value}
                                  setValue={setDegree}
                                  errorText={degree.error}/>
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
                                  value={gender.value}
                                  setValue={setGender}
                                  errorText={gender.error}/>
                    </TouchableOpacity>
                    <TextInput  label={t('academicpage.dialog.phone')}
                                returnKeyType="next"
                                value={phoneNumber.value}
                                onChangeText={(text) => setPhoneNumber({ value: text, error: "" })}
                                error={!!phoneNumber.error}
                                errorText={phoneNumber.error} />

                    <Button title={t('academicpage.dialog.imageurl')} onPress={openImagePicker} />
                    {selectedImage && (
                        <Button title="Upload Image" onPress={uploadToCloudinary} />
                    )}
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

