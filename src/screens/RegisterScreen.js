import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import {CheckBox} from 'react-native-elements';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Button,
} from 'react-native';
import ImagePicker from "react-native-image-picker";
import DateTimePicker from '@react-native-community/datetimepicker';
import Header from "../components/Header";

export default function RegisterScreen({navigation}) {
    const { t, i18n } = useTranslation();
    return(
        <SafeAreaView>
            <Text>Fuck</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    }
})