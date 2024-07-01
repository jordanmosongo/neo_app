import {useState, useEffect, useCallback} from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

export const useFetch = (URL) => {
    const [data, setData] = useState([]);
    const [state, setState] = useState({
        isLoading: false,
        error: null
    });

    const token = useSelector(({user: {tokens}}) => tokens.access);

    const fetchData =  async () => {
      try {
        setState({...state, isLoading: true})
        const { data } = await axios.get(URL, {headers: {Authorization: `JWT ${token}`}});
        setData(data);
      } catch (error) {
        setState({...state, error})
      } finally {
        setState({...state, isLoading: false})
      }
    };

    useEffect(() => {
      (async() => {
        await fetchData();
      })()
    }, []);

    return {
        isLoading: state.isLoading, 
        data,
        error: state.error
    }
}