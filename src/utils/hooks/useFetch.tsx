import { useEffect, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
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

function useFetch<T> (config: AxiosRequestConfig) {
    const [state, setState] = useState<FetchState<T>>(initialState);

    const fetchData = async () => {
        try {
            const res = await axios(config);
            if (res.status) {
                setState({status: Status.DONE, data: res.data});
            } else {
                setState({status: Status.ERROR, data: null});
            }
        } catch (e) {
            console.error(e); // tslint:disable-line
            setState({...state, status: Status.ERROR});
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return state;
}

export default useFetch;
