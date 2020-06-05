import React from 'react';
import cls from 'classnames';
import { Element, EtikettLiten, Normaltekst } from 'nav-frontend-typografi';
import { formatDayMonthTime } from '../../../../utils/date-utils';
import './dialog-melding.less';
import Show from '../../../show';

interface DialogMeldingProps {
	tekst: string;
	dato: string;
	skrevetAvNavn: string;
	skrevetAvMeg: boolean;
}

const DialogMeldingBar = (props: { className: string }) => {
	return <div className={cls('dialog-melding-bar', props.className)} />;
};

export const DialogMelding = (props: DialogMeldingProps) => {
	const { tekst, dato, skrevetAvNavn, skrevetAvMeg } = props;

	const meldingClasses = {
		'dialog-melding--fra-meg': skrevetAvMeg,
		'dialog-melding--til-meg': !skrevetAvMeg
	};

	const meldingBarClasses = {
		'dialog-melding-bar--fra-meg': skrevetAvMeg,
		'dialog-melding-bar--til-meg': !skrevetAvMeg,
	};

	return (
		<div className={cls('dialog-melding', meldingClasses)}>
			<div className="dialog-melding__metadata">
				<Show if={!skrevetAvMeg}>
					<Element className="dialog-melding__metadata-navn">{skrevetAvNavn}</Element>
				</Show>
				<EtikettLiten className="dialog-melding__metadata-dato">{`${formatDayMonthTime(dato)}`}</EtikettLiten>
			</div>
			<div className="dialog-melding__tekst-wrapper">
				<DialogMeldingBar className={cls(meldingBarClasses)} />
				<Normaltekst className="dialog-melding__tekst">{tekst}</Normaltekst>
			</div>
		</div>
	);
};
