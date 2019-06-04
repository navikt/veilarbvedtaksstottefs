import React from 'react';
import { getHovedmalNavn, HovedmalType } from '../hovedmal/hovedmal';

export function HovedmalVisning(props: {hovedmal: HovedmalType}) {
    return (
        <section>
          <label>Hovedmål:</label>
            <span>{getHovedmalNavn(props.hovedmal)}</span>
        </section>
    );
}
