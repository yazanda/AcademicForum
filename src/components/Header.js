import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Header = ({ isSidebarOpen, handleMenuPress, handleLanguageChange }) => {
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
          onPress={() => handleLanguageChange('English')}
          style={styles.languageButton}
        >
          <Text style={styles.languageText}>EN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleLanguageChange('Arabic')}
          style={styles.languageButton}
        >
          <Text style={styles.languageText}>AR</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleLanguageChange('Hebrew')}
          style={styles.languageButton}
        >
          <Text style={styles.languageText}>HE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = {
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 30,
    // backgroundColor: "orange",
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
};
