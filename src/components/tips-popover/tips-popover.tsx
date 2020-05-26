import React, { useRef, useState } from 'react';
import tipsBilde from './tips.svg';
import Popover, { PopoverOrientering } from 'nav-frontend-popover';
import './tips-popover.less';

interface TipsPopoverProps {
	popoverContent: any;
}

export const TipsPopover = (props: TipsPopoverProps) => {
	const [popoverTrigger, setPopoverTrigger] = useState<HTMLButtonElement>();
	const popoverTriggerRef = useRef<HTMLButtonElement>(null);

	function handleOnRequestOpen() {
		setPopoverTrigger(popoverTriggerRef.current || undefined);
	}

	function handleOnRequestClose() {
		setPopoverTrigger(undefined);
	}

	return (
		<>
			<button className="tips_popover__trigger" ref={popoverTriggerRef} onClick={handleOnRequestOpen} type="button">
				<img src={tipsBilde} className="tips_popover__trigger-img" alt="Info-ikon" />
			</button>
			<Popover ankerEl={popoverTrigger} orientering={PopoverOrientering.Hoyre} onRequestClose={handleOnRequestClose}>
				{props.popoverContent}
			</Popover>
		</>
	);
};
