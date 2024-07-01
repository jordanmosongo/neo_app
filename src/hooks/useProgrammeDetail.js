import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {userServices} from '../services/userServices';
import {setprogrammesDetail} from '../store/userSlice';

const useProgrammeDetail = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  useEffect(() => {
    async function fetchData() {
      const programmesDetail = await userServices.getDetailProgramme(
        user.selectedProgrammeId,
        user?.tokens.access,
      );

      dispatch(setprogrammesDetail(programmesDetail));
    }

    fetchData();
  }, [dispatch, user.selectedProgrammeId, user?.tokens.access]);

  return {user};
};

export {useProgrammeDetail};
