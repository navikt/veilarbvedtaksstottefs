import React from 'react';
import Page from '../page/page';
import PrelanseringInfo from './prelansering-info';
import { LosningInfo } from './losning-info/losning-info';
import { PRELANSERING_INFO_OM_LOSNING_TOGGLE } from '../../rest/data/features';
import { useFetchStore } from '../../stores/fetch-store';
import './prelansering.less';

export function Prelansering() {
	const { features } = useFetchStore();

	return (
		<Page>
			<PrelanseringInfo />
			{features.data[PRELANSERING_INFO_OM_LOSNING_TOGGLE] && <LosningInfo />}
		</Page>
	);
}
