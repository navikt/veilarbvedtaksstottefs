import React from 'react';
import cls from 'classnames';
import './melding-bar.less';

interface MeldingBarProps {
	className?: string
}

export const MeldingBar = (props: MeldingBarProps) => {
    return <div className={cls('melding-bar', props.className)} />;
};
