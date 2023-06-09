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
    Dimensions,
} from 'react-native';
import Header from '../components/Header';
import Dropdown from "../components/DropDown";
import Modal from '../components/Modal'
import { getDegreeList } from '../lists/degree';
import { getCityList } from '../lists/list';

const window = Dimensions.get('window');


export default function SearchScreen({navigation}) {
    const {t, i18n} = useTranslation();
    const [modalVisible, setModalVisible] = useState(false);
    const handleOpenPDF = async () => {
        try {
         
          const localUri = require('../../assets/terms.pdf');
    
       
          navigation.navigate('PDFScreen', { uri: localUri });
        } catch (error) {
          console.log('Error opening PDF:', error);
        }
      };
    const openInstagram = () => {
        const instagramURL = 'https://www.instagram.com/almuntada_/?fbclid=IwAR1SIvAHoEaeXCxT1pDt1mzbfSL_8A7tOeBpB-GSRur81TELRu28gdgtG5I';
        Linking.openURL(instagramURL);
      };
      const openLinkedin = () => {
        const linkedinURL = 'https://www.linkedin.com/company/almuntada';
        Linking.openURL(linkedinURL);
      };
      const openFacebook = () => {
        const facebookURL = 'https://www.facebook.com/Almuntada.ac';
        Linking.openURL(facebookURL);
      };
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
                                  label: degree.name,
                                  value: degree.id.toString(),
                                }))}
                            />
                            <Dropdown
                                placeholder={t('academicpage.acdemics.Area')}
                                label={t('academicpage.acdemics.Area')}
                                data={cities.map((city) => ({
                                    label: city.label,
                                    value: city.label,
                                  }))}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <Modal modalVisible={modalVisible} toggleModal={toggleModal}/>
                <View style={{marginTop: 20, paddingHorizontal: 20,}}>  
                    <View style={{height: 70}}/>
                    <View style={styles.rectangular}>
                    <View style={styles.halfReg}>
                    <View style={{height: 20}}/>
                    <Text style={styles.TextInfo}>{t('footer.contactus')}</Text>
                    <View style={{height: 20}}/>
                    <View style={styles.info}> 
                    <FontAwesome name="phone" style={{fontSize:20,color: '#05063F' }} />
                     <View style={{width: 10}}/> 
                    <Text style={styles.nfo}>052-9086918</Text>
                        </View>
                        <View style={{height: 10}}/>
                        <View style={styles.info}> 
                        <FontAwesome name="envelope" style={{fontSize:20,color: '#05063F' }} />
                     <View style={{width: 10}}/> 
                    <Text style={styles.nfo}>almuntada.ac@gmail.com</Text>
                        </View>
                    </View>
                    <View style={{width: 50}}/> 
                    <View style={styles.halfReg}>
                    <View style={{width: 10}}/> 
                    <View style={{height: 20}}/>
                    <Image source={require("../../assets/FinalLogo.png")} style={{width: 100, height: 50 }}/>
                    <View style={{height: 10}}/>
                    <View style={styles.info}>  
                  <TouchableOpacity onPress={openInstagram}>
                    <View>
                  <FontAwesome name="instagram" style={{fontSize:20,color: '#05063F' }} />
                 </View>
                 </TouchableOpacity>

                         
                        <View style={{width: 15 , }}/>
                        <TouchableOpacity onPress={openLinkedin}>
                        <FontAwesome name="linkedin" style={{fontSize:20,color: '#05063F' }} />
                        </TouchableOpacity>
                        <View style={{width: 15}}/>
                        <TouchableOpacity onPress={openFacebook}>
                        <FontAwesome name="facebook" style={{fontSize:20 ,color: '#05063F'}} />
                        </TouchableOpacity>
                        
                        </View>
                        </View>
                        </View>
                    </View>
                    <View style={{height: 120}}/>
                   <View style={styles.end} >
                   <View style={styles.halfReg}>
                    <View style={{height: 10}}/>
                   <Text style={styles.TextEnd}>Copyrights.Al-Hassouna-2023 All rights Reserved</Text>
                   </View>
                    <View style={styles.halfReg}>
                    <View style={{height: 10}}/>
                    <TouchableOpacity onPress={handleOpenPDF}>
                    <Text style={styles.TextEnd}>Privacy Policy&Terms of use</Text>
                    </TouchableOpacity>
                    <View style={{height: 30}}/>
                    </View>
                   </View>
                    
                   
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
        flexGrow: 1,
        alignItems: "center",
        paddingBottom: 20,
    },
    logo: {
        width: 200,
        height: 75,
        resizeMode: "contain",
    },
    joinButton: {
        backgroundColor: "#041041",
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
    padding:10,
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