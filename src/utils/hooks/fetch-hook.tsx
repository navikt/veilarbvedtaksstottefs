import { useEffect, useState } from 'react';
import axios from 'axios';
import { OrNothing } from '../types/ornothing';

export enum Status {
    LOADING,
    DONE,
    ERROR
}

const initialState = {
    status: Status.LOADING,
    data: null
};

function fetchHook<T> (url: string, deps?: any) {
    const [state, setState] = useState<{data: OrNothing<T>, status: Status}>(initialState);

    const fetchData = async () => {
        try {
            const res = await axios.get(url);
            if (res.status) {
                setState({status: Status.DONE, data: res.data});
            } else {
                setState({...state, status: Status.ERROR});
            }
        } catch (e) {
            setState({...state, status: Status.ERROR});
        }
    };

    useEffect(() => {
        fetchData();
    }, [deps]);

    return state;
}

export default fetchHook;