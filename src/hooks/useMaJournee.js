import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {userServices} from '../services/userServices';
import {setMaJourneeInfos} from '../store/userSlice';

const useMajournee = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  useEffect(() => {
    async function fetchData() {
      const maJourneeInfo = await userServices.getMaJournee(
        user.selectedEvenementId,
        user?.tokens.access,
      );
      dispatch(setMaJourneeInfos(maJourneeInfo));
    }

    fetchData();
  }, [dispatch, user.selectedEvenementId, user?.tokens.access]);

  return {user};
};

export {useMajournee};
