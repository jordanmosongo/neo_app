import {StyleSheet} from 'react-native';
import { COLORS, TEXT_SIZES } from '../../constants/theme';

export const EmptyListStyle = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    text: {
        fontSize: TEXT_SIZES.PARAGRAPH,
        color: COLORS.MAIN_BLUE,
        fontFamily: 'Poppins-Regular',
        marginTop: 5
    }
})