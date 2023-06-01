import React, {useState, useRef} from "react";
import Header from "../components/Header";
import {
    StyleSheet,
    SafeAreaView,
    Image,
    ScrollView,
} from "react-native";

export default function App({navigation}) {
    return (
        <SafeAreaView style={styles.container}>
            <Header
                style={styles.header}
                navigation={navigation}
            />
            <ScrollView
                contentContainerStyle={styles.homeContentContainer}>
                <Image source={require("../../assets/FinalLogo.png")} style={styles.logo}/>
            </ScrollView>
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
        paddingTop: 30,
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
});