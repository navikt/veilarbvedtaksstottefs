import React from 'react';
import cls from 'classnames';
import { Element, EtikettLiten } from 'nav-frontend-typografi';
import './dialog-melding.less';
import { formatDayMonthTime } from '../../../../../util/date-utils';
import { purfiyUnsafeHtml, replaceNewLineWithBr, replaceTextUrlsWithTags } from '../../../../../util/html-utils';
import Show from '../../../../../component/show';

interface DialogMeldingProps {
	tekst: string;
	dato: string;
	skrevetAvNavn: string;
	skrevetAvMeg: boolean;
}

const DialogMeldingBar = (props: { className: string }) => {
	return <div className={cls('dialog-melding-bar', props.className)} />;
};

function formatAndCleanMessage(message: string): string {
	let formattedMessage = message;

	formattedMessage = replaceTextUrlsWithTags(formattedMessage);
	formattedMessage = replaceNewLineWithBr(formattedMessage);

	return purfiyUnsafeHtml(formattedMessage);
}

export const DialogMelding = (props: DialogMeldingProps) => {
	const { tekst, dato, skrevetAvNavn, skrevetAvMeg } = props;

	const meldingClasses = {
		'dialog-melding--fra-meg': skrevetAvMeg,
		'dialog-melding--til-meg': !skrevetAvMeg
	};

	const meldingBarClasses = {
		'dialog-melding-bar--fra-meg': skrevetAvMeg,
		'dialog-melding-bar--til-meg': !skrevetAvMeg
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
				<div
					className="typo-normal dialog-melding__tekst"
					dangerouslySetInnerHTML={{ __html: formatAndCleanMessage(tekst) }}
				/>
			</div>
		</div>
	);
};
