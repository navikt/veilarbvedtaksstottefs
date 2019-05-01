import React, { useContext } from 'react';
import { AppContext } from '../components/app-provider/app-provider';
import { VedtakVisning } from '../components/skjema/visning/visning';
import { VedtakData } from '../utils/types/vedtak';

export function VisGjeldeneVedtakk() {
    const {vedtak} = useContext(AppContext);
    const gjeldendeVedtak = vedtak.find((v: VedtakData) => v.gjeldende);

    if (gjeldendeVedtak) {
        return <VedtakVisning vedtak={gjeldendeVedtak}/>;
    }
    return <div/>;
}
