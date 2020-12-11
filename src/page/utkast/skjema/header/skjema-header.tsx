import React from 'react';
import { Systemtittel } from 'nav-frontend-typografi';
import utkastBilde from './utkast.svg';
import { DatoLabel } from '../../../../component/panel/dato-label';
import { Label, LabelType } from '../../../../component/label/label';
import './skjema-header.less';
import { Vedtak } from '../../../../api/veilarbvedtaksstotte';

interface SkjemaHeaderProps {
	utkast: Vedtak;
	sistOppdatert?: string;
}

function SkjemaHeader(props: SkjemaHeaderProps) {
	const { veilederNavn, oppfolgingsenhetId, oppfolgingsenhetNavn } = props.utkast;

	return (
		<header className="skjema-header">
			<img src={utkastBilde} alt="Vedtak ikon" className="skjema-header__ikon" />
			<div className="skjema-header__innhold">
				<Systemtittel tag="h1" className="skjema-header__tittel blokk-xxxs">
					Utkast til oppfølgingsvedtak
				</Systemtittel>
				<div className="skjema-header__info">
					<Label titleText="Ansvarlig" valueText={veilederNavn} labelType={LabelType.SMALL} />
					<div className="seperator" />
					<Label
						titleText="Brukers enhet"
						valueText={oppfolgingsenhetId + ' ' + oppfolgingsenhetNavn}
						labelType={LabelType.SMALL}
					/>
					<div className="seperator" />
					<DatoLabel
						className="skjema-header__dato"
						sistOppdatert={props.sistOppdatert || props.utkast.sistOppdatert}
						formatType="long"
						text="Sist endret"
					/>
				</div>
			</div>
		</header>
	);
}

export default SkjemaHeader;
