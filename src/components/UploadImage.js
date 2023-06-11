import {View, Text, Image, TouchableOpacity, StyleSheet, Button} from 'react-native';
import React, {useState} from 'react';
import * as ImagePicker from 'expo-image-picker';
import {useTranslation} from 'react-i18next';

export const UploadImage = ({setImage}) => {

    const [loading, setLoading] = useState(false)
    const {t, i18n} = useTranslation();
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
                let newFile = {uri: data.uri, type: `test/${data.uri.split('.')[1]}`, name: `test.${data.uri.split('.')[1]}`}
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
                    setLoading(false)
                }
            ).catch(err => console.log(err))

    }

    return (
        <View>
            <TouchableOpacity onPress={pickFromGallery}>
                <Button title={t('academicpage.dialog.imageurl')}/>
            </TouchableOpacity>
            {/*{loading ? <Text>Loading...</Text> : <Text> Successful </Text>}*/}
        </View>
    )
}