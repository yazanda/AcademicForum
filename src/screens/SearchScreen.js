import React, {useState} from 'react';
import {FontAwesome} from '@expo/vector-icons';
import {useTranslation} from 'react-i18next';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    Linking,
} from 'react-native';
import Header from '../components/Header';
import Dropdown from "../components/DropDown";
import Modal from '../components/Modal'
import { getDegreeList } from '../lists/degree';
import { getCityList } from '../lists/list';
import End from '../components/End';

const window = Dimensions.get('window');


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
            <ScrollView Style={styles.contentContainer}>
                <TouchableOpacity onPress={() => navigation.navigate("StartScreen")}>
                    <Image
                        source={require("../../assets/FinalLogo.png")}
                        style={styles.logo}
                    />
                </TouchableOpacity>
                <View style={styles.slideTextContainer}>
                     <View style={{height: 50}}/> 
                            <Text style={styles.slideTitle}>{t('academicpage.title')}</Text>
                            <Text style={styles.slideText}>{t('academicpage.text')}</Text>
                        </View>
                        <View style={{height: 30}}/> 
                        
                <TouchableOpacity onPress={toggleModal} style={styles.joinButton}>
                    <Text style={styles.joinButtonText}>{t('homepage.joinus')}</Text>
                </TouchableOpacity>
                <View>
                <View style={{height: 100}}/> 
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
                <End style={styles.End} navigation={navigation} /> 
                    
                   
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"white",
        flexGrow: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 30,
    },
    contentContainer: {
        flexGrow: 1,
        alignItems: "center",
        paddingBottom: 20,
        
    },
    logo: {
        width: 200,
        height: 75,
        resizeMode: "contain",
        alignSelf: 'center',
    },
    joinButton: {
        backgroundColor: "#041041",
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        alignSelf: 'center',
        
    },
    joinButtonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
        padding:10,
    },
    slideTextContainer: {
        height: Dimensions.get("window").height / 3,
        //width: "100%",
        marginTop: 10,
        alignItems:'center',

    },
    label: {
        paddingTop: 16,
        fontSize: 22,
        color: 'darkorange',
        fontWeight: "bold",
        padding:20,
    },
    dropDownContainer: {
        paddingTop: 16,
    },
    dropDown: {
        width: '100%',
    },
    sliderContainer: {
        height: Dimensions.get("window").height / 3,
        //width: "100%",
        marginTop: 10,
        alignItems:'center',

    },
    slideTitle:{
        paddingVertical: 10,
        fontSize: 25,
        fontWeight: "bold",
        color: '#041041',
        padding:10,
        borderColor: "blue",
        textAlign: "center",
    },
    slideText:{
        paddingVertical: 10,
        fontSize: 20,
        fontWeight: "bold",
        color: '#041041',
        padding:10,
        borderColor: "blue",
        textAlign: "center",
    },
    rectangular:{
        width:Dimensions.get("window").width,
        backgroundColor:'#F7FAF8',
        flexDirection: 'row',
        alignSelf: 'flex-start',
        
   },
   text: {
    fontSize: 20,
    left: 10,
    top: 10,
    padding: 100,
    fontWeight: "bold",
    
},
halfReg:{
    flexDirection: 'column',
    width:(Dimensions.get("window").width/2)+10,
    padding:20,
},
info:{
    flexDirection: 'row',
},
nfo:{
    fontSize:14,
    fontWeight: "bold",
},
TextInfo:{
    fontSize:18,
    color:"#05063F",
    textAlign:'center',
    fontWeight: "bold",
},
end:{
    width:Dimensions.get("window").width,
    backgroundColor:'#092D82',
    flexDirection: 'row',
    alignSelf: 'flex-start',
    bottom:0,
    
   
    position: 'absolute',
   

},

TextEnd:{
color:'white',
},
})