import React, {useState, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import { FontAwesome } from '@expo/vector-icons';
import End from '../components/End';

import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    ScrollView,
    TouchableOpacity,
    Alert,
    Linking,
    Dimensions,
} from 'react-native';
import Header from '../components/Header';
import TextInput from '../components/TextInput';
import Dropdown from "../components/DropDown";
import axios from 'axios';
import Modal from 'react-native-modal';
const window = Dimensions.get('window');
 const ContactUsScreen = ({navigation}) => {
    const {t, i18n} = useTranslation();
    const [fullName, setFullName] = useState({ value: "", error: "" });
    const [email, setEmail] = useState({ value: "", error: "" });
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState({ value: "", error: "" });
    const data = t('contactpage.subjects', { returnObjects: true });
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
    
    const handleSend = async () => {
        try {
          const response = await axios.post('https://almuntada.onrender.com/api/v1/contact', {
            fullName: fullName.value,
            email: email.value,
            subject: subject,
            message: message.value,
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
            <ScrollView nestedScrollEnabled
              contentContainerStyle={styles.pageContainer}
            //   ref={scrollViewRef}
              showsVerticalScrollIndicator={false}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>{t('contactpage.title')}</Text>
                    <Text style={styles.titleText}>{t('contactpage.text')}</Text>
                </View>
                <View style={styles.inputsContainer}>
                    <TextInput
                      label={t('contactpage.fullname')}
                      value={fullName.value}
                      onChangeText={(text) => setFullName({ value: text, error: "" })}
                      error={!!fullName.error}
                      errorText={fullName.error}
                    />
                    <TextInput
                      label={t('contactpage.email')} 
                      value={email.value}
                      onChangeText={(text) => setEmail({ value: text, error: "" })}
                      error={!!email.error}
                      errorText={email.error}
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
                    <TextInput
                      label={t('contactpage.message')}
                      value={message.value}
                      onChangeText={(text) => setMessage({ value: text, error: "" })}
                      error={!!message.error}
                      errorText={message.error}
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
                <End style={styles.End} navigation={navigation} /> 

      
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
