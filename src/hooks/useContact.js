import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {userServices} from '../services/userServices';
import {setEventParticipants, setMessagetoContact} from '../store/userSlice';
import { AllServices } from '../services/AllServices';

const useMessagetoContact = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  useEffect(() => {
    async function fetchData() {
      const contactToMessage = await AllServices.SendMessage(
        
        user?.tokens.access,

      );
      dispatch(setMessagetoContact(contactToMessage));
    }

    fetchData();
  }, [dispatch, user?.tokens.access]);

  return {user};
};

export {useMessagetoContact};
