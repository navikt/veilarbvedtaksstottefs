import React, { useContext } from 'react';
import { ViewDispatch } from '../components/providers/view-provider';
import { VedtakVisning } from '../components/skjema/visning/visning';
import { VedtakData } from '../utils/types/vedtak';
import { TilbakeKnapp } from '../components/skjema/tilbakeknapp';
import { ActionType } from '../components/viewcontroller/view-reducer';
import { useFetchState } from '../components/providers/fetch-provider';

export function VisVedtak(props: {id: number}) {
    const [vedtak] = useFetchState('vedtak');
    const {dispatch} = useContext(ViewDispatch);
    const vedtakvisning = vedtak.data.find((v: VedtakData) => v.id === props.id);

    if (vedtakvisning) {
        return(
            <>
                <TilbakeKnapp tilbake={() => dispatch({view: ActionType.HOVEDSIDE})}/>
                <VedtakVisning vedtak={vedtakvisning}/>
            </>
        );
    }
    return <div/>;
}
