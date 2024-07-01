import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {userServices} from '../services/userServices';
import {
  setEvenementsInfos,
  setParticipantInfos,
  setProgrammes,
} from '../store/userSlice';

/**
 * Récupère les informations du participant à partir de l'id
 * @returns
 */
const useParticipant = () => {

  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const {evenements} = useSelector(state => state.user);


  useEffect(() => {

    async function fetchData() {
      //
      const participantInfos = await userServices.getParticipant(
        user?.participant_id,
        user?.tokens.access,
      );
      dispatch(setParticipantInfos(participantInfos));
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

export {useParticipant};
