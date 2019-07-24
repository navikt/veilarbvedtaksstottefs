import React from 'react';
import { Hovedside } from '../pages/hovedside/hovedside';
import { VedtakskjemaVisningSide } from '../pages/vedtakskjema-visning/vedtakskjema-visning-side';
import { Forhandsvisning } from '../pages/forhandsvisning/forhandsvisning';
import { useViewStoreContext, View } from '../stores/view-store';
import { OyblikksbildeVisning } from '../pages/oyblikksbilde-visning/oyblikksbilde-visning';
import { VedtaksbrevVisning } from '../pages/vedtaksbrev-visning/vedtaksbrev-visning';
import { VedtakskjemaSide } from '../pages/vedtakskjema/vedtakskjema-side';

export function ViewController () {
    const { view, viewProps } = useViewStoreContext();
    const vedtakId = viewProps.vedtakId;

    switch (view) {
        case View.HOVEDSIDE:
            return <Hovedside/>;
        case View.UTKAST:
            return <VedtakskjemaSide/>;
        case View.INNSENDING:
            return <Forhandsvisning/>;
        case View.VEDTAK:
            return <VedtakskjemaVisningSide vedtakId={vedtakId}/>;
        case View.VEDLEGG:
            return <OyblikksbildeVisning vedtakId={vedtakId}/>;
        case View.VEDTAK_PDF:
            return <VedtaksbrevVisning vedtakId={vedtakId}/>;
        default:
            return <Hovedside/>;
    }
}
