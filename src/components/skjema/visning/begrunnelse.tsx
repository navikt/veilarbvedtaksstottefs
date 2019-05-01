import React from 'react';

export function BegrunnelseVisning(props: {begrunnelse: string}) {
    return (
        <div>
            <label>Hovedmal</label>
            <span>{props.begrunnelse}</span>
        </div>
    );
}