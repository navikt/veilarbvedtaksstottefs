import React from 'react';
import { Systemtittel } from 'nav-frontend-typografi';
import { VedtakData } from '../../../rest/data/vedtak';
import cls from 'classnames';
import gjeldendeVedtakBilde from './gjeldende-vedtak.svg';
import utkastBilde from './utkast.svg';
import tidligereVedtakBilde from './tidligere-vedtak.svg';
import './skjema-header.less';
import { Dato } from '../../panel/dato';
import { Veileder } from '../../panel/veileder';

interface SkjemaHeaderProps {
	vedtak: VedtakData;
	sistOppdatert?: string;
}

function SkjemaHeader(props: SkjemaHeaderProps) {
	const {vedtakStatus, veilederIdent, veilederEnhetId, veilederEnhetNavn, gjeldende} = props.vedtak;
	const erUtkast = vedtakStatus === 'UTKAST';
	const oppdatert = props.sistOppdatert ? props.sistOppdatert : props.vedtak.sistOppdatert;

	let tittel;
	let bilde;
	let className;
	let datoTekst;
	let veilederTekst;

	if (erUtkast) {
		tittel = 'Utkast til oppfølgingsvedtak';
		bilde = utkastBilde;
		className = 'skjema-header--utkast';
		datoTekst = 'Sist endret';
		veilederTekst = 'Endret av';
	} else {
		datoTekst = 'Fattet';
		veilederTekst = 'Fattet av';

		if (gjeldende) {
			tittel = 'Gjeldende oppfølgingsvedtak';
			bilde = gjeldendeVedtakBilde;
			className = 'skjema-header--fullfort';
		} else {
			tittel = 'Tidligere oppfølgingsvedtak';
			bilde = tidligereVedtakBilde;
			className = 'skjema-header--tidligere';
		}
	}

	return (
		<Header
			tittelTekst={tittel}
			datoTekst={datoTekst}
			veilederTekst={veilederTekst}
			headerClassName={className}
			bilde={bilde}
			veilederIdent={veilederIdent}
			veilederEnhetId={veilederEnhetId}
			veilederEnhetNavn={veilederEnhetNavn}
			oppdatert={oppdatert}
		/>
	);
}

interface HeaderProps {
	tittelTekst: string;
	datoTekst: string;
	veilederTekst: string;
	headerClassName: string;
	bilde: string;
	veilederIdent: string;
	veilederEnhetId: string;
	veilederEnhetNavn: string;
	oppdatert: string;
}

function Header(props: HeaderProps) {
	const {
		tittelTekst,
		datoTekst,
		veilederTekst,
		headerClassName,
		bilde,
		veilederIdent,
		veilederEnhetId,
		veilederEnhetNavn,
		oppdatert
	} = props;
	return (
		<header className={cls('skjema-header', headerClassName)}>
			<img src={bilde} alt="Vedtak ikon" className="skjema-header__ikon"/>
			<div className="skjema-header__innhold">
				<Systemtittel className="skjema-header__tittel">{tittelTekst}</Systemtittel>
				<div className="skjema-header__info">
					<Veileder
						className="skjema-header__veileder"
						enhetId={veilederEnhetId}
						enhetNavn={veilederEnhetNavn}
						ident={veilederIdent}
						text={veilederTekst}
					/>
					<div className="seperator"/>
					<Dato
						className="skjema-header__dato"
						sistOppdatert={oppdatert}
						formatType="long"
						text={datoTekst}
					/>
				</div>
			</div>
		</header>
	);
}

export default SkjemaHeader;
