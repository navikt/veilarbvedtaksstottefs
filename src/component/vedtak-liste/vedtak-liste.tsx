import { BodyShort, Heading } from '@navikt/ds-react';
import './vedtak-liste.css';

interface VedtakListeProps<T> {
	tittel: string;
	ingenVedtakTekst: string;
	vedtak: T[];
	vedtakMapper: (vedtak: T, posisjon: number) => any;
}

export function VedtakListe<T>(props: VedtakListeProps<T>) {
	const { tittel, ingenVedtakTekst, vedtak, vedtakMapper } = props;
	const harVedtak = vedtak.length > 0;
	return (
		<>
			<Heading size="small" level="2" spacing>
				{tittel}
			</Heading>
			{!harVedtak && (
				<BodyShort size="small" className="vedtak-liste__ingen-vedtak">
					{ingenVedtakTekst}
				</BodyShort>
			)}
			{harVedtak && (
				<ul className="vedtak-liste__liste">
					{vedtak.map((v, idx) => {
						return <li key={'vedtak-' + idx}>{vedtakMapper(v, idx)}</li>;
					})}
				</ul>
			)}
		</>
	);
}
