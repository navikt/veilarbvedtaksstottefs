import tidligereVedtakBilde from '../../../component/skjema-visning/header/tidligere-vedtak.svg'
import { Detail, Heading } from '@navikt/ds-react';

interface KlageHeaderProps {
	veilederNavn: string;
	sistOppdatert: string;
	KlageStatus: string;
	vedtakId: number;
}
export function KlageHeader(props: KlageHeaderProps) {
	return (
		<header className="skjema-header">
			<img src={tidligereVedtakBilde} alt="paragraf ikon" className="skjema-header__ikon" />
			<div className="skjema-header__innhold">
				<Heading size="medium" level="1">
					Behandling av klage
				</Heading>

				<div className="skjema-header__info">
					<Detail>Åpne klagen fra Gosys, i eget vindu for å se innsendt dato og klagers begrunnelse</Detail>
					<div className="separator" />
					<Detail>
						<b>Ansvarlig:</b> {props.veilederNavn}
					</Detail>
					<div className="separator" />
					<Detail>
						<b>Intern vedtaks-ID:</b> {props.vedtakId}
					</Detail>
				</div>
			</div>
		</header>
	);
}
