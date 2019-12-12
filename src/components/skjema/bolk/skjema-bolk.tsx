import React from 'react';
import cls from 'classnames';
import { Undertittel } from 'nav-frontend-typografi';
import './skjem-bolk.less';

interface SkjemaBolkProps {
	id?: string;
	tittel: string;
	tittelId: string;
	children?: React.ReactNode;
	className?: string;
}

function SkjemaBolk(props: SkjemaBolkProps) {
	return (
		<section id={props.id} className={cls('skjemabolk', props.className)}>
			<div className="skjemabolk__header">
				<Undertittel id={props.tittelId}>{props.tittel}</Undertittel>
			</div>
			<div className="skjemabolk__innhold">{props.children}</div>
		</section>
	);
}

export default SkjemaBolk;
