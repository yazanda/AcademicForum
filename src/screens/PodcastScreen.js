import React, {useRef, useState} from "react"
import Header from "../components/Header";
import {Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View,} from "react-native"

export default function PodcastScreen({navigation}) {
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
            <View style={styles.pageContentContainer}>
                <TouchableOpacity onPress={()=>{handleGoBack()}}>
                    <Image
                        source={require("../../assets/FinalLogo.png")}
                        style={styles.logo}
                    />
                </TouchableOpacity>
                <View style={styles.pageContentContainer}>
                    <Text style={styles.pageText}>This is the Podcast page.</Text>
                </View>
            </View>
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
    logo: {
        width: 200,
        height: 75,
        resizeMode: "contain",
    },
    pageContentContainer: {
        flex: 1,
        alignItems: "center",
    },
    pageText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "black",
    },
});