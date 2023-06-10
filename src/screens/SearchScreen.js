import React, {useEffect, useState} from 'react';
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
    const [academics, setAcademics] = useState([]);
    const [city, setCity] = useState('');
    const [degree, setDegree] = useState('');

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
          const response = await axios.get('https://almuntada.onrender.com/api/v1/academic/isApproved/true');
          setAcademics(response.data);
        } catch (error) {
          console.error(error);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.card} key={item.id}>
          <Image style={styles.image} source={{ uri: item.imageUrl }} />
            <View style={styles.detailsContainer}>
                <Text style={styles.fullName}>{`${item.firstName} ${item.lastName}`}</Text>
                <Text style={styles.email}>{item.email}</Text>
                <Text style={styles.city}>{item.city}</Text>
                <Text style={styles.degree}>{item.degree}</Text>
            </View>
        {/* <Text style={styles.videoTitle}>{item.title}</Text> */}
        </View>
    );

    const filteredData = academics.filter((item) => {
        if (city && degree) {
          return item.city === city && item.degree === degree;
        } else if (city !== '') {
          return item.city === city;
        } else if (degree !== '') {
          return item.degree === degree;
        }
        return true; 
    });

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
                     {/* <View style={{height: 50}}/>  */}
                            <Text style={styles.slideTitle}>{t('academicpage.title')}</Text>
                            <Text style={styles.slideText}>{t('academicpage.text')}</Text>
                        </View>
                        {/* <View style={{height: 30}}/>  */}
                        
                <TouchableOpacity onPress={toggleModal} style={styles.joinButton}>
                    <Text style={styles.joinButtonText}>{t('homepage.joinus')}</Text>
                </TouchableOpacity>
                {/* <View> */}
                {/* <View style={{height: 100}}/>  */}
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
                {/* </View> */}
                
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
end:{
    width:Dimensions.get("window").width,
    backgroundColor:'#092D82',
    flexDirection: 'row',
    alignSelf: 'flex-start',
    bottom:0,
    position: 'absolute',
},

card: {
    flexDirection: 'column',  // Change to column layout
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
    width: '90%',
    height: '60%',
    alignSelf: 'center',
    // borderRadius: 40,
    marginBottom: 10,  // Move the margin to the bottom
  },
  detailsContainer: {
    flex: 1,
    alignItems: 'center',  // Align the details in the center
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