import React, { useRef, useState } from 'react';
import { logMetrikk } from '../../util/logger';
import { Button, Popover, PopoverProps } from '@navikt/ds-react';
import { InformationIcon } from '@navikt/aksel-icons';
import './tips-popover.less';

interface TipsPopoverProps {
	id?: string;
	tipsInnhold: React.ReactNode;
	ariaLabel?: string;
	placement?: PopoverProps['placement'];
	className?: string;
}

/*
Scroll events blir ikke trigget lokalt fordi height er satt til 100%.
Dette gjør at popover innholdet ikke følger med når man scroller.
I test/prod skal ikke dette være et problem.
*/

export const TipsPopover = ({ id, placement, ariaLabel, tipsInnhold }: TipsPopoverProps) => {
	const [popoverTrigger, setPopoverTrigger] = useState<HTMLButtonElement>();
	const buttonRef = useRef<HTMLButtonElement>(null);

	function logToggleMetrikk(apnet: boolean) {
		logMetrikk('tips-togglet', { id, apnet });
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
		<>
			<Button
				size="xsmall"
				icon={<InformationIcon title={ariaLabel} />}
				className="tips-popover__button"
				onClick={togglePopoverOpen}
				ref={buttonRef}
				type="button"
				aria-controls={id}
				aria-expanded={popoverTrigger !== undefined}
				aria-haspopup="dialog"
			/>
			<Popover
				open={!!popoverTrigger}
				onClose={handleOnRequestClose}
				anchorEl={buttonRef.current}
				placement={placement}
				id={id}
			>
				<Popover.Content className="tips">{tipsInnhold}</Popover.Content>
			</Popover>
		</>
	);
};
