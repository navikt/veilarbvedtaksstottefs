import React, { useContext } from 'react';
import { TilbakeKnapp } from '../../components/skjema/tilbakeknapp';
import { ActionType } from '../../components/viewcontroller/view-reducer';
import { ViewDispatch } from '../../components/providers/view-provider';
import { useFetch } from '../../utils/hooks/useFetch';
import { VEILARBVEDTAKSSTOTTE_API } from '../../api/vedtaksstotte-api';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import JsonViewer from '../../components/json-viewer/json-viewer';
import { Opplysning } from '../../utils/types/opplysning';
import Card from '../../components/card/card';
import { OpplysningType } from '../../components/skjema/opplysninger/opplysninger';
import { OrNothing } from '../../utils/types/ornothing';
import { Innholdstittel, Sidetittel } from 'nav-frontend-typografi';
import './vedlegg-visning.less';
import { Status } from '../../utils/fetch-utils';

interface VedleggVisningProps {
    vedtakId: number;
    fnr: string;
}

function finnOpplysning(opplysningType: OpplysningType, opplysninger: OrNothing<Opplysning[]>): string | null {
    const opplysning = opplysninger ? opplysninger.find(o => o.opplysningsType === opplysningType) : null;
    return opplysning ? opplysning.json : null;
}

export function VedleggVisning (props: VedleggVisningProps) {
    const {dispatch} = useContext(ViewDispatch);
    const opplysninger = useFetch<Opplysning[]>({
        url: `${VEILARBVEDTAKSSTOTTE_API}/${props.fnr}/opplysninger/${props.vedtakId}`
    });

    if (opplysninger.status === Status.LOADING || opplysninger.status === Status.NOT_STARTED) {
        return <NavFrontendSpinner type="XL"/>;
    } else if (opplysninger.status === Status.ERROR) {
        return <AlertStripeFeil>Noe gikk galt, prøv igjen</AlertStripeFeil>;
    }

    return (
        <>
            <TilbakeKnapp tilbake={() => dispatch({view: ActionType.VIS_VEDTAK, props: {id: props.vedtakId}})}/>
            <section className="vedlegg">
                <Sidetittel>Brukerinformasjon på vedtakstidspunktet</Sidetittel>
                <VedleggCard tittel="CV" json={finnOpplysning(OpplysningType.CV, opplysninger.data)}/>
                <VedleggCard tittel="Jobbprofil" json={finnOpplysning(OpplysningType.JOBBPROFIL, opplysninger.data)}/>
                <VedleggCard tittel="Registrering" json={finnOpplysning(OpplysningType.REGISTRERINGSINFO, opplysninger.data)}/>
                <VedleggCard tittel="Egenvurdering" json={finnOpplysning(OpplysningType.EGENVURDERING, opplysninger.data)}/>
            </section>
        </>
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
