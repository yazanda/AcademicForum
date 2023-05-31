import React, { useState, useRef } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Header from "../components/Header";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  Button,
  Check,
} from "react-native";

// Home Container Component
const HomeContainer = ({ handleGoBack }) => {
  return (
    <ScrollView
      style={styles.homeContainer}
      contentContainerStyle={styles.homeContentContainer}
    >
      <Image source={require("../../assets/FinalLogo.png")} style={styles.logo} />
    </ScrollView>
  );
};

// Search Page Component
const SearchPage = ({ handleGoBack }) => {
  return (
    <ScrollView style={styles.pageContainer}>
      <View style={styles.pageHeader}>
        <TouchableOpacity onPress={handleGoBack}>
          <Image
            source={require("../../assets/FinalLogo.png")}
            style={styles.logo}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.pageContentContainer}>
        <Text style={styles.pageText}>This is the Search page.</Text>
      </View>
    </ScrollView>
  );
};

// Podcast Page Component
const PodcastPage = ({ handleGoBack }) => {
  return (
    <ScrollView style={styles.pageContainer}>
      <View style={styles.pageHeader}>
        <TouchableOpacity onPress={handleGoBack}>
          <Image
            source={require("../../assets/FinalLogo.png")}
            style={styles.logo}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.pageContentContainer}>
        <Text style={styles.pageText}>This is the Podcast page.</Text>
      </View>
    </ScrollView>
  );
};

export default function App({ navigation }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("home");
  const sidebarRef = useRef(null);
  const [sidebarLayout, setSidebarLayout] = useState(null);

  const handleMenuPress = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleLanguageChange = (language) => {
    console.log("Selected language:", language);
  };

  const handleGoBack = () => {
    setSidebarOpen(false);
    setActivePage("home");
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

  const handlePageChange = (page) => {
    setActivePage(page);
    setSidebarOpen(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        isSidebarOpen={isSidebarOpen}
        handleMenuPress={handleMenuPress}
        handleLanguageChange={handleLanguageChange}
      />

      <TouchableWithoutFeedback onPress={handleOutsidePress}>
        <View style={styles.contentContainer}>
          {activePage === "home" ? (
            <HomeContainer handleGoBack={handleGoBack} />
          ) : activePage === "register" ? (
            <RegisterPage handleGoBack={handleGoBack} />
          ) : activePage === "search" ? (
            <SearchPage handleGoBack={handleGoBack} />
          ) : activePage === "podcast" ? (
            <PodcastPage handleGoBack={handleGoBack} />
          ) : activePage === "contact" ? (
            <ContactPage handleGoBack={handleGoBack} />
          ) : null}

          {isSidebarOpen && (
            <ScrollView
              ref={sidebarRef}
              style={styles.sidebar}
              contentContainerStyle={styles.sidebarContentContainer}
              onLayout={handleSidebarLayout}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("RegisterScreen")}
                style={styles.sidebarButton}
              >
                <Text style={styles.sidebarButtonText}>Register</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("SearchScreen")}
                style={styles.sidebarButton}
              >
                <Text style={styles.sidebarButtonText}>Search</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handlePageChange("podcast")}
                style={styles.sidebarButton}
              >
                <Text style={styles.sidebarButtonText}>Podcast</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("ContactUsScreen")}
                style={styles.sidebarButton}
              >
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 30,
  },
  contentContainer: {
    flex: 1,
    position: "relative",
  },
  homeContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 1,
    backgroundColor: "white",
  },
  homeContentContainer: {
    flex: 1,
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 75,
    resizeMode: "contain",
  },
  sidebar: {
    position: "absolute",
    width: "70%",
    height: "100%",
    zIndex: 2,
    backgroundColor: "rgba(245, 245, 245, 0.5)",
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
    backgroundColor: "orange",
    borderRadius: 8,
  },
  sidebarButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  pageContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  pageHeader: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  pageContentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  pageText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  input: {
    backgroundColor: "#f8f8f8",
    width: "100%",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    height: 40,
    backgroundColor: "#F5F5F5",
    borderRadius: 4,
  },
  sendButton: {
    backgroundColor: "#6cc070",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
  },
});