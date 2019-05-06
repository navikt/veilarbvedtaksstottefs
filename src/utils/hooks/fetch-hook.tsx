import { useEffect, useState } from 'react';
import axios from 'axios';
import { OrNothing } from '../types/ornothing';

export enum Status {
    NOT_STARTED = 'NOT_STARTED',
    LOADING = 'LOADING',
    DONE = 'DONE',
    ERROR = 'ERROR'
}

interface FetchState<T> {
    data: OrNothing<T>;
    status: Status;
}

const initialState = {
    status: Status.LOADING,
    data: null
};

function fetchHook<T> (url: string) {
    const [state, setState] = useState<{data: OrNothing<T>, status: Status}>(initialState);

    const fetchData = async () => {
        try {
            const res = await axios.get(url);
            if (res.status) {
                setState({status: Status.DONE, data: res.data});
            } else {
                setState({status: Status.ERROR, data: null});
            }
        } catch (e) {
            setState({...state, status: Status.ERROR});
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return state;
}

export default fetchHook;