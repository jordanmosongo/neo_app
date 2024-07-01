import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {userServices} from '../services/userServices';
import {setDetailtParticipants} from '../store/userSlice';
import { contactService } from '../services/contactService';

const useDetailtParticipants = (refresh) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    async function fetchData() {
        const DetailtParticipants = await userServices.getDetailParticipants(
         user.selectedEvenementId,
         user?.tokens.access,
         user.selectparticipant_id,
       );
       dispatch(setDetailtParticipants(DetailtParticipants));
      }
    useEffect(() => {
      (async() => await fetchData())();    
    }, [refresh]);
};

export {useDetailtParticipants};
