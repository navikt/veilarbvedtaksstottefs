import React from 'react';
import Page from '../page/page';
import PrelanseringInfo from './prelansering-info';
import { LosningInfo } from './losning-info/losning-info';
import { PILOT_TOGGLE, PRELANSERING_INFO_OM_LOSNING_TOGGLE } from '../../rest/data/features';
import { useDataStore } from '../../stores/data-store';
import './prelansering.less';

export function Prelansering() {
	const { features } = useDataStore();

	return (
		<Page>
			<PrelanseringInfo />
			{features[PRELANSERING_INFO_OM_LOSNING_TOGGLE] && !features[PILOT_TOGGLE] && <LosningInfo />}
		</Page>
	);
}
