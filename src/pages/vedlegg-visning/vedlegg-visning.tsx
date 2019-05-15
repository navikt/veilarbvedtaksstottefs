import React, { useContext } from 'react';
import { TilbakeKnapp } from '../../components/skjema/tilbakeknapp';
import { ActionType } from '../../components/viewcontroller/view-reducer';
import { ViewDispatch } from '../../components/app-provider/app-provider';
import useFetch, { Status } from '../../utils/hooks/useFetch';
import { VEILARBVEDTAKSSTOTTE_API } from '../../api/veilarbvedtakkstotte-api';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { AlertStripeFeilSolid } from 'nav-frontend-alertstriper';
import JsonViewer from '../../components/json-viewer/json-viewer';
import { Opplysning } from '../../utils/types/opplysning';
import Card from '../../components/card/card';
import { OpplysningType } from '../../components/skjema/opplysninger/opplysninger';
import { OrNothing } from '../../utils/types/ornothing';
import { Innholdstittel, Sidetittel } from 'nav-frontend-typografi';
import './vedlegg-visning.less';

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
        return <AlertStripeFeilSolid>Noe gikk galt, prøv igjen</AlertStripeFeilSolid>;
    }

    return (
        <>
            <TilbakeKnapp tilbake={() => dispatch({view: ActionType.VIS_VEDTAK, props: {id: props.vedtakId}})}/>
            <section className="vedlegg">
                <Sidetittel>Øyblikksbilde</Sidetittel>
                <Card className="vedlegg-card">
                    <Innholdstittel tag="h2" className="vedlegg-card__header">CV</Innholdstittel>
                    <JsonViewer json={finnOpplysning(OpplysningType.CV, opplysninger.data)}/>
                </Card>
                <Card className="vedlegg-card">
                    <h1 className="vedlegg-card__header">Jobbprofil</h1>
                    <JsonViewer json={finnOpplysning(OpplysningType.JOBBPROFIL, opplysninger.data)}/>
                </Card>
                <Card className="vedlegg-card">
                    <h1 className="vedlegg-card__header">Registrering</h1>
                    <JsonViewer json={finnOpplysning(OpplysningType.REGISTRERINGSINFO, opplysninger.data)}/>
                </Card>
                <Card className="vedlegg-card">
                    <h1 className="vedlegg-card__header">Egenvurdering</h1>
                    <JsonViewer json={finnOpplysning(OpplysningType.EGENVURDERING, opplysninger.data)}/>
                </Card>
            </section>
        </>
    );
}
