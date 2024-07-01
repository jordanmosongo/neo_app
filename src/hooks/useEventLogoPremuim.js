import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {userServices} from '../services/userServices';
import {setLogoPremium, setMaJourneeInfos} from '../store/userSlice';
import { AllServices } from '../services/AllServices';

const useEventLogo = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  useEffect(() => {
    async function fetchData() {
      const logo = await AllServices.getEventLogo(
        user.selectedEvenementId,
        user?.tokens.access,
      );
      dispatch(setLogoPremium(logo));
    }

    fetchData();
  }, [dispatch, user.selectedEvenementId, user?.tokens.access]);

  return {user};
};

export {useEventLogo};
