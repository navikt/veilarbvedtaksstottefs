import React from 'react';
import cls from 'classnames';
import './hovedside-panel.less';
import { Box } from '@navikt/ds-react';

export function HovedsidePanelBox(props: {
	children: React.ReactNode;
	className?: string;
	background?: 'raised' | 'sunken';
}) {
	const { background = 'raised' } = props;
	return (
		<Box background={background} borderRadius="12" className={cls('hovedside-panel', props.className)}>
			{props.children}
		</Box>
	);
}
