import axios from "axios";
import apiUrls from "../../apiUrls";

export const messageService = {
    getConversationList: async (token) => {
        const { data } = await axios.get(`${apiUrls.conversationBase}/`, {
            headers: {Authorization: `JWT ${token}`}
        });
        return data;
    },
    getConversationsWithContact: async (token, contactId) => {
        const { data } = await axios.get(`${apiUrls.conversationBase}/${contactId}/`, {
            headers: {Authorization: `JWT ${token}`}
        });
        return data;
    },
    deleteConversation: async (chatId, token) => {
        const { data } = await axios.post(`${apiUrls.deleteConversation}`, {
            conversation: chatId
        }, {
            headers: {Authorization: `JWT ${token}`}
        })
        return data;
    }
}