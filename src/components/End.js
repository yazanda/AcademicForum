import React, { useState,useEffect } from 'react';
import { StyleSheet, SafeAreaView, Image, ScrollView, View, Text, Dimensions, FlatList, TouchableOpacity, Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import * as FileSystem from 'expo-file-system';
import PDFReader from 'rn-pdf-reader-js';

const window = Dimensions.get('window');

const End = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const [pdfSource, setPdfSource] = useState(null);

  const handleOpenPDF = () => {
    setModalVisible(true);
  };

  const loadPDF = async () => {
    try {
      const pdfAsset = require('../../assets/terms.pdf');
      const pdfBase64 = await convertAssetToBase64(pdfAsset);
      setPdfSource(`data:application/pdf;base64,${pdfBase64}`);
    } catch (error) {
      console.log('Error loading PDF:', error);
    }
  };
  
  const convertAssetToBase64 = async (asset) => {
    const response = await fetch(asset);
    const blob = await response.blob();
    const base64 = await convertBlobToBase64(blob);
    return base64;
  };
  
  const convertBlobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onloadend = () => {
        resolve(reader.result.split(',')[1]);
      };
      reader.readAsDataURL(blob);
    });
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

  return (
    <SafeAreaView>
      <View style={{ height: 70 }} />
      <View style={styles.rectangular}>
        <View style={styles.halfReg}>
          <View style={{ height: 20 }} />
          <Text style={styles.TextInfo}>{t('footer.contactus')}</Text>
          <View style={{ height: 20 }} />
          <View style={styles.info}>
            <FontAwesome name="phone" style={{ fontSize: 20, color: '#05063F' }} />
            <View style={{ width: 10 }} />
            <Text style={styles.nfo}>052-9086918</Text>
          </View>
          <View style={{ height: 10 }} />
          <View style={styles.info}>
            <FontAwesome name="envelope" style={{ fontSize: 20, color: '#05063F' }} />
            <View style={{ width: 10 }} />
            <Text style={styles.nfo}>almuntada.ac@gmail.com</Text>
          </View>
        </View>
        <View style={{ width: 50 }} />
        <View style={styles.halfReg}>
          <View style={{ width: 10 }} />
          <View style={{ height: 20 }} />
          <Image source={require('../../assets/FinalLogo.png')} style={{ width: 100, height: 50 }} />
          <View style={{ height: 10 }} />
          <View style={styles.info}>
            <TouchableOpacity onPress={openInstagram}>
              <View>
                <FontAwesome name="instagram" style={{ fontSize: 20, color: '#05063F' }} />
              </View>
            </TouchableOpacity>
            <View style={{ width: 15 }} />
            <TouchableOpacity onPress={openLinkedin}>
              <FontAwesome name="linkedin" style={{ fontSize: 20, color: '#05063F' }} />
            </TouchableOpacity>
            <View style={{ width: 15 }} />
            <TouchableOpacity onPress={openFacebook}>
              <FontAwesome name="facebook" style={{ fontSize: 20, color: '#05063F' }} />
            </TouchableOpacity>
          </View>
          <View style={{ height: 30 }} />
        </View>
      </View>
      <View style={{ height: 90 }} />
      <View style={styles.end}>
        <View style={styles.halfReg}>
          <View style={{ height: 10 }} />
          <Text style={styles.TextEnd}>Copyrights.Al-Hassouna-2023 All rights Reserved</Text>
        </View>
        <View style={styles.halfReg}>
          <View style={{ height: 10 }} />
          <TouchableOpacity onPress={handleOpenPDF}>
            <Text style={styles.TextEnd}>Privacy Policy&Terms of use</Text>
          </TouchableOpacity>
          <View style={{ height: 30 }} />
        </View>
      </View>
      {modalVisible && (
        <ScrollView>
          {modalVisible && pdfSource && (
        <PDFReader
          source={{
            base64: pdfSource,
          }}
          onClose={() => setModalVisible(false)}
        />
      )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default End;

const styles = StyleSheet.create({
  rectangular: {
    width: Dimensions.get('window').width,
    backgroundColor: '#F7FAF8',
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 20,
    left: 10,
    top: 10,
    padding: 100,
    fontWeight: 'bold',
    padding: 10,
  },
  halfReg: {
    flexDirection: 'column',
    width: Dimensions.get('window').width / 2 + 10,
    padding: 20,
  },
  info: {
    flexDirection: 'row',
  },
  nfo: {
    fontSize: 12,
    fontWeight: 'bold',
    paddingTop: 3,
    paddingLeft: 5,
  },
  TextInfo: {
    fontSize: 18,
    color: '#05063F',
    fontWeight: 'bold',
  },
  end: {
    width: '100%',
    backgroundColor: '#092D82',
    flexDirection: 'row',
    alignSelf: 'flex-start',
    bottom: 0,
    position: 'absolute',
  },
  TextEnd: {
    fontSize: 12,
    color: 'white',
  },
});
