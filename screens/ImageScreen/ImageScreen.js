import React, { useState } from 'react';
import { View, Text, Image, Dimensions, PermissionsAndroid, Alert } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import CameraRoll from '@react-native-community/cameraroll';
import styles from './ImageScreenStyle'
import * as Progress from 'react-native-progress';
import RNFetchBlob from 'rn-fetch-blob';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/HeaderButton';
import Colors from '../../constants/Colors';
import FastImage from 'react-native-fast-image';

const window = Dimensions.get("window");
const ImageDetailsScreen = props => {
    const imageUrl = props.navigation.getParam('imageUrl');
    const [isDownloading, setIsDownloading] = useState(false);
    const [percetage, setPercentage] = useState(0.0);

    getPermissionAndroid = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'Image Download Permission',
                    message: 'Your permission is required to save images to your device',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                return true;
            }
            Alert.alert(
                'Save remote Image',
                'Grant Me Permission to save Image',
                [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                { cancelable: false },
            );
        } catch (err) {
            Alert.alert(
                'Save remote Image',
                'Failed to save Image: ' + err.message,
                [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                { cancelable: false },
            );
        }
    };


    handleDownload = async () => {

        if (Platform.OS === 'android') {
            const granted = await this.getPermissionAndroid();
            if (!granted) {
                return;
            }
        }
        setIsDownloading(true);
        RNFetchBlob.config({
            fileCache: true,
            appendExt: 'png',
        })
            .fetch('GET', imageUrl)
            .progress({ interval: 250 }, (received, total) => {
                console.log('percentage ' + (received / total));
                setPercentage(received / total);
            })
            .then(res => {
                CameraRoll.save(res.data, 'photo')
                    .then(res => Alert.alert(
                        'Successful',
                        'Image Saved to Gallery',
                        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                        { cancelable: false },
                    ))
                    .catch(err => Alert.alert(
                        'Error',
                        'Failed to save Image: ' + err.message,
                        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                        { cancelable: false },
                    ))
                    .finally(() => {
                        setIsDownloading(false)
                        setPercentage(0.0);
                    });
            })
            .catch(error => {
                setIsDownloading(false);
                setPercentage(0.0);
                Alert.alert(
                    'Error',
                    'Failed to save Image: ' + error.message,
                    [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                    { cancelable: false },
                )
            });
    };


    return (
        <View style={styles.screen}>
            {isDownloading ? (
                <Progress.Circle showsText={true} progress={percetage} size={200} color={Colors.primaryColor} />
            ) :
                <ImageZoom cropWidth={window.width}
                    cropHeight={window.height}
                    imageWidth={window.width}
                    imageHeight={window.width}>

                    <FastImage style={{ width: window.width, height: window.width }}
                        source={{ uri: imageUrl, cache: FastImage.cacheControl.immutable }} />

                </ImageZoom>
            }
        </View>
    );
};

ImageDetailsScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('imageName'),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Save"
                    iconName="save"
                    onPress={this.handleDownload}
                />
            </HeaderButtons>
        )
    };
};

export default ImageDetailsScreen;
