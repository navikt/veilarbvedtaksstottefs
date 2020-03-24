import React from 'react';
import { Systemtittel } from 'nav-frontend-typografi';
import { Vedtak } from '../../../rest/data/vedtak';
import utkastBilde from './utkast.svg';
import { Dato } from '../../panel/dato';
import { Veileder } from '../../panel/veileder';
import './skjema-header.less';

interface SkjemaHeaderProps {
	utkast: Vedtak;
}

function SkjemaHeader(props: SkjemaHeaderProps) {
	const {
		veilederIdent, oppfolgingsenhetId,
		oppfolgingsenhetNavn, veilederNavn,
		sistOppdatert
	} = props.utkast;

	return (
		<header className="skjema-header">
			<img src={utkastBilde} alt="Vedtak ikon" className="skjema-header__ikon"/>
			<div className="skjema-header__innhold">
				<Systemtittel tag="h1" className="skjema-header__tittel">Utkast til oppfølgingsvedtak</Systemtittel>
				<div className="skjema-header__info">
					<Veileder
						className="skjema-header__veileder"
						enhetId={oppfolgingsenhetId}
						enhetNavn={oppfolgingsenhetNavn}
						veilederNavn={veilederNavn || veilederIdent}
						text="Ansvarlig"
					/>
					<div className="seperator"/>
					<Dato
						className="skjema-header__dato"
						sistOppdatert={sistOppdatert}
						formatType="long"
						text="Sist endret"
					/>
				</div>
			</div>
		</header>
	);
}

export default SkjemaHeader;
