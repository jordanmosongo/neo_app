import {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

export const usePost = (URL) => {
    const [state, setState] = useState({
        isLoading: false,
        data: [],
        error: null
    });

    const token = useSelector(({user: {tokens}}) => tokens.access);

    useEffect(() => {
        (async () => {
          try {
            setState({...state, isLoading: true})
            const { data } = await axios.get(URL, {headers: {Authorization: `JWT ${token}`}});
            setState({...state, data})
          } catch (error) {
            setState({...state, error})
          } finally {
            setState({...state, isLoading: false})
          }
        })();
    }, [URL]);

    return {
        isLoading: state.isLoading, 
        data: state.data,
        error: state.error
    }
}