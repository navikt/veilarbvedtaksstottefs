import React, { useRef, useState } from 'react';
import tipsBilde from './tips.svg';
import Popover, { PopoverOrientering } from 'nav-frontend-popover';
import './tips-popover.less';

interface TipsPopoverProps {
	tipsInnhold: React.ReactNode;
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
		<div className="tips-popover">
			<button className="tips-popover__trigger" ref={popoverTriggerRef} onClick={handleOnRequestOpen} type="button">
				<img src={tipsBilde} className="tips-popover__trigger-img" alt="Info-ikon" />
			</button>
			<Popover
				autoFokus={false}
				avstandTilAnker={16}
				ankerEl={popoverTrigger}
				orientering={PopoverOrientering.Hoyre}
				onRequestClose={handleOnRequestClose}
			>
				<div className="tips">
					{props.tipsInnhold}
				</div>
			</Popover>
		</div>
	);
};
