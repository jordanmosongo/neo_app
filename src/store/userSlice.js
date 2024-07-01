import { StackActions } from '@react-navigation/native';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  infos: {},
  infoLogin: {},
  evenements: [],
  config: {},
  playerId: null,
  eventParticipants: {},
  selectedEvenementId: '',
  selectedEvent: null,
  selectedProgrammeId: '',
  programmes: [],
  tokens: {
    access: '',
    refresh: '',
  },
  notif: [],
  nbreOfNotifications: 0,
  notifications: [],
  maJournee: [],
  programmeDetails: [],
  participant_id: '',
  selectparticipant_id: '',
  participantDetail: [],
  status: '',
  contactList: [],
  requestList: [],
  invitationList: [],
  invitations: [],
  conversationList: [],
  conversationsWithContact: [],
  canRefreshChat: false,
  messages: {},
  logoPremuim: [],
  exposants: [],
  canRefreshNotif: false,
  selectedUser: {},
  rendezVous: {},
  refreshNumber: 0,
  messagesToUpdate: [],
  isInChat: false,
  messagesNotification: [],
  newMessageNbre: 0,
  refreshHeaderNotifNumber: false,
  configData: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Set Access and Refresh Token
    setUserConnected: (state, action) => {
      const { access, refresh, participant_id } = action.payload;

      state.tokens = {
        access,
        refresh,
      };
      state.participant_id = participant_id;

      state.status = 'CONNECTED';
    },

    setParticipantInfos: (state, action) => {
      state.infos = action.payload;
    },
    setLoginInfos: (state, action) => {
      state.infoLogin = action.payload;
    },

    setEvenementsInfos: (state, action) => {
      state.evenements = action.payload;
    },
    setConfigurationinfos: (state, action) => {
      state.config = action.payload;
    },

    setSelectedEvenementId: (state, action) => {
      state.selectedEvenementId = action.payload;
    },
    setSelectedProgrammeId: (state, action) => {
      state.selectedProgrammeId = action.payload;
    },
    setprogrammesDetail: (state, action) => {
      state.programmeDetails = action.payload;
    },
    setMaJourneeInfos: (state, action) => {
      state.maJournee = action.payload;
    },
    setLogoPremium: (state, action) => {
      state.logoPremuim = action.payload;
    },
    setMessagetoContact: (state, action) => {
      state.messages = action.payload;
    },
    setProgrammes: (state, action) => {
      state.programmes = action.payload;
    },

    setEventParticipants: (state, action) => {
      state.eventParticipants = action.payload;
    },
    setNotificationList: (state, action) => {
      state.notif = action.payload;
    },

    setUser: (state, action) => { },

    setUserLogout: (state, action) => {
      state.status = '';
    },
    setContactList: (state, action) => {
      state.contactList = action.payload;
    },
    setRequestList: (state, action) => {
      state.requestList = action.payload;
    },
    setInvitationList: (state, action) => {
      state.invitationList = action.payload;
    },
    setConversationList: (state, action) => {
      state.conversationList = action.payload;
    },
    setConversationsWithContact: (state, action) => {
      state.conversationsWithContact = action.payload;
    },
    setCanRefreshChat: state => {
      state.canRefreshChat = !state.canRefreshChat;
    },
    setExposants: (state, action) => {
      state.exposants = action.payload;
    },
    setCanRefreshNotif: state => {
      state.canRefreshNotif = !state.canRefreshNotif;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setRendezVous: (state, action) => {
      state.rendezVous = action.payload;
    },
    setDetailtParticipants: (state, action) => {
      state.participantDetail = action.payload;
    },
    setSelectedParticiapantId: (state, action) => {
      state.selectparticipant_id = action.payload;
    },
    setNbreOfNotifications: (state, action) => {
      state.nbreOfNotifications = action.payload
    },
    setRefreshNumber: (state) => {
      state.refreshNumber += 1;
    },
    setSelectedEvent: (state, data) => {
      state.selectedEvent = data.payload;
    },
    setPlayerId: (state, data) => {
      state.playerId = data.payload;
    },
    setNotifications: (state, data) => {
      state.notifications = data.payload;
    },
    setMessagesToUpdate: (state, data) => {
      state.messagesToUpdate = data.payload;
    },

    setIsInChat: (state, data) => {
      // Payload here is a boolean
      state.isInChat = data.payload;
    },
    setMessagesNotification: (state, data) => {
      // Payload is message notification received
      state.messagesNotification.push(data.payload);
    },
    removeMessagesNotification: (state, data) => {
      // Payload is the position of message notification
      state.messagesNotification.splice(data.payload, 1);
    },
    setNewMessageNbre: (state) => {
      state.newMessageNbre += 1;
    },
    initNewMessageNbre: (state) => {
      state.newMessageNbre = 0;
    },
    setRefreshHeaderNotifNumber: (state) => {
      state.refreshHeaderNotifNumber = !state.refreshHeaderNotifNumber;
    },
    setConfigData: (state, data) => {
      state.configData = data.payload;
    },
    initializeStore: (state) => {
      state.nbreOfNotifications = 0;
      state.infos = {};
      state.infoLogin = {};
      
      state.tokens = {
        access: '',
        refresh: '',
      };
    },
  },
});

export const {
  initializeStore,
  setMessagesNotification,
  removeMessagesNotification,
  setUser,
  setUserConnected,
  setParticipantInfos,
  setMaJourneeInfos,
  setEvenementsInfos,
  setProgrammes,
  setUserLogout,
  setSelectedEvenementId,
  setSelectedProgrammeId,
  setprogrammesDetail,
  setEventParticipants,
  setNotificationList,
  setInvitationList,
  setContactList,
  setRequestList,
  setConversationList,
  setConversationsWithContact,
  setCanRefreshChat,
  setMessagetoContact,
  setConfigurationinfos,
  setLogoPremium,
  setCanRefreshNotif,
  setExposants,
  setSelectedUser,
  setDetailtParticipants,
  setSelectedParticiapantId,
  setRendezVous,
  setNbreOfNotifications, setLoginInfos,
  setRefreshNumber,
  setSelectedEvent,
  setPlayerId,
  setMessagesToUpdate,
  setIsInChat,
  setNewMessageNbre,
  initNewMessageNbre,
  setRefreshHeaderNotifNumber,
  setConfigData
} = userSlice.actions;
export default userSlice;
