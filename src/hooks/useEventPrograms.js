import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {userServices} from '../services/userServices';
import {setProgrammes} from '../store/userSlice';

const useEventPrograms = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  useEffect(() => {
    async function fetchData() {
      const eventPrograms = await userServices.getEventPrograms(
        user.selectedEvenementId,
        user?.tokens.access,
      );

      dispatch(setProgrammes(eventPrograms));
    }

    fetchData();
  }, [dispatch, user.selectedEvenementId, user?.tokens.access]);

  return {user};
};

export {useEventPrograms};
