import React from 'react';
import cls from 'classnames';
import './hovedside-panel.less';
import { Box } from '@navikt/ds-react';

export function HovedsidePanelBox(props: {
	children: React.ReactNode;
	className?: string;
	panelKlasse?: 'accent' | 'success' | 'neutral';
}) {
	const { panelKlasse } = props;
	return (
		<Box
			background={panelKlasse === 'neutral' ? 'sunken' : 'raised'}
			borderRadius="12"
			borderWidth={panelKlasse === 'neutral' ? '2' : '4'}
			borderColor={panelKlasse}
			className={cls('hovedside-panel', props.className)}
		>
			{props.children}
		</Box>
	);
}
