import React, {useState, useRef, useEffect} from "react";
import {I18nextProvider, useTranslation} from 'react-i18next';
import LanguageContext from '../components/LanguageContext';
import { I18nManager } from 'react-native';
import Header from "../components/Header";
import {StyleSheet, SafeAreaView, Image, ScrollView, View, Text, Dimensions, FlatList,} from "react-native";

const window = Dimensions.get('window');
const images = [
    require("../../assets/home.png"),
    require("../../assets/home.png"),
    require("../../assets/home.png"),
];


export default function App({navigation}) {
    const {t, i18n} = useTranslation();
    const data = [
        {id: 1, text: t('homepage.goals.0.desc')},
        {id: 2, text: t('homepage.goals.1.desc')},
        {id: 3, text: t('homepage.goals.2.desc')},
    ];
   
    // Render each item in the list
    
    const renderItem = ({ item }) => {
        if (i18n.language === 'AR') {
          return (
            <View style={styles.listItem}>
              <Text style={styles.text}>{item.text}</Text>
              <View style={{ width: 30 }} />
              <View style={styles.square}>
                <Text style={[styles.number]}>
                  {item.id}
                </Text>
              </View>
            </View>
          );
        } else if (i18n.language === 'EN') {
          return (
            <View style={styles.listItem}>
              <View style={styles.square}>
                <Text style={[styles.number]}>
                  {item.id}
                </Text>
              </View>
              <View style={{ width: 30 }} />
              <Text style={styles.text}>{item.text}</Text>
            </View>
          );
        } else {
          // Default case if language is not Arabic, Hebrew, or English
          return (
            <View style={styles.listItem}>
              <Text style={styles.text}>{item.text}</Text>
              <View style={{ width: 30 }} />
              <View style={styles.square}>
                <Text style={[styles.number]}>
                  {item.id}
                </Text>
              </View>
            </View>
          );
        }
      };
    
      

    const scrollViewRef = useRef(null);


    return (
        <I18nextProvider i18n={i18n}>
          <SafeAreaView style={styles.container}>
            <Header style={styles.header} navigation={navigation} />
            <ScrollView
            nestedScrollEnabled
              contentContainerStyle={styles.pageContainer}
            //   ref={scrollViewRef}
              showsVerticalScrollIndicator={false}
            >
              <Image source={require("../../assets/FinalLogo.png")} style={styles.logo} />
              <View style={styles.sliderContainer}>
                <ScrollView
                  ref={scrollViewRef}
                  nestedScrollEnabled
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                >
                  {images.map((image, index) => (
                    <View key={index} style={styles.slide}>
                      <Image source={image} style={styles.image} />
                    </View>
                  ))}
                </ScrollView>
                <View style={styles.slideTextContainer}>
                  <Text style={styles.slideText}>{t('homepage.title')}</Text>
                  <Text style={styles.slideText}>{t('homepage.title_1')}</Text>
                  <Text style={styles.slideText}>{t('homepage.title_2')}</Text>
                </View>
              </View>
              <View style={styles.slideIntroductionContainer}>
                <Text style={styles.title}>{t('homepage.about')}</Text>
                <View style={{ height: 20 }} />
      
                <Text style={styles.introduction}>
                  {t('homepage.description')}
                </Text>
                <View style={{ height: 50 }} />
                <Text style={styles.title}>{t('homepage.about_2')}</Text>
                <View style={{ height: 20 }} />
                <Text style={styles.introduction}>
                  {t('homepage.description_2')}
                </Text>
              </View>
      
              <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
                <View style={{ height: 70 }} />
      
                <Image
                  source={require('../../assets/ourMessage.png')}
                  style={{ width: 300, height: 300, marginLeft: 20 }}
                />
                <View style={{ height: 20 }} />
                <View>
                  <Text style={{
                    fontSize: 30,
                    color: "#f58723",
                    fontWeight: "bold",
                  }}>{t('homepage.vision.sub.title')}</Text>
                  <Text style={styles.introduction}>
                    {t('homepage.vision.desc')}
                  </Text>
                  <View style={{ height: 40 }} />
                  <Text style={{
                    fontSize: 30,
                    color: "#f58723",
                    fontWeight: "bold",
                  }}>{t('homepage.message.sub.title')}</Text>
                  <Text style={styles.introduction}>
                    {t('homepage.message.desc')}
                  </Text>
                </View>
      
              </View>
              <View style={{ marginTop: 20, padding: 30 }}>
                <View style={{ height: 70 }} />
                <Text style={{
                  fontSize: 30,
                  color: "#f58723",
                  fontWeight: "bold",
                }}>{t('homepage.goals.title')}</Text>
                <View style={{ height: 30 }} />
                <Image
                  source={require('../../assets/goals.png')}
                  style={{ width: 350, height: 310 }}
                />
      
                <View style={{ flexDirection: 'row' }}>
                  {/* <FlatList
                  horizontal={true}
                    data={data}
                    nestedScrollEnabled={true}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                  /> */}
                </View>
              </View>
              <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
                <Text style={styles.title}>{t('homepage.impact.sub.title')}</Text>
                <View style={{ height: 30 }} />
                <Text style={styles.introduction}>
                  {t('homepage.impact.desc')} </Text>
              </View>
              <View style={{ height: 30 }} />
              <Image
                source={require('../../assets/impact.png')}
                style={{ width: 300, height: 300, marginLeft: 20 }}
              />
      
              <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
                <View>
                  <Text style={styles.title}>{t('homepage.missfix.sub.title')}</Text>
                  <View style={{ height: 30 }} />
                  <Text style={styles.introduction}>
                    {t('homepage.missfix.desc')} </Text>
                </View>
              </View>
              <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
                <Text style={styles.title}>{t('homepage.founder.title')}</Text>
                <View style={{ height: 20 }} />
                <View style={styles.squ}>
                  <Image
                    source={require('../../assets/Alaa.png')}
                    style={{ width: 200, height: 200, marginLeft: 20 }}
                  />
                  <Text style={styles.Names}>{t('homepage.founders.1.name')}</Text>
                  <View style={{ height: 30 }} />
                  <Text style={styles.text}>{t('homepage.founders.1.desc')}</Text>
                </View>
              </View>
              <View style={{ flex: 1 }}>
                <View style={{ height: 30 }} />
              </View>
              <View style={styles.squ}>
                <View style={{ height: 20 }} />
                <Image
                  source={require('../../assets/hassan.png')}
                  style={{ width: 250, height: 300, marginLeft: 20 }}
                />
      
                <Text style={styles.Names}>{t('homepage.founders.0.name')}</Text>
                <View style={{ height: 20 }} />
                <Text style={styles.text}>{t('homepage.founders.0.desc')}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <View style={{ height: 30 }} />
              </View>
              <View style={{ height: 30 }} />
            </ScrollView>
          </SafeAreaView>
        </I18nextProvider>
      );
      
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 30,
    },
    pageContainer: {
        flexGrow: 1,
        alignItems: "center",
        paddingBottom: 20,
        // zIndex: 1,
    },
    
    logo: {
        width: 200,
        height: 75,
        resizeMode: "contain",
        marginTop: 20,
    },
    sliderContainer: {
        height: Dimensions.get("window").height / 3,
        width: "100%",
        marginTop: 10,
    },
    slide: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: Dimensions.get("window").width,
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    slideTextContainer: {
        position: "absolute",
        top: 50,
        width: "100%",
        alignItems: "center",

    },
    slideText: {
        paddingVertical: 10,
        fontSize: 25,
        fontWeight: "bold",
        color: "white",

        borderColor: "blue",
        textAlign: "center",
    },
    slideIntroductionContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
        //textAlign: "left",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#f58723",
        top: 40,
        marginBottom: 10,
       // textAlign: "left",
    },
    introduction: {
        top: 20,
        fontSize: 15,
        fontWeight: "bold",
        color: "black",
        //textAlign: "left",
        panding: 10,
    },
    listItem: {
        top: 15,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        height: 200,
        width: 300,
        
    },
    number: {
        fontWeight: 'bold',
        left: 5,
        fontSize: 16,
        marginRight: 10,
        color: "#f58723",
        textAlign: "center",
        
    },
    text: {
        fontSize: 15,
        left: 10,
        top: 10,
        panding: 100,
        fontWeight: "bold",
        padding:10,
    },
    square: {
        width: 20,
        height: 25,
        backgroundColor: '#00008b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
      
      
    },
    squ: {
        width: 300,
        height: 500,
        shadowColor: '#000000',
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 0.5, // for Android shadows
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: "black",
        top: 50,
    },

    Names: {
        top: 20,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20,
    },
});
