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
import TextInput from '../components/TextInput';
import Dropdown from "../components/DropDown";

export default function ContactUsScreen({navigation}) {

    const data = [
        {label: 'Item 1', value: '1'},
        {label: 'Item 2', value: '2'},
        {label: 'Item 3', value: '3'},
    ];

    return (
        <SafeAreaView style={styles.container}>
            <Header
                style={styles.header}
                navigation={navigation}
            />
            <TouchableOpacity onPress={() => navigation.navigate("StartScreen")}>
                <Image
                    source={require("../../assets/FinalLogo.png")}
                    style={styles.logo}
                />
            </TouchableOpacity>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <View>
                    <TextInput label={"Full Name"} placeholder={"Full Name"}/>
                    <TextInput label={"Email"} placeholder={"Email"}/>
                    <TouchableOpacity style={styles.dropDownContainer}>
                        <Dropdown
                            placeholder='Subject'
                            label='Subject'
                            data={data}
                        />
                    </TouchableOpacity>
                    <TextInput label={"Message"} placeholder={"Message"}/>
                    <TouchableOpacity style={styles.sendButton}>
                        <Text style={styles.sendButtonText}>Send</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
    },
    // header: {
    //     flexDirection: 'row',
    //     // justifyContent: 'space-between',
    //     // alignItems: 'center',
    // },
    contentContainer: {
        flex: 1,
    },
    logo: {
        width: 200,
        height: 75,
        alignSelf: 'center', // Center the logo horizontally
        resizeMode: "contain",
    },
    sendButton: {
        backgroundColor: "green",
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        width: '50%',
        alignSelf: 'center', // Add this line to center the button
        marginTop: 20, // Add margin-top to create some space between the checkbox and the button
        alignItems: 'center',
    },
    sendButtonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
    },
});
