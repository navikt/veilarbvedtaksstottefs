import { useEffect, useState } from 'react';
import axios from 'axios';

export type Status = 'LOADING' | 'DONE' | 'ERROR';

const initialState = {
    status: 'LOADING',
    data: null
};

function fetchHook<T> (url: string) {
    const [state, setState] = useState(initialState);

    const fetchData = async () => {
        try {
            const res = await axios.get(url);
            if (res.status) {
                setState({status: 'DONE', data: res.data});
            } else {
                setState({...state, status: 'ERROR'});
            }
        } catch (e) {
            setState({...state, status: 'ERROR'});
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return state;
}

export default fetchHook;