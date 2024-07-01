import axios from "axios";
import apiUrls from "../../apiUrls";

export const contactService = {
    getContactList: async (token) => {
        const { data } = await axios.get(`${apiUrls.contacts}?type=contacts`, {
            headers: {Authorization: `JWT ${token}`}
        });
        return data;
    },
    getInvitationList: async(token) => {
        const {data} = await axios.get(`${apiUrls.contacts}?type=invitations`, {
            headers: {Authorization: `JWT ${token}`}
        });
        return data;
    },
    getRequestList: async (token) => {
        const {data} = await axios.get(`${apiUrls.contacts}?type=demandes`, {
            headers: { Authorization: `JWT ${token}`}
        });
        return data;
    }
}