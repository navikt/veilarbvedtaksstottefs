import React from 'react';
import { MalformPanel } from './malform-panel/malform-panel';
import { useFetchStore } from '../../../stores/fetch-store';
import './malform.less';

export const Malform = () => {
	const { malform } = useFetchStore();

    return (
    	<div className="malform">
		    <MalformPanel malform={malform.data && malform.data.malform}/>
	    </div>
    );
};
