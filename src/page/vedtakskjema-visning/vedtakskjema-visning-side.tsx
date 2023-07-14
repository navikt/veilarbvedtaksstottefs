import Page from '../../component/page/page';
import Footer from '../../component/footer/footer';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { SkjemaVisning } from '../../component/skjema-visning/skjema-visning';
import { useViewStore, ViewType } from '../../store/view-store';
import { useDataStore } from '../../store/data-store';
import { Vedtak } from '../../api/veilarbvedtaksstotte';
import { Button } from '@navikt/ds-react';
import { ChevronLeftIcon } from '@navikt/aksel-icons';
import './vedtakskjema-visning-side.less';

export function VedtakskjemaVisningSide(props: { vedtakId: number }) {
	const { fattedeVedtak } = useDataStore();
	const { changeView } = useViewStore();
	const vistVedtak = fattedeVedtak.find((v: Vedtak) => v.id === props.vedtakId);

	if (!vistVedtak) {
		return <AlertStripeFeil>Fant ikke vedtak å fremvise</AlertStripeFeil>;
	}

	return (
		<>
			<Page className="vedtakskjema-visning page--white">
				<SkjemaVisning fattetVedtak={vistVedtak} />
			</Page>
			<Footer className="vedtakskjema-visning__aksjoner">
				<Button variant="tertiary" icon={<ChevronLeftIcon />} onClick={() => changeView(ViewType.HOVEDSIDE)}>
					Tilbake
				</Button>
				<Button
					onClick={() =>
						changeView(ViewType.VEDTAK_PDF, {
							vedtakId: vistVedtak.id
						})
					}
				>
					Vis vedtaksbrev
				</Button>
			</Footer>
		</>
	);
}
