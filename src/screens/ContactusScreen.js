import React, {useState, useRef} from 'react';
import {useTranslation} from 'react-i18next';
// import LanguageContext from '../components/LanguageContext';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    ScrollView,
    TouchableOpacity,
    Alert,
} from 'react-native';
import Header from '../components/Header';
import TextInputComponent from '../components/TextInput';
import Dropdown from "../components/DropDown";
import axios from 'axios';
import Modal from 'react-native-modal';

 const ContactUsScreen = ({navigation}) => {
    const {t, i18n} = useTranslation();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [requiredError, setrequiredError] = useState('');
    const data = t('contactpage.subjects', { returnObjects: true });
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

    const handleSend = async () => {
        try {
          const response = await axios.post('https://almuntada.onrender.com/api/v1/contact', {
            fullName: fullName,
            email: email,
            subject: subject,
            message: message
          });
          console.log(response.data);
        if (response.status === 201) {
            setIsSuccessModalVisible(true);
            // Clear form fields after successful submission
            setFullName('');
            setEmail('');
            setSubject('');
            setMessage('');
          } else {
            Alert.alert('Error', 'Failed to send the form. Please try again.');
          }
        } catch (error) {
          console.error(error);
          Alert.alert('Error', 'An error occurred while sending the form. Please try again.');
        }
    };

    const handleCloseSuccessModal = () => {
        setIsSuccessModalVisible(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header
                style={styles.header}
                navigation={navigation}
            />
            <TouchableOpacity onPress={() => navigation.navigate("StartScreen")} style={styles.logoContainer}>
                <Image
                    source={require("../../assets/FinalLogo.png")}
                    style={styles.logo}
                />
            </TouchableOpacity>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>{t('contactpage.title')}</Text>
                    <Text style={styles.titleText}>{t('contactpage.text')}</Text>
                </View>
                <View style={styles.inputsContainer}>
                    <TextInputComponent
                      label={t('contactpage.fullname')}
                      placeholder={t('contactpage.fullname')}
                      value={fullName}
                      setValue={setFullName}
                      errorText={requiredError}
                    />
                    <TextInputComponent
                      label={t('contactpage.email')} 
                      placeholder={t('contactpage.email')}
                      value={email}
                      setValue={setEmail}
                      errorText={requiredError}
                      />
                    <TouchableOpacity style={styles.dropDownContainer}>
                        <Dropdown
                            placeholder={t('contactpage.subject')}
                            label={t('contactpage.subject')}
                            data={data}
                            value={subject}
                            setValue={setSubject}
                        />
                    </TouchableOpacity>
                    <TextInputComponent
                      label={t('contactpage.message')}
                      placeholder={t('contactpage.message')}
                      value={message}
                      setValue={setMessage}
                      errorText={requiredError}
                      />
                    <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                        <Text style={styles.sendButtonText}>{t('contactpage.submit')}</Text>
                    </TouchableOpacity>
                </View>
                <Modal isVisible={isSuccessModalVisible}>
                    <View style={styles.modalContainer}>
                      <Text style={styles.modalText}>{t('contactpage.send.title')}</Text>
                      <TouchableOpacity style={styles.modalButton} onPress={handleCloseSuccessModal}>
                        <Text style={styles.modalButtonText}>Close</Text>
                      </TouchableOpacity>
                    </View>
                </Modal>
            </ScrollView>
        </SafeAreaView>
    )

}

export default ContactUsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
    },
    contentContainer: {
        flex: 1,
    },
    inputsContainer: {
        paddingTop: 20,
    },
    title: {
        marginTop: 10,
    },
    titleText: {
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
    logoContainer: {
        width: 200,
        height: 75,
        alignSelf: 'center', 
        resizeMode: "contain",
    },
    logo: {
        width: 200,
        height: 75,
        alignSelf: 'center', 
        resizeMode: "contain",
    },
    sendButton: {
        backgroundColor: "green",
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        width: '50%',
        alignSelf: 'center', 
        marginTop: 20, 
        alignItems: 'center',
    },
    sendButtonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
      },
      modalText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
      },
      modalButton: {
        backgroundColor: 'green',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
      },
      modalButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
      },
});
