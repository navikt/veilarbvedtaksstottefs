import { lagVedtakDatoTekst } from '../../util/date-utils';
import { ChevronRightIcon } from '@navikt/aksel-icons';
import { Detail } from '@navikt/ds-react';
import './vedtakliste-panel.css';

export type OnVedtakClicked<T> = (vedtak: T, idx: number) => void;

interface VedtakPanelProps<T> {
	name: string;
	vedtak: T;
	posisjon: number;
	onClick: OnVedtakClicked<T>;
	dato: string;
	ikon: string;
	children: any;
}

export function VedtaklistePanel<T>(props: Readonly<VedtakPanelProps<T>>) {
	const { name, vedtak, posisjon, dato, ikon, children, onClick } = props;
	const elemId = `vedtak-panel-${name}-${posisjon}`;

	return (
		<button aria-describedby={elemId} className="vedtak-panel" onClick={() => onClick(vedtak, posisjon)}>
			<img src={ikon} alt="" className="vedtak-panel__bilde" />
			<div id={elemId}>{children}</div>
			<Detail textColor="subtle" className="vedtak-panel__dato">
				{lagVedtakDatoTekst(dato)}
			</Detail>
			<ChevronRightIcon className="vedtak-panel__chevron" />
		</button>
	);
}
