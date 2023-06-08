import React, {useState} from 'react';
import {FontAwesome} from '@expo/vector-icons';
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
import Dropdown from "../components/DropDown";
import Modal from '../components/Modal'
import { getDegreeList } from '../lists/degree';
import { getCityList } from '../lists/list';

export default function SearchScreen({navigation}) {
    const {t, i18n} = useTranslation();
    const [modalVisible, setModalVisible] = useState(false);
    const [city, setCity] = useState('');
    const [degree, setDegree] = useState('');
    const toggleModal = () => {
        setModalVisible(!modalVisible);
    }

    const cities = getCityList;
    const degrees = getDegreeList;

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
                <TouchableOpacity onPress={toggleModal} style={styles.joinButton}>
                    <Text style={styles.joinButtonText}>{t('homepage.joinus')}</Text>
                </TouchableOpacity>
                <View>
                    <Text style={styles.label}>{t('academicpage.acdemics')}</Text>
                    <View style={styles.dropDownContainer}>
                        <TouchableOpacity>
                            <Dropdown
                                placeholder={t('academicpage.acdemicsField')}
                                label={t('academicpage.acdemicsField')}
                                data={degrees.map((degree) => ({
                                  label: degree.label,
                                  value: degree.id.toString(),
                                }))}
                                value={degree}
                                setValue={setDegree}
                            />
                            <Dropdown
                                placeholder={t('academicpage.acdemics.Area')}
                                label={t('academicpage.acdemics.Area')}
                                data={cities.map((city) => ({
                                    label: city.label,
                                    value: city.label,
                                  }))}
                                value={city}
                                setValue={setCity}
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
        // backgroundColor: 'white',
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