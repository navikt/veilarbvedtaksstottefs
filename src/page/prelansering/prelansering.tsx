import React from 'react';
import Page from '../../component/page/page';
import PrelanseringInfo from './prelansering-info';
import { LosningInfo } from './losning-info/losning-info';
import { PRELANSERING_INFO_OM_LOSNING_TOGGLE } from '../../api/data/features';
import { useDataStore } from '../../store/data-store';
import './prelansering.less';

export function Prelansering() {
	const { features } = useDataStore();

	return (
		<Page>
			<PrelanseringInfo />
			{features[PRELANSERING_INFO_OM_LOSNING_TOGGLE] && <LosningInfo />}
		</Page>
	);
}
