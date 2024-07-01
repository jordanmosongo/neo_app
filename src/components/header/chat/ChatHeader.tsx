
import React, {useState} from 'react';
import {View, Text, Alert} from 'react-native';
import {Icon} from 'react-native-elements';
import {Badge} from 'react-native-paper';
import {styles} from './ChatHeaderStyles';
import {ConfirmationModal} from '../../modals/confirmation/ConfirmationModal';
import {messageService} from '../../../services/messageService';
import {useSelector, useDispatch} from 'react-redux';
import {AlertModal} from '../../modals/alert/AlertModal';
import {setCanRefreshChat} from '../../../store/userSlice';

export const ChatHeader = (props: any) => {
  const {user} = props;

  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    visible: false,
    title: 'Titre',
    message: 'message',
  });

  const token = useSelector(({user: {tokens}}: any) => tokens.access);
  const dispatch = useDispatch();
  const counter = notif.filter(function (notifs) {
    return notifs.etat === false;
  });

  const handleConsent = async () => {
    try {
      setLoading(true);
      await messageService.deleteConversation(user.chatId, token);
      setAlertInfo({
        visible: true,
        title: 'Opération réussie',
        message: 'La conversation est supprimée avec succès !',
      });
    } catch (error) {
      // Instructions on error
    } finally {
      setLoading(false);
      setIsVisible(false);
    }
  };
  return (
    <>
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.title}>
            {user.firstname} {user.name}
          </Text>
          {/* <View style={styles.badgeContainer}>
              <Badge size={10} style={styles.badge}></Badge>
              <Text style={styles.badgeText}>En ligne</Text>
            </View> */}
        </View>
        <View>
          <Icon
            name="trash"
            type="ionicon"
            size={18}
            color="#fff"
            onPress={() => setIsVisible(true)}
          />
        </View>
      </View>
      <ConfirmationModal
        confirmMessage={`Toute la conversation avec ${user.firstname} ${user.name} sera supprimée. Etes-vous sûr(e) de supprimer ?`}
        isVisible={isVisible}
        loading={loading}
        handleDeny={() => setIsVisible(false)}
        handleConsent={async () => await handleConsent()}
      />
      <AlertModal
        isAlertVisible={alertInfo.visible}
        title={alertInfo.title}
        confirmMessage={alertInfo.message}
        closeAlert={() => {
          setAlertInfo(prevState => ({...prevState, visible: false}));
          dispatch(setCanRefreshChat());
        }}
      />
    </>
  );
};
