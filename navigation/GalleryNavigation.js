import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import GalleryHomeScreen from '../screens/HomeScreen/GalleryHome'
import ImageDetailsScreen from '../screens/ImageScreen/ImageScreen';
import Colors from '../constants/Colors';


const GalleryNavigation = createStackNavigator(
    {
        Gallery: {
            screen: GalleryHomeScreen
        },
        ImageDetails: {
            screen: ImageDetailsScreen
        },
    },
    {
        // initialRouteName: 'Categories',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
            },
            headerTintColor:
                Platform.OS === 'android' ? 'white' : Colors.primaryColor,
            headerTitle: 'A Screen'
        }
    }
);

export default createAppContainer(GalleryNavigation);