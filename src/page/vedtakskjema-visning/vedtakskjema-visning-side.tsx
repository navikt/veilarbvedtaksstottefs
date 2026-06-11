import Page from '../../component/page/page';
import Footer from '../../component/footer/footer';
import { SkjemaVisning } from '../../component/skjema-visning/skjema-visning';
import { useDataStore } from '../../store/data-store';
import { Vedtak } from '../../api/veilarbvedtaksstotte';
import { Alert, Button } from '@navikt/ds-react';
import { ChevronLeftIcon } from '@navikt/aksel-icons';
import './vedtakskjema-visning-side.css';
import { VIS_KLAGE_TOGGLE } from '../../api/obo-unleash.ts';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../routes.ts';

export function VedtakskjemaVisningSide(props: { vedtakId: number }) {
	const { fattedeVedtak, features } = useDataStore();
	const navigate = useNavigate();
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
					onClick={() => navigate(routes.hovedside)}
				>
					Tilbake
				</Button>
				<Button size="small" onClick={() => navigate(routes.vedtakPdf(vistVedtak.id))}>
					Vis vedtaksbrev
				</Button>
				{visKlage && (
					<Button
						size="small"
						variant="tertiary"
						onClick={() => navigate(routes.klagebehandling(vistVedtak.id))}
					>
						Til klagebehandling
					</Button>
				)}
			</Footer>
		</>
	);
}
