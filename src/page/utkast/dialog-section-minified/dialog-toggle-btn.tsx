import React from 'react';
import cls from 'classnames';
import { useDialogSection } from '../../../store/dialog-section-store';
import lukkDialogBilde from './lukk-dialog.svg';
import apneDialogBilde from './apne-dialog.svg';

interface DialogToggleBtnProps {
	className?: string;
}

export function DialogToggleBtn(props: DialogToggleBtnProps) {
	const { showSection, setShowSection } = useDialogSection();

	let bilde;
	let bildeAlt;

	if (showSection) {
		bilde = lukkDialogBilde;
		bildeAlt = 'Lukk dialog seksjon';
	} else {
		bilde = apneDialogBilde;
		bildeAlt = 'Åpne dialog seksjon';
	}

	function onClickToggleDialogSection() {
		setShowSection(prevShow => !prevShow);
	}

	return (
		<button onClick={onClickToggleDialogSection} className={cls('dialog-section__toggle_btn', props.className)}>
			<img src={bilde} alt={bildeAlt} />
		</button>
	);
}
