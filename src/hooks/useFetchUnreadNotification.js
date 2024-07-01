import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userServices } from '../services/userServices';
import { setNbreOfNotifications } from '../store/userSlice';
import apiUrls from '../../apiUrls';

export const useFetchUnreadNotifications = () => {

  const { tokens, nbreOfNotifications, participant_id, refreshHeaderNotifNumber } = useSelector(({ user }) => user);
  const [unreadNotifications, setUnreadNotifications] = useState(nbreOfNotifications);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const fetchUnReadNotifications = async () => {
    try {
      const notifications = await userServices.getNotifications(
        tokens.access
      );
      const unreadNotificationsNbre = [...notifications.filter(({ etat }) => !etat)].length;
      setUnreadNotifications(unreadNotificationsNbre);
      dispatch(setNbreOfNotifications(unreadNotificationsNbre));
    } catch (error) {
      setError(error);
    }
  }
  useEffect(() => {
    (async () => await fetchUnReadNotifications())();
    // initialize the socket
    const socket = new WebSocket(`${apiUrls.baseSocketUrl}/notification/?token=${tokens.access}`);

    socket.onopen = () => {
      console.log('socket is opened to get notification');
    }
    socket.onclose = (e) => {
      console.log('socket is closed', e);
    }
    socket.onmessage = (event) => {
      const receivedNotification = JSON.parse(event.data);
      if (
        receivedNotification.type === 'notification' &&
        receivedNotification.message.participant_recepteur.id === participant_id
      ) {
        dispatch(setNbreOfNotifications(nbreOfNotifications + 1));
        setUnreadNotifications((prevNumber) => prevNumber + 1);
      }
    }
  }, [nbreOfNotifications]);

  return { unreadNotifications, error };
}