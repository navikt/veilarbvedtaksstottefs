import React, { useContext, useEffect } from 'react';
import { TilbakeKnapp } from '../../components/skjema/tilbakeknapp';
import { ActionType } from '../../components/viewcontroller/view-reducer';
import { ViewDispatch } from '../../components/providers/view-provider';
import { useFetch } from '../../utils/hooks/useFetch';
import VedtaksstotteApi  from '../../api/vedtaksstotte-api';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import JsonViewer from '../../components/json-viewer/json-viewer';
import { Oyblikksbilde } from '../../utils/types/oyblikksbilde';
import Card from '../../components/card/card';
import { OrNothing } from '../../utils/types/ornothing';
import { Innholdstittel, Sidetittel } from 'nav-frontend-typografi';
import { Status } from '../../utils/fetch-utils';
import Page from '../page/page';
import KildeType from '../../utils/types/kilde-type';
import { logMetrikk } from '../../utils/frontend-logger';
import Footer from '../../components/footer/footer';
import { Hovedknapp } from 'nav-frontend-knapper';
import './oyblikksbilde-visning.less';

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
    const oyblikksbilder = useFetch<Oyblikksbilde[]>(VedtaksstotteApi.hentOyblikksbilde(props.fnr, props.vedtakId));

    useEffect(() => logMetrikk('vis-oyblikksbilde'), []);

    if (oyblikksbilder.status === Status.LOADING || oyblikksbilder.status === Status.NOT_STARTED) {
        return <NavFrontendSpinner className="vedtaksstotte-spinner" type="XL"/>;
    } else if (oyblikksbilder.status === Status.ERROR) {
        return <AlertStripeFeil className="vedtaksstotte-alert">Noe gikk galt, prøv igjen</AlertStripeFeil>;
    }

    return (
        <Page className="oyblikksbilde-visning">
            <section className="vedlegg">
                <Sidetittel>Brukerinformasjon på vedtakstidspunktet</Sidetittel>
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
            <Innholdstittel tag="h2" className="vedlegg-card__header">{tittel}</Innholdstittel>
            <JsonViewer json={json}/>
        </Card>
    );
}
