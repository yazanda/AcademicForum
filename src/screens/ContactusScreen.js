import React, {useState, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import LanguageContext from '../components/LanguageContext';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import Header from '../components/Header';
import TextInputComponent from '../components/TextInput';
import Dropdown from "../components/DropDown";
import axios from 'axios';

 const ContactUsScreen = ({navigation}) => {
    const {t, i18n} = useTranslation();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [requiredError, setrequiredError] = useState('');
    const data = t('contactpage.subjects', { returnObjects: true });

    const handleSend = async () => {
        try {
          const response = await axios.post('https://almuntada.onrender.com/api/v1/contact', {
            fullName: fullName,
            email: email,
            subject: subject,
            message: message
          });
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
        setFullName('');
        setEmail('');
        setSubject('');
        setMessage('');
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header
                style={styles.header}
                navigation={navigation}
            />
            <TouchableOpacity onPress={() => navigation.navigate("StartScreen")}>
                <Image
                    source={require("../../assets/FinalLogo.png")}
                    style={styles.logo}
                />
            </TouchableOpacity>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <View>
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
                        <Text style={styles.sendButtonText}>Send</Text>
                    </TouchableOpacity>
                </View>
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
    // header: {
    //     flexDirection: 'row',
    //     // justifyContent: 'space-between',
    //     // alignItems: 'center',
    // },
    contentContainer: {
        flex: 1,
    },
    logo: {
        width: 200,
        height: 75,
        alignSelf: 'center', // Center the logo horizontally
        resizeMode: "contain",
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
