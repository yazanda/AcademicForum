import React, { useState, useRef, useEffect } from "react";
import Header from "../components/Header";
import { StyleSheet, SafeAreaView, Image, ScrollView, View, Text, Dimensions , FlatList } from "react-native";

const window = Dimensions.get('window');
const images = [
  require("../../assets/home.png"),
  require("../../assets/home.png"),
  require("../../assets/home.png"),
];

const data = [
  { id: 1, text: 'Increasing the \n percentage of\n Arab academics \n every year by 40%\n for the\n next three years.' },
  { id: 2, text: 'Gathering\n academics in the \nmiddle to create cooperation\n between them.' },
  { id: 3, text: 'Making\n information \nabout the\n Academy available \nto the Arab \nuser in one place ' },
];

export default function App({ navigation }) {
    // Render each item in the list
    const renderItem = ({ item }) => (
      <View style={styles.listItem}>
        <View style={styles.square}>
          <Text style={styles.number}>{item.id}</Text>
        </View>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  
    const scrollViewRef = useRef(null);
  
  
    



  return (
    
    <SafeAreaView style={styles.container}>
      <Header style={styles.header} navigation={navigation} />
      <ScrollView contentContainerStyle={styles.pageContainer} ref={scrollViewRef} showsVerticalScrollIndicator={false}>
        <Image source={require("../../assets/FinalLogo.png")} style={styles.logo} />
        <View style={styles.sliderContainer}>
          <ScrollView
            ref={scrollViewRef}
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
            <Text style={styles.slideText}>المنتدى</Text>
            <Text style={styles.slideText}>البصمة الاكاديمية العربية</Text>
            <Text style={styles.slideText}>للتعاون, المشاركة والدعم</Text>
          </View>
        </View>
        <View style={styles.slideIntroductionContainer}>
          <Text style={styles.title}>About the Project</Text>
          <Text style={styles.introduction}>
            The Arab Academic Forum is a forum that brings together Arab academics from various fields and is based on developing higher education in the Arab community through participation, exchanging experiences and finding opportunities. It also aspires to be a reference for the next generation desiring higher academic education.
          </Text>
          <Text style={styles.title}>We too join the global goal of ending poverty</Text>
          <Text style={styles.introduction}>
            Poverty was defined as the lack of basic needs, food, water, medical care, security and education. . Studies prove that the percentage of academics among the Arab population is lower than the percentage of the academic Jewish population. There are many barriers and gaps between the Arab population and the Jewish population, including language and gaps in socio-economic status. We believe that academia is one of the keys to eradicating poverty.
          </Text>
        </View>
        <View style={{ padding: 110, flexDirection: 'row', alignItems: 'center' }}>
        <View>
    <Text style={styles.title}>Our vision</Text>
    <Text style={styles.introduction}>
      Poverty was defined as the lack of basic needs, food, water, medical care, security and education. . Studies prove that the percentage of academics among the Arab population is lower than the percentage of the academic Jewish population. There are many barriers and gaps between the Arab population and the Jewish population, including language and gaps in socio-economic status. We believe that academia is one of the keys to eradicating poverty.
    </Text>
  </View>
  <Image
    source={require('../../assets/ourMessage.png')}
    style={{ width: 200, height: 300, marginLeft: 20 }}
  />
      </View>
      <View style={{ padding:100, flexDirection: 'row', alignItems: 'center',hiegth:300 }}>
      <Image
       source={require('../../assets/goals.png')}
       style={{ width:200, height: 200, marginLeft: 0,padding: 110 , left:5,}}
  />
        <View>
      <Text style={styles.title}>Our goals</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />    
      </View>
      </View>
      <View style={{ padding: 110, flexDirection: 'row', alignItems: 'center' }}>
        <View>
    <Text style={styles.title}>We are the ones who create the future</Text>
    <Text style={styles.introduction}>
    There are many challenges facing the Arab sector, and these challenges are reflected in the gaps in the social and economic situation, the educational and linguistic gaps. We believe that the Academy and the Forum were established on this basis to fill these gaps, while creating a positive system that affects the Arab population. “Studies prove that engaging in social work leads to positive thinking and reduces violence and crime. Focusing on positivity will provide financial and mental security and influence the way of life.”    </Text>
  </View>
  <Image
    source={require('../../assets/impact.png')}
    style={{ width: 200, height: 300, marginLeft: 20 }}
  />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View>
    <Text style={styles.title}>social impact</Text>
    <Text style={styles.introduction}>
    In September 2022, the "Miss Fix" contest for social change of the women's lobby "Shadolat Nishim" was held under the auspices of Bank Hapoalim's Social Banking Center. The competition was created out of the need to give space to the beauty that occurs in social work, and to women working in society by promoting the values of social justice, equality, sustainability, health, technology and human rights, to give a platform for entrepreneurship in various fields and to build a society that promotes and stimulates important women's work socially. 183 women participated in the competition with different projects, and the number of voters for the projects exceeded 70,000 in the competition, which led to the selection of 3 pioneering projects, and the project “The Forum” won the second place. In the photo, the  founder and director of the project, Ms. Alaa Hassouna.     </Text>
  </View>
      </View>
      <Text style={styles.title}>Project crew</Text>
      <View style={styles.squ}>
      <Image
      source={require('../../assets/Alaa.png')}
      style={{ width: 200, height: 200, marginLeft: 20 }}
  />
      <Text style={styles.Names}>Founder & Manager</Text>
      <Text style={styles.Names}>الاء حسونة</Text>
      <Text style={styles.introduction}>Alaa Hassouna is a PhD student in Management at Bar-Ilan University. She holds a Bachelor's degree in Economics and Management, majoring in Entrepreneurship, and a Master's degree in Business Administration, specializing in Marketing. She has extensive experience in entrepreneurship and social initiatives, with more than 12 years of management experience in the field of sales, planning and budgeting, knowledge of business operations and functions (finance, human resources, procurement), analytical ability, excellent communication skills, outstanding organizational and leadership skills.</Text>
      </View>
      <View style={{ flex: 1 }}>
      <View style={{ height: 30 }} /> 
      </View>
      <View style={styles.squ}>
      <Image
      source={require('../../assets/hassan.png')}
      style={{ width: 250, height: 300, marginLeft: 20 }}
  />
  
      <Text style={styles.Names}>Co-Founder & Technology Manager
</Text>
      <Text style={styles.Names}>حسن حسونة</Text>
      <Text style={styles.introduction}>Hassan Hassouna, holds a first degree in information systems management from the Academic College of Tel Aviv - Jaffa. He has experience in developing and creating websites with the use of the latest technologies in the market, both on the side of a database using the electronic cloud and on the side of the customer. He has proven experience in management, planning, decision-making, and sales and marketing skills</Text>
      </View>
      <View style={{ flex: 1 }}>
     <View style={{ height: 30 }} /> 
     </View>
     <View style={{ height: 30 }} /> 
      </ScrollView>
    </SafeAreaView>
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
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  slideIntroductionContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "orange",
    top:30,
    marginBottom: 10,
    textAlign: "center",
  },
  introduction: {
    top: 20,
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    panding:10,
  },
  listItem: {
    top:15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    panding :100,
    height:200,
  },
  number: {
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 10,
    color:"orange",
    textAlign:"center",
  },
  text: {
    fontSize: 16,
    left:10,
    top:10,
  },
  square: {
    width: 20,
    height: 40,
    backgroundColor: '#00008b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    right:10,
    left:5,
  },
  squ:{
    top:50,
    width: 300,
    height: 600,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2, // Width of the border
    borderColor: 'black', 
    Bottom: 30,
  },
  Names:{
    top:20,
  },
});
