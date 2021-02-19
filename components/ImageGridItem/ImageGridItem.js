import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    Image,
    Dimensions
} from 'react-native';
import styles from './ImageGridItemStyle';
import FastImage from 'react-native-fast-image';



const ImageItem = props => {
    return (
        <View style={styles.imageItem}>
            <TouchableOpacity onPress={props.onSelectMeal}>
                <View>
                    <FastImage
                        source={{ uri: props.image, cache: FastImage.cacheControl.immutable }}
                        style={styles.bgImage}>
                    </FastImage>
                </View>
            </TouchableOpacity>
        </View>
    );
};
export default ImageItem;
