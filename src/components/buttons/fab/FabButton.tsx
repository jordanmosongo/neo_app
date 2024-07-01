import React from 'react';
import { FAB } from "react-native-paper";

type Props = {
   action: () => void,
   icon: any
}

export const FabButton = ({ action, icon }: Props) => {
    return <FAB
    icon={icon}
     onPress={action}
     color='#fff'
     style={{
        position: 'absolute',
        backgroundColor: '#271d67',
        marginRight: 10,
        marginBottom: 15,
        right: 0,
        bottom: 0,
        zIndex: 100
    }}/>
}