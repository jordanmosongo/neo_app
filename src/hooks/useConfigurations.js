import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {userServices} from '../services/userServices';
import {
    setConfigurationinfos,
  setEvenementsInfos,
  setParticipantInfos,
  setProgrammes,
} from '../store/userSlice';
import { AllServices } from '../services/AllServices';

/**
 * Récupère les informations du participant à partir de l'id
 * @returns
 */
const useConfigurations = () => {

  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  useEffect(() => {

    async function fetchData() {
      //
      const configurationinfo = await AllServices.getConfigurations(
        user?.tokens.access,
      );
      dispatch(setConfigurationinfos(configurationinfo));


      const EvenementsInfos = await userServices.getEvenements(
        user?.participant_id,
        user?.tokens.access,
      );
      dispatch(setEvenementsInfos(EvenementsInfos));

    }

    fetchData();
  }, [dispatch, user?.participant_id, user?.tokens.access]);

  return {user};
};

export {useConfigurations};
