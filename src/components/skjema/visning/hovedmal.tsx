import React from 'react';
import { getHovedmalNavn, HovedmalType } from '../hovedmal/hovedmal';

export function HovedmalVisning(props: {hovedmal: HovedmalType}) {
    return (
        <div>
          <label>Hovedmal:</label>
            <span>{getHovedmalNavn(props.hovedmal)}</span>
        </div>
    );
}