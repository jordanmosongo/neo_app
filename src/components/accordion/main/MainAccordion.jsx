import React, { useState } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    LayoutAnimation,
    Text,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { COLORS, TEXT_SIZES } from '../../../constants/theme';


export const MainAccordion = (props) => {
    const { title, children, titleText, withTopLine, withBottomLine, description } = props;
    const [isOpen, setIsOpen] = useState(true);

    const toggleOpen = () => {
        setIsOpen(value => !value);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    };

    return (
      <>
        {withTopLine && 
         (<View
          style={{
            backgroundColor: '#00A7D5',
            alignItems: 'center',
            padding: 0.5,
          }}>
            <View style={styles.divider} />
         </View>)
         }
        <TouchableOpacity
          onPress={toggleOpen}
          style={{...styles.heading,
            paddingTop: 10, 
            paddingBottom: 0,
            marginBottom: -2,
           /*  borderColor: 'red',
            borderWidth: 1    */     
          }}
          activeOpacity={0.6}>
          {title}
          <View>
            <Text style={styles.sectionTitle}>{titleText}</Text>
          </View>
          <Icon
            color="#00c3ff"
            name={isOpen ? 'chevron-down' : 'chevron-right'}
            size={12}
            type="font-awesome"
            style={{
              marginLeft: 10
            }}
            />
            </TouchableOpacity>
            <View style={[styles.list, !isOpen ? styles.hidden : undefined]}>
               {children}
            </View>
            {withBottomLine && <View
                style={{
                    backgroundColor: '#00A7D5',
                    alignItems: 'center',
                    padding: 0.5,
                }}>
                <View style={styles.divider} />
            </View>}
        </>
    );
};

const styles = StyleSheet.create({
    txt_btn: {
        textTransform: 'uppercase',
        textAlign: 'center',
        letterSpacing: 3,
        fontWeight: 'bold',
        color: '#fff',
    },
    container: {
        // marginTop: 10,
        marginBottom: 10,
    },
    text: {
        fontSize: 18,
        marginBottom: 20,
        color: '#000',
    },
    safeArea: {
        flex: 1,
    },
    heading: {        
        flexDirection: 'row',
        alignItems: 'center',
    },
    hidden: {
        height: 0,
    },
    list: {
        overflow: 'hidden',
    },
    sectionTitle: {
        fontFamily: 'Poppins-Regular',
        fontSize: TEXT_SIZES.PROGRAM_SECOND_TITLE,
        color: COLORS.MAIN_BLUE_LIGHT,
    },
    sectionDescription: {
        flex: 1,
        fontFamily: 'Poppins-Regular',
        fontSize: 15,
        color: '#271d67',
        textAlign: 'justify',
        marginBottom: 7,
        marginTop: 1,
        lineHeight: 20
    },
    sectioncoordonnes: {
        marginTop: 1,
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        color: '#271d67',
        marginBottom: 5,
    },
    divider: {
        borderBottomColor: 'grey',
        borderBottomWidth: 0.1,
        width: '100%',
    },
});
