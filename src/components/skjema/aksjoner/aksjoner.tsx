import * as React from 'react';
import './aksjoner.less';
import { Knapp } from 'nav-frontend-knapper';

function Aksjoner (props: {handleSubmit: (e: any) => void} ) {
    return (
        <div className="aksjoner">
            <Knapp htmlType="submit" onClick={props.handleSubmit}>
                Lagre utkast
            </Knapp>
        </div>
    );

}

export default Aksjoner;