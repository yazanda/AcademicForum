import React, {useEffect, useState, useRef} from 'react';
import { StatusBar } from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import {useTranslation} from 'react-i18next';
import axios from 'axios';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    Platform,
} from 'react-native';
import Dropdown from "../components/DropDown";
import Modal from '../components/Modal'
import { getDegreeList } from '../lists/degree';
import { getCityList } from '../lists/list';
import End from '../components/End';

const window = Dimensions.get('window');


export default function SearchScreen({navigation}) {
    const {t, i18n} = useTranslation();
    const [modalVisible, setModalVisible] = useState(false);
    const [academics, setAcademics] = useState([]);
    const [city, setCity] = useState({ value: "", error: "" });
    const [degree, setDegree] = useState({ value: "", error: "" });

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    }

    const cities = getCityList;
    const degrees = getDegreeList;

    useEffect(() => {
        fetchAcademics();
    }, []);

    const fetchAcademics = async () => {
        try {
          const response = await axios.get('https://almuntada.onrender.com/api/v1/academic/careers');
          setAcademics(response.data);
        } catch (error) {
          console.error(error);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.card} key={item.user[0].id}>
          <Image style={styles.image} source={{ uri: item.user[0].imageUrl }} />
            <View style={styles.detailsContainer}>
                <Text style={styles.fullName}>{`${item.user[0].firstName} ${item.user[0].lastName}`}</Text>
                <Text style={styles.email}>{item.user[0].email}</Text>
                <Text style={styles.city}>{item.user[0].city}</Text>
                <Text style={styles.degree}>{`${item.user[0].degree} : ${item.career}`}</Text>
            </View>
        </View>
    );

    const filteredData = academics.filter((item) => {
        if (city.value && degree.value) {
          return item.user[0].city === city.value && item.user[0].degree === degree.value && item.user[0].isApproved;
        } else if (city.value !== '') {
          return item.user[0].city === city.value && item.user[0].isApproved;
        } else if (degree.value !== '') {
          return item.user[0].degree === degree.value && item.user[0].isApproved;
        }
        return item.user[0].isApproved; 
    });

    const [isSideBarOpen, setSideBarOpen] = useState(false);
    const sidebarRef = useRef(null);

    const handleMenuPress = () => {
        setSideBarOpen(!isSideBarOpen);
    }

    const handleLanguageChange = (language) => {
        i18n.changeLanguage(language);
        setSideBarOpen(false);
    };
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.sideBarContainer}>
                <TouchableOpacity onPress={handleMenuPress} style={styles.menuButton}>
                    {isSideBarOpen ? (
                        <FontAwesome name="times" size={24} color="black"/>
                    ) : (
                        <FontAwesome name="bars" size={24} color="black"/>
                    )}
                </TouchableOpacity>
                {isSideBarOpen && (
                    <ScrollView
                        ref={sidebarRef}
                        contentContainerStyle={styles.sidebarContentContainer}
                    >
                        <View style={styles.languageContainer}>
                            <TouchableOpacity
                                onPress={() => handleLanguageChange('EN')}
                                style={styles.sidebarButton}
                            >
                                <Text style={styles.sidebarButtonText}>EN</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => handleLanguageChange('AR')}
                                style={styles.sidebarButton}
                            >
                                <Text style={styles.sidebarButtonText}>AR</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => handleLanguageChange('HE')}
                                style={styles.sidebarButton}
                            >
                                <Text style={styles.sidebarButtonText}>HE</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                handleMenuPress();
                                navigation.navigate('SearchScreen');
                            }}
                            style={styles.sidebarButton}
                        >
                            <Text style={styles.sidebarButtonText}>{t('navbar.search')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                handleMenuPress();
                                navigation.navigate('PodcastScreen');
                            }}
                            style={styles.sidebarButton}
                        >
                            <Text style={styles.sidebarButtonText}>{t('navbar.podcast')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                handleMenuPress();
                                navigation.navigate('ContactUsScreen');
                            }}
                            style={styles.sidebarButton}
                        >
                            <Text style={styles.sidebarButtonText}>{t('navbar.contact')}</Text>
                        </TouchableOpacity>
                    </ScrollView>
                )}
            </View>
            <ScrollView Style={styles.contentContainer}>
                <TouchableOpacity onPress={() => navigation.navigate("StartScreen")} style={styles.logoContainer}>
                    <Image
                        source={require("../../assets/FinalLogo.png")}
                        style={styles.logo}
                    />
                </TouchableOpacity>
                <View style={styles.slideTextContainer}>
                            <Text style={styles.slideTitle}>{t('academicpage.title')}</Text>
                            <Text style={styles.slideText}>{t('academicpage.text')}</Text>
                        </View>
                        
                <TouchableOpacity onPress={toggleModal} style={styles.joinButton}>
                    <Text style={styles.joinButtonText}>{t('homepage.joinus')}</Text>
                </TouchableOpacity>
                <Modal modalVisible={modalVisible} toggleModal={toggleModal}/>
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
                                value={degree.value}
                                setValue={setDegree}
                                errorText={degree.error}
                            />
                            <Dropdown
                                placeholder={t('academicpage.acdemics.Area')}
                                label={t('academicpage.acdemics.Area')}
                                data={cities.map((city) => ({
                                    label: city.label,
                                    value: city.label,
                                  }))}
                                value={city.value}
                                setValue={setCity}
                                errorText={city.error}
                            />
                        </TouchableOpacity>
                        
                    </View>
                
                <View style={styles.pageContent}>
                    {filteredData.map((item) => renderItem({ item }))}
                </View>

                <End style={styles.end} navigation={navigation} />
                      
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"white",
        flexGrow: 1,
        ...Platform.select({
            android: {
                paddingTop: 40,
            },
        }),
    },
    languageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    sideBarContainer: {
        flexGrow: 1,
    },
    sidebarContentContainer: {
        flexGrow: 1,
        paddingLeft: 64,
        paddingRight: 64,
        width: '100%',
        height: '100%',
    },
    menuButton: {
        paddingLeft: 16,
        paddingTop: 8,
        height: 40,
    },
    sidebarButton: {
        marginTop: 8,
        marginBottom: 16,
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: '#f58723',
        borderRadius: 8,
    },
    sidebarButtonText: {
        alignSelf: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    contentContainer: {
        flexGrow: 1,
        alignItems: "center",
        paddingBottom: 20,
        
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
        marginTop: 10,
        alignItems:'center',
        padding: 10,

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
end:{
    width:Dimensions.get("window").width,
    backgroundColor:'#092D82',
    flexDirection: 'row',
    alignSelf: 'flex-start',
    bottom:0,
    position: 'absolute',
},

card: {
    flexDirection: 'column', 
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    width: '70%',
    height: 320,
    alignSelf: 'center'
  },
  image: {
    width: '80%',
    height: '60%',
    alignSelf: 'center',
    borderRadius: 15,
    marginBottom: 10, 
  },
  detailsContainer: {
    flex: 1,
    alignItems: 'center', 
  },
  fullName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    marginBottom: 5,
  },
  city: {
    fontSize: 14,
    marginBottom: 5,
  },
  degree: {
    fontSize: 14,
    color: 'gray',
  },
  
  pageContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
},
})