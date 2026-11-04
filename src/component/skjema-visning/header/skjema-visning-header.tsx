import { FileCheckmarkIcon, FileParagraphIcon } from '@navikt/aksel-icons';
import { Heading } from '@navikt/ds-react';
import cls from 'classnames';
import './skjema-visning-header.css';
import '../../vedtak-ikon.css';

interface SkjemaVisningHeaderProps {
	erGjeldende: boolean;
}

export function SkjemaVisningHeader(props: SkjemaVisningHeaderProps) {
	const tittelTekst = props.erGjeldende ? 'Gjeldende vedtak' : 'Tidligere vedtak';
	const VedtakIkon = props.erGjeldende ? FileCheckmarkIcon : FileParagraphIcon;

	return (
		<div className="skjema-visning-header">
			<VedtakIkon
				aria-hidden
				className={cls(
					'skjema-visning-header__bilde',
					props.erGjeldende ? 'vedtak-ikon--success' : 'vedtak-ikon--neutral'
				)}
			/>
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
