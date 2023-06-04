import React, {useState, useRef} from 'react';
import {View, Text, TouchableOpacity, ScrollView, StyleSheet} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';

const Sidebar = ({ navigation }) => {
    const handleNavigation = (screen) => {
      navigation.navigate(screen);
    };
  
    return (
      <ScrollView style={styles.sidebar}>
        <TouchableOpacity onPress={() => handleNavigation('SearchScreen')} style={styles.sidebarButton}>
          <Text style={styles.sidebarButtonText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigation('PodcastScreen')} style={styles.sidebarButton}>
          <Text style={styles.sidebarButtonText}>Podcast</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigation('ContactUsScreen')} style={styles.sidebarButton}>
          <Text style={styles.sidebarButtonText}>Contact Us</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  export default Sidebar;