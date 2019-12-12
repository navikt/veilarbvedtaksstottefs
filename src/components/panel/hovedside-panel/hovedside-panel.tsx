import React from 'react';
import cls from 'classnames';
import './hovedside-panel.less';

export function HovedsidePanel(props: { children: React.ReactNode; className?: string }) {
	return (
		<section className={cls('hovedside-panel', props.className)}>
			{props.children}
		</section>
	);
}
