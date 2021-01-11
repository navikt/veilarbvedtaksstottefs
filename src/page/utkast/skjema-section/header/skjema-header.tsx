import React from 'react';
import { Systemtittel } from 'nav-frontend-typografi';
import utkastBilde from './utkast.svg';
import apneDialogBilde from './apne-dialog.svg';
import lukkDialogBilde from './lukk-dialog.svg';
import './skjema-header.less';
import { SkjemaLagringStatus } from '../../../../util/type/skjema-lagring-status';
import { formatDateTime } from '../../../../util/date-utils';
import { Label, LabelType } from '../../../../component/label/label';
import { useDialogSection } from '../../../../store/dialog-section-store';

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
	const { showSection, setShowSection } = useDialogSection();
	const sistEndretTekst = utledLagreTekst(props.skjemaLagringStatus, props.sistOppdatert);

	let bilde;
	let bildeAlt;

	if (showSection) {
		bilde = apneDialogBilde;
		bildeAlt = 'Åpne dialog seksjon';
	} else {
		bilde = lukkDialogBilde;
		bildeAlt = 'Lukk dialog seksjon';
	}

	function onClickToggleDialogSection() {
		setShowSection(prevShow => !prevShow);
	}

	return (
		<header className="skjema-header">
			<img src={utkastBilde} alt="Vedtak ikon" className="skjema-header__ikon" />
			<div className="skjema-header__innhold">
				<Systemtittel tag="h1" className="skjema-header__tittel blokk-xxxs">
					Utkast
				</Systemtittel>
				<div className="skjema-header__info">
					<Label titleText="Ansvarlig" valueText={props.veilederNavn} labelType={LabelType.SMALL} />
					<div className="seperator" />
					<Label
						className="skjema-header__dato"
						valueText={sistEndretTekst}
						titleText="Sist endret"
						labelType={LabelType.SMALL}
					/>
				</div>
			</div>
			<button onClick={onClickToggleDialogSection} className="skjema-header__dialog-toggle-btn">
				<img src={bilde} alt={bildeAlt} />
			</button>
		</header>
	);
}

export default SkjemaHeader;
