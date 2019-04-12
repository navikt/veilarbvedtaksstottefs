import * as React from 'react';
import { Textarea } from 'nav-frontend-skjema';
import './begrunnelse.less';

interface BegrunnelseProps  {
    begrunnelseTekst: string;
    handleBegrunnelseChanged: (e: any) => void;
}

function Begrunnelse (props: BegrunnelseProps) {
    const { begrunnelseTekst, handleBegrunnelseChanged } = props;
    return (
        <div className="begrunnelse">
                <Textarea
                    value={begrunnelseTekst}
                    label="Begrunnelse:"
                    maxLength={1000}
                    onChange={(e: any) => handleBegrunnelseChanged(e.target.value)}
                />
        </div>
    );

}

export default Begrunnelse;
