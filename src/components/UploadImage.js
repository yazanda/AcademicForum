<<<<<<< HEAD:src/components/UploadImage.js
import {View, Text, Image, TouchableOpacity, StyleSheet, Button} from 'react-native';
import React, {useState} from 'react';
import * as ImagePicker from 'expo-image-picker';
import {useTranslation} from 'react-i18next';

=======
import {View, Text, ActivityIndicator, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import * as ImagePicker from 'expo-image-picker';
import {useTranslation} from 'react-i18next';
>>>>>>> d648168de9b9341126c5dab9e30592c9bbc703b4:src/components/uploadImage.js
export const UploadImage = ({setImage}) => {
    const {t, i18n} = useTranslation();
    const [loading, setLoading] = useState(false)
<<<<<<< HEAD:src/components/UploadImage.js
    const {t, i18n} = useTranslation();
=======
    const [success, setSuccess] = useState(false);
>>>>>>> d648168de9b9341126c5dab9e30592c9bbc703b4:src/components/uploadImage.js
    // console.log(image);
    const pickFromGallery = async () => {
        const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (granted) {
            let data = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1,1],
                quality: 0.5
            })
            if (!data.canceled) {
                let newFile = {uri: data.assets[0].uri, type: `test/${data.assets[0].uri.split('.')[1]}`, name: `test.${data.assets[0].uri.split('.')[1]}`}
                handleUpload(newFile)
            }
        }
    }
    const handleUpload = (image) => {
        setLoading(true)
        const data = new FormData()
        data.append('file', image)
        data.append('upload_preset', 'ml_default')
        data.append('cloud_name', 'dcfc3oajp')

        fetch ('https://api.cloudinary.com/v1_1/dcfc3oajp/image/upload', {
            method: 'POST',
            body: data
        }).then(res => res.json())
            .then(data => {
                    setImage(data.url)
                    console.log(data.url);
                    setLoading(false);
                    setSuccess(true);
                }
            ).catch(err => console.log(err))

    }

    return (
<<<<<<< HEAD:src/components/UploadImage.js
        <View>
            <TouchableOpacity onPress={pickFromGallery}>
                <Button title={t('academicpage.dialog.imageurl')}/>
            </TouchableOpacity>
            {/*{loading ? <Text>Loading...</Text> : <Text> Successful </Text>}*/}
=======
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={pickFromGallery}>
                <Text style={styles.buttonText}>{t('academicpage.dialog.upload')}</Text>
            </TouchableOpacity>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="small" color="#0000ff" />
                </View>
            ) : success ? (
                <Text style={styles.successText}>Uploaded Successfully</Text>
            ) : null}
>>>>>>> d648168de9b9341126c5dab9e30592c9bbc703b4:src/components/uploadImage.js
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    button: {
      backgroundColor: '#ddd',
      padding: 10,
      borderRadius: 8,
      marginBottom: 10,
      width: '80%',
    },
    buttonText: {
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    loadingContainer: {
      alignItems: 'center',
    },
    successText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: 'green',
      textAlign: 'center',
    },
  });