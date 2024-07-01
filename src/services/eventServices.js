import axios from "axios"
import http from "./config";

export const evenementsRedux = (token, dispatch) => {
    axios.get(http + "/api/evenements", {
        headers: {
            'Authorization': 'JWT ' + token
        }
    })
        .then((reponse) => {
            dispatch(
                {
                    type: 'evenements/addEvenements',
                    payload: reponse.data
                }
            );
        })
}
export const evenementSelectRedux = (token, dispatch, id) => {
    axios.get(http + "/api/evenements/" + id, {
        headers: {
            'Authorization': 'JWT ' + token
        }
    })
        .then((reponse) => {
            dispatch(
                {
                    type: 'evenements/addEvenementSelect',
                    payload: reponse.data
                }
            );
        })
}
export const participantsRedux = (token, dispatch, id) => {
    axios.get(http + "/api/evenements/" + id + "/participants", {
        headers: {
            'Authorization': 'JWT ' + token
        }
    })
        .then((reponse) => {
            dispatch(
                {
                    type: 'evenements/addParticipants',
                    payload: reponse.data
                }
            );
        })
}
