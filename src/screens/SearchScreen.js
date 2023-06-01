import React, {useState, useRef} from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import Header from '../components/Header';

export default function SearchScreen({navigation}) {
    const [selectedSubject, setSelectedOption] = useState("");
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const options = ["Option 1", "Option 2", "Option 3"];

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setDropdownOpen(false);
    };

    const handleGoBack = () => {
        // setSidebarOpen(false);
        navigation.navigate("StartScreen");
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header
                style={styles.header}
                navigation={navigation}
            />
            <ScrollView
                style={styles.homeContainer}
                contentContainerStyle={styles.homeContentContainer}>

                <TouchableOpacity onPress={() => handleGoBack()}>
                    <Image
                        source={require("../../assets/FinalLogo.png")}
                        style={styles.logo}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('RegisterScreen')}
                    style={styles.sidebarButton}
                >
                    <Text style={styles.sidebarButtonText}>Join Us</Text>
                </TouchableOpacity>
                <View style={styles.pageHeader}>
                    <Text style={styles.label}>By Field</Text>
                    <View style={styles.dropdownContainer}>
                        <TouchableOpacity style={styles.dropdown} onPress={toggleDropdown}>
                            <Text style={styles.dropdownText}>
                                {selectedSubject || "Search by Field"}
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
                    <Text style={styles.label}>By Area</Text>
                    <View style={styles.dropdownContainer}>
                        <TouchableOpacity style={styles.dropdown} onPress={toggleDropdown}>
                            <Text style={styles.dropdownText}>
                                {selectedSubject || "Search by area"}
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
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    homeContentContainer: {
        flex: 1,
        alignItems: "center",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingTop: 30,
    },
    logo: {
        width: 200,
        height: 75,
        resizeMode: "contain",
    },

    //remove the border please
    pageHeader: {
        alignItems: "center",
        borderWidth: 2,
        borderRadius: 50,
        borderColor: 'orange',
        // flexWrap: 'wrap',
        width: '90%',
        height: '20%',
    },
    label: {
        fontSize: 16,
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
        backgroundColor: "#555555",
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
});
  