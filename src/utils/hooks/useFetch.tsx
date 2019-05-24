import { useEffect, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { AppFetchState, useFetchState } from '../../components/providers/fetch-provider';
import { FetchState, initialFetchState, Status } from '../fetch-utils';

const fetchData = async (config: AxiosRequestConfig, setState: Function) => {
    try {
        const res = await axios(config);
        if (res.status) {
            setState({status: Status.DONE, data: res.data});
        } else {
            setState({status: Status.ERROR, data: null});
        }
    } catch (e) {
        console.error(e); // tslint:disable-line
        setState({status: Status.ERROR, data: null});
    }
};

export function useGlobalFetch<T>(config: AxiosRequestConfig, name: keyof AppFetchState): FetchState<T> {
    const [state, setState] = useFetchState(name);

    useEffect(() => {
        fetchData(config, setState);
    }, []);

    return state as any;
}

export function useFetch<T> (config: AxiosRequestConfig): FetchState<T> {
    const [state, setState] = useState<FetchState<T>>(initialFetchState);

    useEffect(() => {
        fetchData(config, setState);
    }, []);

    return state;
}
