import React from 'react';
import cls from 'classnames';
import { Undertittel } from 'nav-frontend-typografi';
import './vedtak-liste.less';

interface VedtakListeProps<T> {
	tittel: string;
	vedtak: T[];
	vedtakMapper: (vedtak: T, posisjon: number) => any;
	className?: string;
}

export function VedtakListe<T>(props: VedtakListeProps<T>) {
	const { tittel, vedtak, vedtakMapper, className } = props;
    return (
	    <div className={cls('vedtak-liste', className)}>
		    <Undertittel className="vedtak-liste__tittel" tag="h1">{tittel}</Undertittel>
		    <ul className="vedtak-liste__liste">
			    {vedtak.map((v, idx) => {
			    	return (
					    <li className="vedtak-liste__liste-item" key={idx}>
						    {vedtakMapper(v, idx)}
					    </li>
				    );
			    })}
		    </ul>
	    </div>
    );
}
