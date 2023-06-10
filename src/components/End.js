import React, {useState} from 'react';
import {StyleSheet, SafeAreaView, Image, ScrollView, View, Text, Dimensions, FlatList, TouchableOpacity,Linking} from "react-native";
import {FontAwesome} from '@expo/vector-icons';
import {useTranslation} from 'react-i18next';
import {I18nextProvider} from 'react-i18next';
import LanguageContext from '../components/LanguageContext';

const window = Dimensions.get('window');

const End = ({navigation}) => {
    const {t, i18n} = useTranslation();
    const [modalVisible, setModalVisible] = useState(false);
    // const handleOpenPDF = async () => {
    //     try {
         
    //       const filePath = '../../assets/terms.pdf'; // Replace with the actual path of your file
    //       const fileContent = await readFile(filePath, 'utf8');
    //       console.log('File content:', fileContent);
    //     } catch (error) {
    //       console.log('Error opening PDF:', error);
    //     }
    //   };
    
   
      
    
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
      return ( 
        <SafeAreaView>
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
                            <View style={{width: 15}}/>
                            <TouchableOpacity onPress={openLinkedin}>
                            <FontAwesome name="linkedin" style={{fontSize:20,color: '#05063F' }} />
                            </TouchableOpacity>
                            <View style={{width: 15}}/>
                           <TouchableOpacity onPress={openFacebook}>
                           <FontAwesome name="facebook" style={{fontSize:20 ,color: '#05063F'}} />
                           </TouchableOpacity>
                    </View>
                    <View style={{height: 30}}/>
                    </View>
                    </View>
                    <View style={{height: 140}}/>
                <View style={styles.end} >
                   <View style={styles.halfReg}>
                        <View style={{height: 10}}/>
                        <Text style={styles.TextEnd}>Copyrights.Al-Hassouna-2023 All rights Reserved</Text>
                    </View>
                    <View style={styles.halfReg}>
                        <View style={{height: 10}}/>
                        {/* <TouchableOpacity onPress={handleOpenPDF}> */}
                        <Text style={styles.TextEnd}>Privacy Policy&Terms of use</Text>
                        {/* </TouchableOpacity> */}
                        <View style={{height: 30}}/>
                    </View>
                </View>
                </SafeAreaView>
      );

};export default End;

const styles = StyleSheet.create({
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



