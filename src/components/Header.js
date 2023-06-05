import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { I18nextProvider } from 'react-i18next';
import LanguageContext from '../components/LanguageContext';

const Header = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState('AR');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const [sidebarLayout, setSidebarLayout] = useState(null);
  
  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
  };
  i18n.languag;
  const handleMenuPress = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleOutsidePress = (event) => {
    const { locationX, locationY } = event.nativeEvent;
    if (sidebarLayout) {
      const { x, y, width, height } = sidebarLayout;
      if (
        locationX < x ||
        locationX > x + width ||
        locationY < y ||
        locationY > y + height
      ) {
        setSidebarOpen(false);
      }
    }
  };

  const handleSidebarLayout = () => {
    if (sidebarRef.current) {
      sidebarRef.current.measure((x, y, width, height, pageX, pageY) => {
        setSidebarLayout({ x: pageX, y: pageY, width, height });
      });
    }
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={handleMenuPress} style={styles.menuButton}>
        {isSidebarOpen ? (
          <FontAwesome name="times" size={24} color="black" />
        ) : (
          <FontAwesome name="bars" size={24} color="black" />
        )}
      </TouchableOpacity>

      <View style={styles.languageContainer}>
        <TouchableOpacity
          onPress={() => handleLanguageChange('EN')} // Change 'English' to 'EN'
          style={styles.languageButton}
        >
          <Text style={styles.languageText}>EN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleLanguageChange('AR')}
          style={styles.languageButton}
        >
          <Text style={styles.languageText}>AR</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleLanguageChange('HE')}
          style={styles.languageButton}
        >
          <Text style={styles.languageText}>HE</Text>
        </TouchableOpacity>
      </View>
      {isSidebarOpen && (
        <ScrollView style={styles.sidebar}>
          <TouchableOpacity
            onPress={() => navigation.navigate('SearchScreen')}
            style={styles.sidebarButton}
          >
            <Text style={styles.sidebarButtonText}>{t('navbar.search')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('PodcastScreen')}
            style={styles.sidebarButton}
          >
            <Text style={styles.sidebarButtonText}>{t('navbar.podcast')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('ContactUsScreen')}
            style={styles.sidebarButton}
          >
            <Text style={styles.sidebarButtonText}>{t('navbar.contact')}</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 30,
  },
  menuButton: {
    padding: 8,
  },
  languageContainer: {
    flexDirection: 'row',
  },
  languageButton: {
    paddingHorizontal: 8,
  },
  languageText: {
    fontSize: 16,
  },
  sidebar: {
    position: 'absolute',
    height: '100%',
    width: '70%',
    backgroundColor: 'white',
  },
  sidebarButton: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  sidebarButtonText: {
    fontSize: 16,
  },
});
