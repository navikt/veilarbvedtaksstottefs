import React from 'react';
import { Hovedside } from '../pages/hovedside/hovedside';
import { VedtakskjemaVisningSide } from '../pages/vedtakskjema-visning/vedtakskjema-visning-side';
import { Forhandsvisning } from '../pages/forhandsvisning/forhandsvisning';
import { useViewStore, ViewType } from '../stores/view-store';
import { OyblikksbildeVisning } from '../pages/oyblikksbilde-visning/oyblikksbilde-visning';
import { VedtaksbrevVisning } from '../pages/vedtaksbrev-visning/vedtaksbrev-visning';
import { VedtakskjemaSide } from '../pages/vedtakskjema/vedtakskjema-side';

export function ViewController () {
    const { view, viewProps } = useViewStore();
    const vedtakId = viewProps.vedtakId;

    switch (view) {
        case ViewType.HOVEDSIDE:
            return <Hovedside/>;
        case ViewType.UTKAST:
            return <VedtakskjemaSide/>;
        case ViewType.FORHANDSVISNING:
            return <Forhandsvisning/>;
        case ViewType.VEDTAK:
            return <VedtakskjemaVisningSide vedtakId={vedtakId}/>;
        case ViewType.VEDLEGG:
            return <OyblikksbildeVisning vedtakId={vedtakId}/>;
        case ViewType.VEDTAK_PDF:
            return <VedtaksbrevVisning vedtakId={vedtakId}/>;
        default:
            return <Hovedside/>;
    }
}
