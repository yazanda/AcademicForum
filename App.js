import React, { useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Text, View, SafeAreaView, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native';

export default function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuPress = () => {
    setSidebarOpen(!isSidebarOpen);
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
      </View>

      <ScrollView style={styles.contentContainer}>
        {/* Conditional rendering for logo */}
        {!isSidebarOpen && (
          <Image source={require('./assets/FinalLogo.png')} style={styles.logo} />
        )}

        {/* Sidebar */}
        {isSidebarOpen && (
          <View style={styles.sidebar}>
            {/* Sidebar content */}
            <Text>This is the sidebar</Text>
          </View>
        )}

        {/* Rest of your app's content */}
        {/* Place additional items and content here */}
      </ScrollView>
    </SafeAreaView>
  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 16,
    // paddingTop: 16,
  },
  menuButton: {
    marginRight: 8,
    padding: 8,
  },
  menuIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  contentContainer: {
    flex: 1,
  },
  logo: {
    alignSelf: 'center',
    marginTop: 8,
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '95%',
    height: windowHeight,
    backgroundColor: '#F5F5F5',
    zIndex: 1,
  },
});
