import React, { useState, useRef } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Text, View, SafeAreaView, Image, Dimensions, ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

export default function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const [sidebarLayout, setSidebarLayout] = useState(null);

  const handleMenuPress = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleLanguageChange = (language) => {
    // Handle language change here
    console.log('Selected language:', language);
  };

  const handleGoBack = () => {
    setSidebarOpen(false);
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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleMenuPress} style={styles.menuButton}>
          {/* Conditional rendering for menu button */}
          {isSidebarOpen ? (
            <FontAwesome name="times" size={24} color="black" />
          ) : (
            <FontAwesome name="bars" size={24} color="black" />
          )}
        </TouchableOpacity>

        <View style={styles.languageContainer}>
          <TouchableOpacity onPress={() => handleLanguageChange('English')} style={styles.languageButton}>
            <Text style={styles.languageText}>EN</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleLanguageChange('Arabic')} style={styles.languageButton}>
            <Text style={styles.languageText}>AR</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleLanguageChange('Hebrew')} style={styles.languageButton}>
            <Text style={styles.languageText}>HE</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableWithoutFeedback onPress={handleOutsidePress}>
        <View style={styles.contentContainer}>
          {/* Logo Container */}
          <ScrollView style={styles.logoContainer} contentContainerStyle={styles.logoContentContainer}>
            <Image source={require('./assets/FinalLogo.png')} style={styles.logo} />
          </ScrollView>

          {/* Sidebar */}
          {isSidebarOpen && (
            <ScrollView
              ref={sidebarRef}
              style={styles.sidebar}
              contentContainerStyle={styles.sidebarContentContainer}
              onLayout={handleSidebarLayout}
            >
              <TouchableOpacity style={styles.sidebarButton}>
                <Text style={styles.sidebarButtonText}>Search</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sidebarButton}>
                <Text style={styles.sidebarButtonText}>Podcast</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sidebarButton}>
                <Text style={styles.sidebarButtonText}>Contact Us</Text>
              </TouchableOpacity>
            </ScrollView>
          )}
        </View>
      </TouchableWithoutFeedback>
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
    paddingTop: 16,
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
  contentContainer: {
    flex: 1,
    position: 'relative',
  },
  logoContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
    backgroundColor: 'white',
  },
  logoContentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  sidebar: {
    position: 'absolute',
    width: '70%',
    height: '100%',
    zIndex: 2,
    backgroundColor: 'rgba(245, 245, 245, 0.5)',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  sidebarContentContainer: {
    flexGrow: 1,
  },
  sidebarButton: {
    marginBottom: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'orange',
    borderRadius: 8,
  },
  sidebarButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});
