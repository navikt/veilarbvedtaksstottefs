import React from 'react';
import cls from 'classnames';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import './vedtak-liste.less';
import Show from '../show';

interface VedtakListeProps<T> {
	tittel: string;
	ingenVedtakTekst: string;
	vedtak: T[];
	vedtakMapper: (vedtak: T, posisjon: number) => any;
	className?: string;
}

export function VedtakListe<T>(props: VedtakListeProps<T>) {
	const { tittel, ingenVedtakTekst, vedtak, vedtakMapper, className } = props;
	const harVedtak = vedtak.length > 0;
    return (
	    <div className={cls('vedtak-liste', className)}>
		    <Undertittel className="vedtak-liste__tittel" tag="h1">{tittel}</Undertittel>
		    <Show if={!harVedtak}>
			    <Normaltekst>{ingenVedtakTekst}</Normaltekst>
		    </Show>
		    <Show if={harVedtak}>
			    <ul className="vedtak-liste__liste">
				    {vedtak.map((v, idx) => {
					    return (
						    <li className="vedtak-liste__liste-item" key={idx}>
							    {vedtakMapper(v, idx)}
						    </li>
					    );
				    })}
			    </ul>
		    </Show>
	    </div>
    );
}
