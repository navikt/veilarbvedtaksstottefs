import { renderToStaticMarkup } from 'react-dom/server';
import { expect, test, vi } from 'vitest';
import { SKRU_AV_EGENVURDERINGSKILDE_TOGGLE } from '../../../../../api/obo-unleash';
import { VisKilde } from './vis-kilde';

const { features } = vi.hoisted(() => ({
	features: { 'veilarbvedtaksstottefs.skru_av_egenvurderingskilde': false }
}));

vi.mock('../../../../../store/data-store', () => ({
	useDataStore: () => ({ features })
}));

test.each([true, false])('disables egenvurdering and shows an alert only when the flag is %s', flag => {
	features[SKRU_AV_EGENVURDERINGSKILDE_TOGGLE] = flag;

	const markup = renderToStaticMarkup(
		<VisKilde kildenavn="Svarene dine om behov for veiledning" handleKilde={vi.fn()} />
	);

	expect(markup).toContain('value="Svarene dine om behov for veiledning"');
	expect(markup.includes('disabled=""')).toBe(flag);
	expect(
		markup.includes('Du kan ikke bruke denne kilden akkurat nå. Teknisk vedlikehold pågår, se driftsmelding.')
	).toBe(flag);
	if (flag) {
		expect(markup.indexOf('vis-kilde__alert')).toBeGreaterThan(markup.indexOf('</label>'));
	}
});

test.each(['CV-en/jobbønskene din(e) på nav.no', 'Annen kilde'])(
	'keeps %s enabled when egenvurdering is disabled',
	kildenavn => {
		features[SKRU_AV_EGENVURDERINGSKILDE_TOGGLE] = true;

		const markup = renderToStaticMarkup(<VisKilde kildenavn={kildenavn} handleKilde={vi.fn()} />);

		expect(markup).not.toContain('disabled=""');
		expect(markup).not.toContain('vis-kilde__alert');
	}
);
