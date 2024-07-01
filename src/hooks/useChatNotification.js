import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userServices } from '../services/userServices';
import { setNbreOfNotifications } from '../store/userSlice';
import apiUrls from '../../apiUrls';

export const useChatNotifications = (guestId) => {

  const { tokens, nbreOfNotifications, participant_id, isInChat, refreshHeaderNotifNumber } = useSelector(({ user }) => user);
  const [unreadNotifications, setUnreadNotifications] = useState(nbreOfNotifications);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const updateUnreadNotifications = async (notifications) => {
    let updatedNumber = 0;
    for (const notification of notifications) {
      if (notification.participant_emeteur.id === guestId && notification.type === 'MESSAGE') {
        await userServices.updatStatNotification({ etat: true }, tokens.access, notification.id);
        updatedNumber++;
      }
    }
    return updatedNumber;
  }

  const fetchChatNotifications = async () => {
    try {
      const notifications = await userServices.getNotifications(
        tokens.access
      );
      const unreadNotificationsArr = notifications.filter(({ etat }) => !etat);
      setUnreadNotifications(unreadNotificationsArr.length);
      dispatch(setNbreOfNotifications(unreadNotificationsArr.length));

      if (isInChat) {
        const updatedNumber = await updateUnreadNotifications(unreadNotificationsArr);

       setUnreadNotifications(unreadNotificationsArr.length - updatedNumber);
        dispatch(setNbreOfNotifications(unreadNotificationsArr.length - updatedNumber));
      }

    } catch (error) {
      setError(error);
    }
  }

  useEffect(() => {

    (async () => await fetchChatNotifications())();
    const socket = new WebSocket(`${apiUrls.baseSocketUrl}/notification/?token=${tokens.access}`);

    socket.onopen = () => {
      console.log('socket is opened to get chat notification');
    }

    socket.onclose = (e) => {
      console.log('socket close from chat notif', e);
    }

    socket.onmessage = (event) => {
      const receivedNotification = JSON.parse(event.data);
      if (
        receivedNotification.type === 'notification' &&
        receivedNotification.message.participant_recepteur.id === participant_id
      ) {
        if (receivedNotification.message.type === 'MESSAGE' && receivedNotification.message.participant_emeteur.id === guestId) {
          userServices.updatStatNotification({ etat: true }, tokens.access, receivedNotification.message.id)
            .then(() => {
              console.log('message notification updated');
            })
            .catch((error) => console.log('error on update message notif', error));
        } else {
          if (isInChat) {
             dispatch(setNbreOfNotifications(nbreOfNotifications + 1));
          }         
        }
      }
    }
  }, []);

  return { unreadNotifications, error };
}