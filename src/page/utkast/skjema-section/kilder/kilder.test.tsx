import { renderToStaticMarkup } from 'react-dom/server';
import { expect, test, vi } from 'vitest';
import Kilder from './kilder';
import { kildelisteBokmal } from '../../../../util/skjema-utils';

const { skjema } = vi.hoisted(() => ({
	skjema: { valgteKilder: [] as string[], setValgteKilder: vi.fn(), errors: {} as { kilder?: string } }
}));

vi.mock('../../../../store/skjema-store', () => ({
	useSkjemaStore: () => skjema
}));

vi.mock('../../../../store/data-store', () => ({
	useDataStore: () => ({ arbeidssokerperiode: {} })
}));

test('shows the source error in both groups', () => {
	skjema.valgteKilder = [];
	skjema.errors = { kilder: 'Missing sources' };

	const markup = renderToStaticMarkup(<Kilder />);
	const grupper = markup.match(/<fieldset\b[^>]*>[\s\S]*?<\/fieldset>/g) ?? [];

	expect(markup.match(/Missing sources/g)).toHaveLength(2);
	expect(grupper).toHaveLength(2);
	for (const gruppe of grupper) {
		expect(gruppe).toContain('Missing sources');
	}
});

test('hides the source error as soon as a source is selected', () => {
	skjema.valgteKilder = [kildelisteBokmal[1]];
	skjema.errors = { kilder: 'Missing sources' };

	const markup = renderToStaticMarkup(<Kilder />);

	expect(markup).not.toContain('Missing sources');
});
