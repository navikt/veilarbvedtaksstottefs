import React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import classNames from 'classnames';
import './panel.less';
export function Panel(props: { tittel: string; children: React.ReactNode; className?: string }) {
	const className = classNames('panel', props.className);

	return (
		<div className={className}>
			<div className="panel__tittel">
				<Undertittel>{props.tittel}</Undertittel>
			</div>
			{props.children}
		</div>
	);
}
