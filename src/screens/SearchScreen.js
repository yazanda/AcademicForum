import React, {useState} from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
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
import Dropdown from "../components/DropDown";
import Modal from '../components/Modal'

export default function SearchScreen({navigation}){
    const { t, i18n } = useTranslation();
    const [modalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
        setModalVisible(!modalVisible);
    }

    const data = [
        { label: 'Item 1', value: '1' },
        { label: 'Item 2', value: '2' },
        { label: 'Item 3', value: '3' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <Header
                style={styles.header}
                navigation={navigation}
            />
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <TouchableOpacity onPress={() => navigation.navigate("StartScreen")}>
                    <Image
                        source={require("../../assets/FinalLogo.png")}
                        style={styles.logo}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleModal} style={styles.joinButton} >
                    <Text style={styles.joinButtonText}>{t('homepage.joinus')}</Text>
                </TouchableOpacity>
                <View>
                    <Text style={styles.label}>{t('academicpage.acdemics')}</Text>
                    <View style={styles.dropDownContainer}>
                        <TouchableOpacity>
                            <Dropdown
                                placeholder = {t('academicpage.acdemicsField')} 
                                label = 'By Field'
                                data ={data}
                            />
                            <Dropdown
                                placeholder ={t('academicpage.acdemics.Area')} 
                                label = 'By Area'
                                data ={data}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <Modal modalVisible={modalVisible} toggleModal={toggleModal}/>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
    logo: {
        width: 200,
        height: 75,
        resizeMode: "contain",
    },
    joinButton: {
        backgroundColor: "#00008b",
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    joinButtonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
    },
    label: {
        paddingTop: 16,
        fontSize: 22,
        color: 'darkorange',
    },
    dropDownContainer: {
        paddingTop: 16,
    },
    dropDown: {
        width: '100%',
    },
})