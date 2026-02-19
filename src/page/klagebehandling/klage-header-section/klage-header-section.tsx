import utkastBilde from '../../utkast/skjema-section/header/utkast.svg';
import { Detail, Heading } from '@navikt/ds-react';

interface KlageHeaderProps {
	veilederNavn: string;
	sistOppdatert: string;
	KlageStatus: string;
	vedtakId: number;
}
function KlageHeader(props: KlageHeaderProps) {
	return (
		<header className="skjema-header">
			<img src={utkastBilde} alt="Vedtak ikon" className="skjema-header__ikon" />
			<div className="skjema-header__innhold">
				<Heading size="medium" level="1">
					Behandling av klage
				</Heading>
				<div className="skjema-header__info">
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

export default KlageHeader;
