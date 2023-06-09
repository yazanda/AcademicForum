import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, ScrollView, Text, Image, FlatList, TouchableOpacity, I18nManager ,Dimensions,Linking} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Video } from 'expo-av';
import axios from 'axios';
import { FontAwesome } from '@expo/vector-icons';

import Header from '../components/Header';
const window = Dimensions.get('window');

export default function PodcastScreen({navigation}) {
    const [videos, setVideos] = useState([]);
    const {t, i18n} = useTranslation();
    const isRTL = I18nManager.isRTL;
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

    useEffect(() => {
        fetchVideos();
    }, []);

    const fetchVideos = async () => {
        try {
          const response = await axios.get('https://almuntada.onrender.com/api/v1/podcasts/isActive/true');
          setVideos(response.data);
        } catch (error) {
          console.error(error);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.videoContainer} key={item.id}>
          <Video
            source={{ uri: item.podcastUrl }}
            style={styles.video}
            shouldPlay
            resizeMode="cover"
            useNativeControls 
          />
          <Text style={styles.videoTitle}>{item.title}</Text>
        </View>
    );


    return (
        <SafeAreaView style={styles.container}>
            <Header
                style={styles.header}
                navigation={navigation}
            />
            <ScrollView  nestedScrollEnabled
              contentContainerStyle={styles.pageContainer}
            //   ref={scrollViewRef}
              showsVerticalScrollIndicator={false}
            >
                <TouchableOpacity onPress={()=> navigation.navigate("StartScreen")}>
                <TouchableOpacity onPress={()=> navigation.navigate("StartScreen")} style={styles.logoContainer}></TouchableOpacity>
                    <Image
                        source={require("../../assets/FinalLogo.png")}
                        style={styles.logo}
                    />
                </TouchableOpacity>
                <View style={styles.pageContent}>
                    <Text style={[styles.firstText, isRTL && styles.rtlText]}>{t('podcastpage.desc')}</Text>
                    <Text style={[styles.secondText, isRTL && styles.rtlText]}>{t('podcastpage.subdesc')}</Text>
                    {videos.map((item) => renderItem({ item }))}
                </View>
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
        backgroundColor:'white',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 30,
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
    pageContainer: {
        flexGrow: 1,
        alignItems: "center",
        paddingBottom: 20,
    },
    pageContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    firstText: {
        color: "black",
        textAlign: 'center',
        fontSize:20,
        fontWeight: "bold",
    },
    secondText: {
        color: "black",
        paddingTop: 10,
        textAlign: 'center',
        fontSize:20,
        fontWeight: "bold",
    },
    videoContainer: {
        paddingTop: 30,
        alignItems: "center",
        width: '100%',
        marginBottom: 16,
    },
    video: {
      width: 365,
      height: 200,
    },
    videoTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 8,
    },
    rtlText: {
        textAlign: 'right',
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
});