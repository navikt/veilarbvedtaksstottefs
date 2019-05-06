import React, { useContext, useEffect } from 'react';
import { Status } from '../utils/hooks/fetch-hook';
import { AppContext } from './app-provider/app-provider';
import axios from 'axios';

export const VEILARBVEDTAKSSTOTTE_API = '/veilarbvedtaksstotte/api';

export function DataFetcher (props: {fnr: string, children: any}) {
    const {setUtkast, setVedtak, utkast, vedtak} = useContext(AppContext);

    const fetchUtkastData = async () => {
        setUtkast(prevState => ({...prevState, status: Status.LOADING}));
        try {
            const res = await axios.get(`${VEILARBVEDTAKSSTOTTE_API}/${props.fnr}/utkast`);
            if (res.status) {
                setUtkast({status: Status.DONE, data: res.data});
            } else {
                setUtkast(prevState => ({...prevState, status: Status.ERROR}));
            }
        } catch (e) {
            setUtkast(prevState => ({...prevState, status: Status.ERROR}));
        }
    };

    const fetchVedtakData = async () => {
        setVedtak(prevState => ({...prevState, status: Status.LOADING}));
        try {
            const res = await axios.get(`${VEILARBVEDTAKSSTOTTE_API}/${props.fnr}/vedtak`);
            if (res.status) {
                setVedtak({status: Status.DONE, data: res.data});
            } else {
                setVedtak(prevState => ({...prevState, status: Status.ERROR}));
            }
        } catch (e) {
            setVedtak(prevState => ({...prevState, status: Status.ERROR}));
        }
    };

    useEffect(() => {
        if (utkast.status === Status.NOT_STARTED) {
            fetchUtkastData();
        }
    }, [utkast.status]);

    useEffect(() => {
        if (vedtak.status === Status.NOT_STARTED) {
            fetchVedtakData();
        }
    }, [vedtak.status]);

    return props.children;
}
