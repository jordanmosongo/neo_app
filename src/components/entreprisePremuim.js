/* eslint-disable prettier/prettier */
import React,{useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,Image
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { AllServices } from '../services/AllServices';

export default function EntreprisePrmuim() {

  const navigation = useNavigation();
  const [list,setList]= React.useState([]);
  const route = useRoute();
  const parametres = route.params
  const [loading,setLoading] = React.useState(false);
  

  useEffect(()=>{
    setLoading(true)

      AllServices.getLogoPremuim().then(response =>{

      })
      
},[])

  const renderItem = ({item, index}) => {
    
    if(index <8){
    return (
        <>
        <View style={{
            flex: 1,
            alignItems: 'center',
            margin: 5,
        }}>
<Image
            source={require('../../components/assets/PICTO__TEL.png')}
            style={{
              width: 20,
              height: 20,
              marginBottom: 10,
            }}
          />
            </View></>
    );
  }
};
  return (
    <React.Fragment>
<FlatList
            data={list}
            renderItem={renderItem}
            key="list_4"
            numColumns={4}
            scrollEnabled={false}
          />
    
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  viewCOntainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 100,
    paddingTop: 20,
  },
  containerBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  img: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 35,
  },
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  buttonContainer: {
    width: 50,
    height: 50,
    marginVertical: 5,
    borderRadius: 60,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    fontSize: 22,
  },
});
