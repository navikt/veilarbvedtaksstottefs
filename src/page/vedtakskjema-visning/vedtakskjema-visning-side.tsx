import Page from '../../component/page/page';
import Footer from '../../component/footer/footer';
import { SkjemaVisning } from '../../component/skjema-visning/skjema-visning';
import { useViewStore, ViewType } from '../../store/view-store';
import { useDataStore } from '../../store/data-store';
import { Vedtak } from '../../api/veilarbvedtaksstotte';
import { Alert, Button } from '@navikt/ds-react';
import { ChevronLeftIcon } from '@navikt/aksel-icons';
import './vedtakskjema-visning-side.css';
import { VIS_KLAGE_TOGGLE } from '../../api/obo-unleash.ts';

export function VedtakskjemaVisningSide(props: { vedtakId: number }) {
	const { fattedeVedtak, features } = useDataStore();
	const { changeView } = useViewStore();
	const vistVedtak = fattedeVedtak.find((v: Vedtak) => v.id === props.vedtakId);
	const visKlage = features[VIS_KLAGE_TOGGLE];

	if (!vistVedtak) {
		return <Alert variant="error">Fant ikke vedtak å fremvise</Alert>;
	}

	return (
		<>
			<Page className="vedtakskjema-visning page--white">
				<SkjemaVisning fattetVedtak={vistVedtak} />
			</Page>
			<Footer className="vedtakskjema-visning__aksjoner">
				<Button
					size="small"
					variant="tertiary"
					icon={<ChevronLeftIcon />}
					onClick={() => changeView(ViewType.HOVEDSIDE)}
				>
					Tilbake
				</Button>
				<Button
					size="small"
					onClick={() =>
						changeView(ViewType.VEDTAK_PDF, {
							vedtakId: vistVedtak.id
						})
					}
				>
					Vis vedtaksbrev
				</Button>
				{ visKlage &&
				<Button
					size="small"
					variant="tertiary"
					onClick={() =>
						changeView(ViewType.KLAGEBEHANDLING, {
							vedtakId: vistVedtak.id
						})
					}
				>
					Til klagebehandling
				</Button> }
			</Footer>
		</>
	);
}
