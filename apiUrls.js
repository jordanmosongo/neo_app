/* const BASE_URL = 'http://neodev.kanieba.com';
const BASE_SOCKET_URL = 'wss://noebo2.kanieba.com:8002'; */

const BASE_URL = 'https://manage.neoevent.app';
const BASE_SOCKET_URL = 'wss://manage.neoevent.app:8001';

export default {
    apiBase: `${BASE_URL}/api`,
    baseUrl: BASE_URL,

    baseSocketUrl: `${BASE_SOCKET_URL}`,
    contacts: `${BASE_URL}/api/contacts`,
    contactBase: `${BASE_URL}/api/contact`,
    parameters: `${BASE_URL}/api/user-parameters`,
    login: `${BASE_URL}/token`,
    scanQrCode: `${BASE_URL}/api/participant-scan`,
    resetPassword: `${BASE_URL}/api/password`,
    baseParticipant: `${BASE_URL}/api/participants`,
    baseNotification: `${BASE_URL}/api/notifications`,
    baseProgram: `${BASE_URL}/api/programmes`,
    baseEvent: `${BASE_URL}/v2/api/evenements`,
    baseEventExposant: `${BASE_URL}/v3/api/evenement`,
    conversationBase: `${BASE_URL}/api/participant-conversation`,
    deleteConversation: `${BASE_URL}/api/delete-conversation`,
    appointmentBase: `${BASE_URL}/api/rendez_vous`,
    eventConversation: `${BASE_URL}/api/evenement-conversation`,
    standBase: `${BASE_URL}/api/stand`,
    pushNotificationBase: `${BASE_URL}/api/pushnotification`,
    pageConfigurationBase: `${BASE_URL}/api/configurations-pages`,
    interests: `${BASE_URL}/api/centre-interet`,

    
}