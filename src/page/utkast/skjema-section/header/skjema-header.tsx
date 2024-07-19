import utkastBilde from './utkast.svg';
import { SkjemaLagringStatus } from '../../../../util/type/skjema-lagring-status';
import { formatDateTime } from '../../../../util/date-utils';
import { Detail, Heading } from '@navikt/ds-react';
import './skjema-header.css';

interface SkjemaHeaderProps {
	veilederNavn: string;
	sistOppdatert: string;
	skjemaLagringStatus: SkjemaLagringStatus;
}

function utledLagreTekst(status: SkjemaLagringStatus, sistOppdatert: string): string {
	switch (status) {
		case SkjemaLagringStatus.LAGRER:
		case SkjemaLagringStatus.ENDRING_IKKE_LAGRET:
			return 'Lagrer...';
		case SkjemaLagringStatus.ALLE_ENDRINGER_LAGRET:
		case SkjemaLagringStatus.INGEN_ENDRING:
			return formatDateTime(sistOppdatert);
		case SkjemaLagringStatus.LAGRING_FEILET:
			return 'Lagring feilet';
	}

	return '';
}

function SkjemaHeader(props: SkjemaHeaderProps) {
	const sistEndretTekst = utledLagreTekst(props.skjemaLagringStatus, props.sistOppdatert);

	return (
		<header className="skjema-header">
			<img src={utkastBilde} alt="Vedtak ikon" className="skjema-header__ikon" />
			<div className="skjema-header__innhold">
				<Heading size="medium" level="1">
					Utkast
				</Heading>
				<div className="skjema-header__info">
					<Detail>
						<b>Ansvarlig:</b> {props.veilederNavn}
					</Detail>
					<div className="separator" />
					<Detail>
						<b>Sist endret:</b> {sistEndretTekst}
					</Detail>
				</div>
			</div>
		</header>
	);
}

export default SkjemaHeader;
