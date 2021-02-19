import { StyleSheet, Dimensions } from 'react-native';

const window = Dimensions.get("window");
export default StyleSheet.create({
    imageItem: {
        height: window.width / 3,
        width: window.width / 3,
        backgroundColor: '#f5f5f5',
        marginHorizontal: 1,
        marginVertical: 1
    },
    bgImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
    },
});