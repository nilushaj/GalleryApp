import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    RefreshControl
} from 'react-native';
import { DoubleCircleLoader, TextLoader } from 'react-native-indicator';
import styles from './GalleryHomeStyle'
import ImageItem from '../../components/ImageGridItem/ImageGridItem';
import useFetch from '../../hooks/useFetch'
import Colors from '../../constants/Colors';
import { useGalleryHomeContext } from "../../contexts/GalleryHomeContext";

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const GalleryHomeScreen = props => {
    const [refreshing, setRefreshing] = useState(false);

    const galleryContext = useGalleryHomeContext();
    // const { error, isPending, data } = useFetch(config.getImages(20));


    const onRefresh = useCallback(() => {
        setRefreshing(true);
        galleryContext.reloadData();
        setRefreshing(false);
    }, []);

    const renderGridItem = itemData => {
        return (

            <ImageItem
                image={itemData.item.download_url}
                onSelectMeal={() => {
                    props.navigation.navigate({
                        routeName: 'ImageDetails',
                        params: {
                            imageUrl: itemData.item.download_url,
                            imageName: itemData.item.author
                        }
                    });
                }}
            />
        );
    };
    if (galleryContext.galleryImages.isPending) {
        return (
            <View style={styles.screen}>
                <DoubleCircleLoader size={80} color={Colors.primaryColor} />
            </View>
        );
    }
    if (galleryContext.error != null) {
        return (
            <Text>{galleryContext.galleryImages.error}.</Text>
        );
    }

    return (
        <FlatList
            keyExtractor={(item, index) => item.id}
            data={galleryContext.galleryImages.data}
            renderItem={renderGridItem}
            numColumns={3}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
        />
    );

};

GalleryHomeScreen.navigationOptions = {
    headerTitle: 'Gallery',
};

export default GalleryHomeScreen;