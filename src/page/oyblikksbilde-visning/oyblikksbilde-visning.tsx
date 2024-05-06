import { Innholdstittel } from 'nav-frontend-typografi';
import Page from '../../component/page/page';
import Footer from '../../component/footer/footer';
import { useViewStore, ViewType } from '../../store/view-store';
import { Button } from '@navikt/ds-react';
import './oyblikksbilde-visning.less';
import { useDataStore } from '../../store/data-store';
import { Vedtak } from '../../api/veilarbvedtaksstotte';
import { OyeblikksbildeCv } from './oyeblikksbilde-cv';
import { OyeblikksbildeRegistrering } from './oyeblikksbilde-registrering';
import { OyeblikksbildeEgenvurdering } from './oyeblikksbilde-egenvurdering';

export function Oyeblikksbilde(props: { vedtakId: number }) {
	const { changeView } = useViewStore();
	const { fattedeVedtak } = useDataStore();
	const vistVedtak = fattedeVedtak.find((v: Vedtak) => v.id === props.vedtakId);

	const visCvVedleggCard =
		vistVedtak !== undefined &&
		vistVedtak.opplysninger.filter(kilde => kilde.includes('CV-en/jobbønskene dine på nav.no')).length > 0;

	const visRegistreringVedleggCard =
		vistVedtak !== undefined &&
		vistVedtak.opplysninger.filter(kilde => kilde.includes('Svarene dine fra da du registrerte deg')).length > 0;

	const visEgenvurderingVedleggCard =
		vistVedtak !== undefined &&
		vistVedtak.opplysninger.filter(kilde => kilde.includes('Svarene dine om behov for veiledning')).length > 0;

	return (
		<>
			<Page className="oyblikksbilde-visning page--grey">
				<section className="vedlegg">
					<Innholdstittel className="vedlegg__tittel">
						Journalført brukerinformasjon på vedtakstidspunktet
					</Innholdstittel>
					{visCvVedleggCard && <OyeblikksbildeCv vedtakId={props.vedtakId} />}
					{visRegistreringVedleggCard && <OyeblikksbildeRegistrering vedtakId={props.vedtakId} />}
					{visEgenvurderingVedleggCard && <OyeblikksbildeEgenvurdering vedtakId={props.vedtakId} />}
				</section>
			</Page>
			<Footer className="oyblikksbilde-visning__footer">
				<Button size="small" onClick={() => changeView(ViewType.VEDTAK, { vedtakId: props.vedtakId })}>
					Tilbake til vedtak
				</Button>
			</Footer>
		</>
	);
}
