import * as React from 'react';
import { Textarea } from 'nav-frontend-skjema';
import './begrunnelse.less';

interface BegrunnelseState {
    begrunnelseTekst: string;
}

class Begrunnelse extends React.Component<{}, BegrunnelseState> {

    state = {
        begrunnelseTekst: ''
    };

    handleBegrunnelseChanged = (e: any) => {
        this.setState({ begrunnelseTekst: e.target.value });
    }

    render() {
        const { begrunnelseTekst } = this.state;
        return (
            <div className="begrunnelse">
                <Textarea
                    value={begrunnelseTekst}
                    label="Begrunnelse:"
                    maxLength={1000}
                    onChange={this.handleBegrunnelseChanged}
                />
            </div>
        );
    }

}

export default Begrunnelse;
