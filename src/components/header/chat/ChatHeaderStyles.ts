import {StyleSheet} from 'react-native';
import { COLORS } from '../../constant/colors';

export const styles = StyleSheet.create({
    title: {
        color: '#fff',
        fontSize: 16,  fontFamily: 'Poppins-Regular',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
    },
    badgeContainer: {
        flexDirection: 'row',
    },
    badge: {
        backgroundColor: "#008000", 
        marginRight: 5,
        marginVertical: 5,
    },
    badgeText: {
        fontSize: 12, 
        color: '#111',
    }

});