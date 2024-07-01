import {StyleSheet} from 'react-native';
import { FONTS } from '../../../constants/theme';

export const styles = StyleSheet.create({
    container: {
        margin: 20,
        borderBottomColor: '#271d67',
        borderBottomWidth: 1,
        paddingBottom: 10,
        backgroundColor: '#fff',
        marginTop: 0
    },
    title: {
        fontSize: 15,
        color: '#271d67',
        fontWeight: 'bold',
        maxWidth: '70%',
        lineHeight: 22,
        fontFamily: FONTS.POPPINS_REGULAR
    },
    subTitle:{
        fontSize: 13,
        color: '#5D568D',
        maxWidth: '90%',
        lineHeight: 18,
        marginVertical: 4
    },
    badge: {
      backgroundColor: '#111',
      color: '#fff',
    }
});