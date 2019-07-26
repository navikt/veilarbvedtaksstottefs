import React from 'react';
import { getHovedmalNavn, HovedmalType } from '../skjema/hovedmal/hovedmal';
import SkjemaBolk from '../skjema/bolk/skjema-bolk';
import { OrNothing } from '../../utils/types/ornothing';

export function HovedmalVisning(props: {hovedmal: OrNothing<HovedmalType>}) {

    return (
        <SkjemaBolk
            tittel="Hovedmål"
            tittelId="hovedmal-id"
        >
            <span>{getHovedmalNavn(props.hovedmal)}</span>
        </SkjemaBolk>
    );
}
