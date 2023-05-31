import React,{useState, useRef} from 'react';
import {StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  Button, } from 'react-native';
import Header from '../components/Header';

export default function ContactUsScreen({ navigation }){

  // <BackButton goBack={navigation.goBack} />
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [selectedSubject, setSelectedOption] = useState("");
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const options = ["Option 1", "Option 2", "Option 3"];
  const [message, setMessage] = useState("");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  // const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("contact");
  const sidebarRef = useRef(null);
  const [sidebarLayout, setSidebarLayout] = useState(null)

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setDropdownOpen(false);
  };

  const handleSend = () => {
    // Handle send functionality here
    console.log("Name:", name);
    console.log("Mail:", mail);
    console.log("Selected Subject:", selectedSubject);
    console.log("Message:", message);
  };

  const handleMenuPress = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleLanguageChange = (language) => {
    console.log("Selected language:", language);
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

  const handleGoBack = () => {
    setSidebarOpen(false);
    navigation.navigate("startScreen");
  };

  return (
    <SafeAreaView>
      <Header
        isSidebarOpen={isSidebarOpen}
        handleMenuPress={handleMenuPress}
        handleLanguageChange={handleLanguageChange}
      />
      <ScrollView
      style={styles.homeContainer}
      contentContainerStyle={styles.homeContentContainer}
    >
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
      <TouchableOpacity onPress={()=>{handleGoBack()}}>
            <Image
              source={require("../../assets/FinalLogo.png")}
              style={styles.logo}
            />
      </TouchableOpacity>
      <View style={styles.pageHeader}>
        {/* <View style={styles.pageContentContainer}> */}
          <Text style={styles.label}> Full Name</Text>
          <TextInput
            // placeholder="Enter Your Name"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
          <Text style={styles.label}> Mail</Text>
          <TextInput
            // placeholder="Enter Your Mail"
            style={styles.input}
            value={mail}
            onChangeText={setMail}
          />
          <Text style={styles.label}>Subject</Text>
          <View style={styles.dropdownContainer}>
            <TouchableOpacity style={styles.dropdown} onPress={toggleDropdown}>
              <Text style={styles.dropdownText}>
                {selectedSubject || "Select"}
              </Text>
            </TouchableOpacity>
            {isDropdownOpen && (
              <View style={styles.optionsContainer}>
                {options.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={styles.option}
                    onPress={() => handleOptionSelect(option)}
                  >
                    <Text style={styles.optionText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          <Text style={styles.label}> Message</Text>
          <TextInput
            // placeholder="Message"
            style={[styles.input, styles.messageInput]}
            value={message}
            onChangeText={setMessage}
            multiline
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        {/* </View> */}
        </View>
    </ScrollView>
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
  logo: {
    width: 200,
    height: 75,
    resizeMode: "contain",
  },
  pageContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  pageHeader: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderRadius: 50,
    borderColor: 'orange',
    // flexWrap: 'wrap',
    width: '90%',
    height: '70%',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    paddingLeft: 8,
    // alignSelf: "flex-start",
  },
  input: {
    backgroundColor: "#f8f8f8",
    width: "70%",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  dropdownContainer: {
    width: "70%",
    marginTop: 10,
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
  dropdownLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  dropdownText: {
    fontSize: 16,
    color: "#555555",
  },
  optionsContainer: {
    marginTop: 5,
    backgroundColor: "#F5F5F5",
    borderRadius: 4,
  },
  option: {
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  optionText: {
    fontSize: 16,
    color: "#555555",
  },
  messageInput: {
    width: "70%",
    height: 120,
  },
  sendButton: {
    backgroundColor: "orange",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    // width: '50%',
    // paddingBottom: 10,
    // alignItems: "center",
  },
  sendButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  homeContainer: {
    // position: "absolute",
    height: '100%',
    // zIndex: 1,
    backgroundColor: "white",
  },
  homeContentContainer: {
    flex: 1,
    alignItems: "center",
  },
  sidebar: {
    position: "absolute",
    width: "70%",
    height: "100%",
    zIndex: 2,
    alignSelf: "flex-start",
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
});
