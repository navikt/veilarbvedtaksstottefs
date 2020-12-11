import { rest } from 'msw';
import { RequestHandlersList } from 'msw/lib/types/setupWorker/glossary';
import {
	FeatureToggles,
	PILOT_TOGGLE,
	PRELANSERING_INFO_OM_LOSNING_TOGGLE,
	PRELANSERING_TOGGLE,
	SKRU_AV_POLLING_DIALOG,
	SKRU_AV_POLLING_UTKAST,
	STOPPE_VEDTAKSUTSENDING_TOGGLE
} from '../../api/veilarbpersonflatefs';

const features: FeatureToggles = {
	[PRELANSERING_TOGGLE]: false,
	[PRELANSERING_INFO_OM_LOSNING_TOGGLE]: true,
	[STOPPE_VEDTAKSUTSENDING_TOGGLE]: false,
	[PILOT_TOGGLE]: false,
	[SKRU_AV_POLLING_UTKAST]: false,
	[SKRU_AV_POLLING_DIALOG]: false
};

export const veilarbpersonflatefsHandlers: RequestHandlersList = [
	rest.get('/veilarbpersonflatefs/api/feature', (req, res, ctx) => {
		return res(ctx.delay(500), ctx.json(features));
	})
];
