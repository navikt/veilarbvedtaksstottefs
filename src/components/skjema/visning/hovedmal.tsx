import React from 'react';
import { HovedmalType } from '../hovedmal/hovedmal';

export function HovedmalVisning(props: {hovedmal: HovedmalType}) {
    return (
        <div>
          <label>Hovedmal</label>
            <span>{props.hovedmal}</span>
        </div>
    );
}