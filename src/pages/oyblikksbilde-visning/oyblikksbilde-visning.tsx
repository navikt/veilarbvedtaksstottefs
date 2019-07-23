import React, { useContext, useEffect } from 'react';
import { ActionType } from '../../components/viewcontroller/view-reducer';
import { ViewDispatch } from '../../components/providers/view-provider';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import JsonViewer from '../../components/json-viewer/json-viewer';
import { Oyblikksbilde } from '../../utils/types/oyblikksbilde';
import Card from '../../components/card/card';
import { OrNothing } from '../../utils/types/ornothing';
import { Innholdstittel, Systemtittel } from 'nav-frontend-typografi';
import Page from '../page/page';
import KildeType from '../../utils/types/kilde-type';
import { logMetrikk } from '../../utils/frontend-logger';
import Footer from '../../components/footer/footer';
import { Hovedknapp } from 'nav-frontend-knapper';
import './oyblikksbilde-visning.less';
import useFetch from '../../rest/use-fetch';
import { HentOyblikksbildeFetchParams, lagHentOyblikksbildeFetchInfo } from '../../rest/api';
import { hasFailed, isNotStarted, isNotStartedOrPending } from '../../rest/utils';

interface VedleggVisningProps {
    vedtakId: number;
    fnr: string;
}

function finnOyblikksbilde(kildeType: KildeType, oyblikksbilder: OrNothing<Oyblikksbilde[]>): string | null {
    const oyblikksbilde = oyblikksbilder ? oyblikksbilder.find(o => o.kildeType === kildeType) : null;
    return oyblikksbilde ? oyblikksbilde.json : null;
}

export function OyblikksbildeVisning (props: VedleggVisningProps) {
    const {dispatch} = useContext(ViewDispatch);
    const oyblikksbilder = useFetch<Oyblikksbilde[], HentOyblikksbildeFetchParams>(lagHentOyblikksbildeFetchInfo);

    useEffect(() => {
        logMetrikk('vis-oyblikksbilde');

        if (isNotStarted(oyblikksbilder)) {
            oyblikksbilder.fetch(props);
        }
    }, []);

    if (isNotStartedOrPending(oyblikksbilder)) {
        return <NavFrontendSpinner className="vedtaksstotte-spinner" type="XL"/>;
    } else if (hasFailed(oyblikksbilder)) {
        return <AlertStripeFeil className="vedtaksstotte-alert">Noe gikk galt, prøv igjen</AlertStripeFeil>;
    }

    return (
        <Page className="oyblikksbilde-visning">
            <section className="vedlegg">
                <Innholdstittel>Brukerinformasjon på vedtakstidspunktet</Innholdstittel>
                <VedleggCard tittel="CV og Jobbprofil" json={finnOyblikksbilde(KildeType.CV_OG_JOBBPROFIL, oyblikksbilder.data)}/>
                <VedleggCard tittel="Registrering" json={finnOyblikksbilde(KildeType.REGISTRERINGSINFO, oyblikksbilder.data)}/>
                <VedleggCard tittel="Egenvurdering" json={finnOyblikksbilde(KildeType.EGENVURDERING, oyblikksbilder.data)}/>
            </section>
            <Footer className="oyblikksbilde-visning__footer">
                <div className="oyblikksbilde-visning__aksjoner">
                    <Hovedknapp
                        mini={true}
                        onClick={() => dispatch({view: ActionType.VIS_VEDTAK, props: {id: props.vedtakId}})}
                    >
                        Tilbake til vedtak
                    </Hovedknapp>
                </div>
            </Footer>
        </Page>
    );
}

function VedleggCard({tittel, json}: { tittel: string, json: string | null}) {
    return (
        <Card className="vedlegg-card">
            <Systemtittel tag="h2" className="vedlegg-card__header">{tittel}</Systemtittel>
            <JsonViewer json={json} className="oyblikksbilde-visning__json-visning"/>
        </Card>
    );
}
