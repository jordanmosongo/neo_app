import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {userServices} from '../services/userServices';
import {setLoginInfos
} from '../store/userSlice';
import { AllServices } from '../services/AllServices';

/**
 * Récupère les informations du participant à partir de l'id
 * @returns
 */
const useLogin = () => {

  const dispatch = useDispatch();

  const {infoLogin} = useSelector(state => state.user);


  useEffect(() => {

    async function fetchData() {
      //
      const configurationinfo = await AllServices.getConfigurqtion_Login(
        //user?.tokens.access,
      );
      dispatch(setLoginInfos(configurationinfo));

    }

    fetchData();
  }, [dispatch,infoLogin]);

  return {infoLogin};
};

export {useLogin};
