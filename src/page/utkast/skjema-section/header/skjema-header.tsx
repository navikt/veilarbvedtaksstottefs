import { Systemtittel } from 'nav-frontend-typografi';
import utkastBilde from './utkast.svg';
import { SkjemaLagringStatus } from '../../../../util/type/skjema-lagring-status';
import { formatDateTime } from '../../../../util/date-utils';
import { Label, LabelType } from '../../../../component/label/label';
import './skjema-header.less';

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
				<Systemtittel tag="h1" className="skjema-header__tittel">
					Utkast
				</Systemtittel>
				<div className="skjema-header__info">
					<Label titleText="Ansvarlig" valueText={props.veilederNavn} labelType={LabelType.SMALL} />
					<div className="separator" />
					<Label
						className="skjema-header__dato"
						valueText={sistEndretTekst}
						titleText="Sist endret"
						labelType={LabelType.SMALL}
					/>
				</div>
			</div>
		</header>
	);
}

export default SkjemaHeader;
