import React from 'react';

export function BegrunnelseVisning(props: {begrunnelse: string}) {
    return (
        <div>
            <label>Begrunnelse: </label>
            <span>{props.begrunnelse}</span>
        </div>
    );
}