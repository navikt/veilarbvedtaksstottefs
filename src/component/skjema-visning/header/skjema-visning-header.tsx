import gjeldendeVedtakBilde from './gjeldende-vedtak.svg';
import tidligereVedtakBilde from './tidligere-vedtak.svg';
import { Heading } from '@navikt/ds-react';
import './skjema-visning-header.css';

interface SkjemaVisningHeaderProps {
	erGjeldende: boolean;
}

export function SkjemaVisningHeader(props: SkjemaVisningHeaderProps) {
	const tittelTekst = props.erGjeldende ? 'Gjeldende vedtak' : 'Tidligere vedtak';
	const vedtakBilde = props.erGjeldende ? gjeldendeVedtakBilde : tidligereVedtakBilde;

	return (
		<div className="skjema-visning-header">
			<img src={vedtakBilde} alt="" className="skjema-visning-header__bilde" />
			<div className="skjema-visning-header__vedtak">
				<span className="skjema-visning-header__separator" />
				<Heading size="medium" level="1" className="skjema-visning-header__tittel">
					{tittelTekst}
				</Heading>
				<span className="skjema-visning-header__separator" />
			</div>
		</div>
	);
}
