import { Normaltekst } from 'nav-frontend-typografi';
import { lagVedtakDatoTekst } from '../../util/date-utils';
import { ChevronRightIcon } from '@navikt/aksel-icons';
import './vedtak-panel.less';

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

export function VedtaklistePanel<T>(props: VedtakPanelProps<T>) {
	const { name, vedtak, posisjon, dato, ikon, children, onClick } = props;
	const elemId = `vedtak-panel-${name}-${posisjon}`;

	return (
		<button aria-describedby={elemId} className="vedtak-panel" onClick={() => onClick(vedtak, posisjon)}>
			<div className="vedtak-panel__innhold--wrapper">
				<div className="vedtak-panel__innhold">
					<img src={ikon} alt="" className="vedtak-panel__bilde" />
					<div id={elemId}>{children}</div>
				</div>
				<Normaltekst className="vedtak-panel__dato">{lagVedtakDatoTekst(dato)}</Normaltekst>
			</div>
			<ChevronRightIcon className="vedtak-panel__chevron" />
		</button>
	);
}
