import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { NotificationCard } from '../../components/cards/notification/NotificationCard';
import { useDispatch, useSelector } from 'react-redux';

import { userServices } from '../../services/userServices';
import { MainHeader } from '../../components/header/main/MainHeader';
import { MaiLoaderComponent } from '../../components/loaders/MainLoader';
import { BackNavigation } from '../../components/buttons/back/BackNavigation';
import { AlertModal } from '../../components/modals/alert/AlertModal';
import { useNavigation } from '@react-navigation/native';
import { EmptyListComponent } from '../../components/empty/EmptyList';
import { ManageStatusComponent } from '../../components/ManageStatusComponent';
import { setIsInChat } from '../../store/userSlice';
import apiUrls from '../../../apiUrls';

export const NotificationScreen = () => {
  const { tokens, nbreOfNotifications, participant_id } = useSelector(state => state.user);

  const [notifications, setNotifications] = useState([]);
  const [isFetching, setIsFecthing] = useState(false);
  const [allReadyLoaded, setAllReadyLoaded] = useState(false);
  const [responseError, setResponseError] = useState(null);
  const [responseResult, setResponseResult] = useState(null);
  const [nbreOfRepetitions, setNbreOfRepetitions] = useState(0);

  const [alertInfo, setAlertInfo] = useState({
    visible: false,
    title: 'Titre',
    message: 'message'
  });

  const navigation = useNavigation();
  const dispatch = useDispatch();

  dispatch(setIsInChat(false));

  const fetchNotifications = () => {
    setIsFecthing(true);
    setResponseResult(null);
    userServices.getNotifications(tokens.access)
      .then((result) => {
        // console.log('result item', Object.keys(result[0]));
        setNotifications(result);
        setResponseResult(result);
        setAllReadyLoaded(true);
        setIsFecthing(false);
      })
      .catch((err) => {
        setResponseError(err);
      })
  }

  useEffect(() => {
    fetchNotifications();
  }, [nbreOfNotifications]);

  return (
    <>
      <MainHeader
        withTitle={true}
        title="Notifications"
        marginTop={-10}
        noBackAction={true}
      />
      {(allReadyLoaded) && <View style={{
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10
      }}>
        <BackNavigation title={'Notification'} goBack={() => navigation.goBack()} />
      </View>}
      {!allReadyLoaded && <MaiLoaderComponent />}
      {allReadyLoaded && notifications.length === 0 && <EmptyListComponent message={'Aucune notification sur la liste !'} />}
      {allReadyLoaded &&
        <ScrollView style={{
          backgroundColor: '#fff',
          paddingHorizontal: 20,
          paddingBottom: 50
        }}>
          {notifications.map((notification, index) => {
            return <NotificationCard
              key={index}
              type={notification.type}
              created_at={notification.updated_at}
              emitor={notification.participant_emeteur}
              room={notification.room}
              conversationId={notification.id_target}
              targetId={notification.id_target}
              dataTarget={notification.data_target}
              idNotification={notification.id}
              detail={notification.detail}
            />
          })
          }
        </ScrollView>
      }
      <AlertModal
        isAlertVisible={alertInfo.visible}
        title={alertInfo.title}
        confirmMessage={alertInfo.message}
        closeAlert={() => {
          setAlertInfo((prevState) => ({ ...prevState, visible: false }));
          fetchNotifications();
        }}
      />
      {((responseError?.request || responseError?.response) && !responseResult) && (
        <ManageStatusComponent
          error={responseError}
          nbreOfRepetitions={nbreOfRepetitions}
          isStatusError={true}
          handleActionOnError={async () => {
            fetchNotifications();
            setNbreOfRepetitions((prevState) => prevState + 1);
          }}
        />)}
    </>
  );
};
