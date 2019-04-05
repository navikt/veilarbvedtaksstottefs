import * as React from 'react';
import './aksjoner.less';
import { Knapp } from 'nav-frontend-knapper';

class Aksjoner extends React.Component {

    render() {
        return (
            <div className="aksjoner">
                <Knapp>
                    Send vedtak
                </Knapp>
            </div>
        );
    }

}

export default Aksjoner;
