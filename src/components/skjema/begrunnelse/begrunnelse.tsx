import * as React from 'react';
import { Textarea } from 'nav-frontend-skjema';
import './begrunnelse.less';
import { Undertittel } from 'nav-frontend-typografi';

interface BegrunnelseProps  {
    begrunnelseTekst: string;
    handleBegrunnelseChanged: (e: any) => void;
}

function Begrunnelse (props: BegrunnelseProps) {
    const { begrunnelseTekst, handleBegrunnelseChanged } = props;
    return (
        <div className="begrunnelse">
            <Undertittel>Begrunnselse</Undertittel>
                <Textarea
                    value={begrunnelseTekst}
                    label="Skriv inn begrunnelsen for vedtaket*"
                    maxLength={1000}
                    onChange={(e: any) => handleBegrunnelseChanged(e.target.value)}
                />
        </div>
    );

}

export default Begrunnelse;
