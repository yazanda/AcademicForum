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
import DatePicker from 'react-native-datepicker';
import TextInput from './TextInput';
import ImagePicker from "react-native-image-picker";
import {CheckBox} from 'react-native-elements';
import { getDegreeList } from '../lists/degree';
import { getCityList } from '../lists/list';

const MyModal = ({modalVisible, toggleModal}) => {
    const {t, i18n} = useTranslation();
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
                        <Text style={styles.closeButtonText}>{t('academicpage.dialog.close')}</Text>
                    </TouchableOpacity>
                    <TextInput placeholder={t('academicpage.dialog.first.name')}
                               label={t('academicpage.dialog.first.name')}/>
                    <TextInput placeholder={t('academicpage.dialog.last.name')}
                               label={t('academicpage.dialog.last.name')}/>
                    <TextInput placeholder={t('academicpage.dialog.Birhdate')}
                               label={t('academicpage.dialog.Birhdate')}/>
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
                    <TextInput placeholder={t('academicpage.dialog.email')} label={t('academicpage.dialog.email')}/>
                    <TouchableOpacity style={styles.dropDownContainer}>
                        <Dropdown placeholder={t('academicpage.dialog.city')} label={t('academicpage.dialog.city')}
                                  data={cities.map((city) => ({
                                    label: city.label,
                                    value: city.label,
                                  }))}/>
                        <Dropdown placeholder={t('academicpage.dialog.degree')} label={t('academicpage.dialog.degree')}
                                  data={degrees.map((degree) => ({
                                    label: degree.name,
                                    value: degree.id.toString(),
                                  }))}/>
                    </TouchableOpacity>
                    <TextInput placeholder={t('academicpage.dialog.subject')} label={t('academicpage.dialog.subject')}/>
                    <TextInput placeholder={t('academicpage.dialog.company')} label={t('academicpage.dialog.company')}/>
                    <TextInput placeholder={t('academicpage.dialog.job')} label={t('academicpage.dialog.job')}/>
                    <TouchableOpacity style={styles.dropDownContainer}>
                        <Dropdown placeholder={t('academicpage.dialog.sex')} label={t('academicpage.dialog.sex')}
                                  data={genderData}/>
                    </TouchableOpacity>
                    <TextInput placeholder={t('academicpage.dialog.phone')} style={styles.input}/>
                    <Button title={t('academicpage.dialog.upload')} onPress={selectImage}/>
                    {selectedImage && (
                        <Image
                            source={{uri: selectedImage}}
                            style={{width: 200, height: 200}}
                        />
                    )}
                    <CheckBox
                        title={t('academicpage.dialog.checkbox')}
                        checked={checked}
                        onPress={toggleCheckbox}
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

