import React from 'react';
import { VenstreChevron } from 'nav-frontend-chevron';
import { Flatknapp } from 'nav-frontend-knapper';

export function TilbakeKnapp(props: {tilbake: (e: any) => void}) {
    return (
        <Flatknapp className="skjema__tilbakeknapp" onClick={props.tilbake}>
            <VenstreChevron
                className="skjema__tilbakeknapp--chevron"
            />
            <span className="skjema__tilbakeknapp--tekst">Tilbake</span>
        </Flatknapp>
    );
}