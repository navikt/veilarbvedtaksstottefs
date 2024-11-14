import Page from '../../component/page/page';
import Footer from '../../component/footer/footer';
import { useViewStore, ViewType } from '../../store/view-store';
import { useDataStore } from '../../store/data-store';
import { Vedtak } from '../../api/veilarbvedtaksstotte';
import { OyeblikksbildeCv } from './oyeblikksbilde-cv';
import { OyeblikksbildeRegistrering } from './oyeblikksbilde-registrering';
import { OyeblikksbildeEgenvurdering } from './oyeblikksbilde-egenvurdering';
import { Button, Heading, VStack } from '@navikt/ds-react';
import './oyeblikksbilde-visning.css';

export function Oyeblikksbilde(props: { vedtakId: number }) {
	const { changeView } = useViewStore();
	const { fattedeVedtak } = useDataStore();
	const vistVedtak = fattedeVedtak.find((v: Vedtak) => v.id === props.vedtakId);

	const visCvVedleggCard = vistVedtak !== undefined && vistVedtak.opplysninger.find(x => x.indexOf('CV') >= 0);

	const visRegistreringVedleggCard =
		vistVedtak !== undefined && vistVedtak.opplysninger.find(x => x.indexOf('registrer') >= 0);

	const visEgenvurderingVedleggCard =
		vistVedtak !== undefined && vistVedtak.opplysninger.find(x => x.indexOf('behov') >= 0);

	return (
		<>
			<Page className="oyblikksbilde-visning">
				<VStack gap="6" align="center">
					<Heading size="large" level="1">
						Journalført brukerinformasjon på vedtakstidspunktet
					</Heading>
					{visCvVedleggCard && <OyeblikksbildeCv vedtakId={props.vedtakId} />}
					{visRegistreringVedleggCard && <OyeblikksbildeRegistrering vedtakId={props.vedtakId} />}
					{visEgenvurderingVedleggCard && <OyeblikksbildeEgenvurdering vedtakId={props.vedtakId} />}
				</VStack>
			</Page>
			<Footer className="oyblikksbilde-visning__footer">
				<Button size="small" onClick={() => changeView(ViewType.VEDTAK, { vedtakId: props.vedtakId })}>
					Tilbake til vedtak
				</Button>
			</Footer>
		</>
	);
}
