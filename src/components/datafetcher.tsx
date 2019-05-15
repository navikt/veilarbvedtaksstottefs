import React, { useContext, useEffect } from 'react';
import { Status } from '../utils/hooks/useFetch';
import { AppContext } from './app-provider/app-provider';
import VeilarbVedtakkstotteApi from '../api/veilarbvedtakkstotte-api';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { AlertStripeFeilSolid } from 'nav-frontend-alertstriper';

export function DataFetcher (props: {fnr: string, children: any}) {
    const {setVedtak, vedtak} = useContext(AppContext);

    const fetchVedtakData = async () => {
        setVedtak(prevState => ({...prevState, status: Status.LOADING}));
        try {
            const res = await VeilarbVedtakkstotteApi.hentVedtak(props.fnr);
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
        if (vedtak.status === Status.NOT_STARTED) {
            fetchVedtakData();
        }
    }, [vedtak.status]);

    const status = vedtak.status;

    if (status === 'NOT_STARTED' || status === 'LOADING') {
        return <NavFrontendSpinner type="XL"/>;
    } else if (status === 'ERROR') {
        return <AlertStripeFeilSolid>Noe gikk galt, prøv igjen</AlertStripeFeilSolid>;
    }

    return props.children;
}
