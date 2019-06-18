import React from 'react';
import { Systemtittel, Undertittel } from 'nav-frontend-typografi';
import { VedtakData } from '../../../utils/types/vedtak';
import cls from 'classnames';
import fullfortBilde from './fullfort.svg';
import utkastBilde from './utkast.svg';
import './skjema-header.less';
import { Dato } from '../../panel/dato';
import { Veileder } from '../../panel/veileder';

interface SkjemaHeaderProps {
    vedtak: VedtakData;
    sistOppdatert?: string;
}

function SkjemaHeader(props: SkjemaHeaderProps) {
    const {vedtakStatus, veilederIdent, veilederEnhetId, veilederEnhetNavn} = props.vedtak;
    const erUtkast = vedtakStatus === 'UTKAST';
    const oppdatert = props.sistOppdatert ? props.sistOppdatert : props.vedtak.sistOppdatert;

    if (erUtkast) {
        return (
            <Header
                tittelTekst="Utkast til oppfølgingsvedtak"
                datoTekst="Sist endret"
                veilederTekst="Endret av"
                headerClassName="skjema-header--utkast"
                bilde={utkastBilde}
                veilederIdent={veilederIdent}
                veilederEnhetId={veilederEnhetId}
                veilederEnhetNavn={veilederEnhetNavn}
                oppdatert={oppdatert}
            />
        );
    } else {
        return (
            <Header
                tittelTekst="Gjeldende oppfølgingsvedtak"
                datoTekst="Fattet"
                veilederTekst="Fattet av"
                headerClassName="skjema-header--fullfort"
                bilde={fullfortBilde}
                veilederIdent={veilederIdent}
                veilederEnhetId={veilederEnhetId}
                veilederEnhetNavn={veilederEnhetNavn}
                oppdatert={oppdatert}
            />
        );
    }
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
        tittelTekst, datoTekst, veilederTekst,
        headerClassName, bilde, veilederIdent,
        veilederEnhetId, veilederEnhetNavn, oppdatert
    } = props;
    return (
        <header className={cls("skjema-header", headerClassName)}>
            <img src={bilde} alt="Vedtak ikon" className="skjema-header__ikon"/>
            <div className="skjema-header__innhold">
                <Systemtittel>
                    {tittelTekst}
                </Systemtittel>
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
