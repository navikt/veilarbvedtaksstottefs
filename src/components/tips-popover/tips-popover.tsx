import React, { useState } from 'react';
import cls from 'classnames';
import tipsBilde from './tips.svg';
import Popover, { PopoverOrientering } from 'nav-frontend-popover';
import './tips-popover.less';
import { logMetrikk } from '../../utils/logger';

interface TipsPopoverProps {
	id?: string;
	tipsInnhold: React.ReactNode;
	ariaLabel?: string;
	orientering?: PopoverOrientering;
	className?: string;
}

/*
Scroll events blir ikke trigget lokalt fordi height er satt til 100%.
Dette gjør at popover innholdet ikke følger med når man scroller.
I test/prod skal ikke dette være et problem.
*/

export const TipsPopover = (props: TipsPopoverProps) => {
	const [popoverTrigger, setPopoverTrigger] = useState<HTMLButtonElement>();

	function logToggleMetrikk(apnet: boolean) {
		logMetrikk('tips-togglet', { id: props.id, apnet });
	}

	function togglePopoverOpen(e: React.MouseEvent<HTMLButtonElement>) {
		const target = popoverTrigger ? undefined : e.currentTarget;
		setPopoverTrigger(target);
		logToggleMetrikk(target !== undefined);
	}

	function handleOnRequestClose() {
		setPopoverTrigger(undefined);
		logToggleMetrikk(false);
	}

	return (
		<div className={cls('tips-popover', props.className)}>
			<button
				className="tips-popover__trigger"
				onClick={togglePopoverOpen}
				type="button"
				aria-expanded={popoverTrigger !== undefined}
				aria-controls={props.id}
				aria-label={props.ariaLabel}
				aria-haspopup="dialog"
			>
				<img src={tipsBilde} className="tips-popover__trigger-img" alt="Info-ikon" />
			</button>
			<Popover
				id={props.id}
				autoFokus={false}
				avstandTilAnker={16}
				ankerEl={popoverTrigger}
				orientering={props.orientering || PopoverOrientering.UnderVenstre}
				onRequestClose={handleOnRequestClose}
			>
				<div className="tips">{props.tipsInnhold}</div>
			</Popover>
		</div>
	);
};
