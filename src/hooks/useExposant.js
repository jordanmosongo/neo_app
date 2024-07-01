import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {userServices} from '../services/userServices';
import {setExposants, setProgrammes} from '../store/userSlice';
import axios from 'axios';

const useExposant = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const fetchData = async()=> {
    const data = await userServices.getExposants(
      user.selectedEvenementId,
      user?.tokens.access,
    );
    dispatch(setExposants(data));
  }

  useEffect(() => {   
    (async() => await fetchData())();
  }, []);
};

export {useExposant};
