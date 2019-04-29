import React, { useContext } from 'react';
import { AppContext } from '../components/app-provider/app-provider';
import { VedtakVisning } from '../components/skjema/visning/visning';

export function VisGjeldeneVedtakk() {
    const {gjeldeneVedtak} = useContext(AppContext);
    if (gjeldeneVedtak) {
        return <VedtakVisning vedtak={gjeldeneVedtak}/>;
    }
    return <div/>;
}
