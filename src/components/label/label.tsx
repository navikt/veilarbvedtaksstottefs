import React from 'react';
import cls from 'classnames';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { OrNothing } from '../../utils/types/ornothing';
import './label.less';

export enum LabelType {
	SMALL = 'SMALL',
	MEDIUM = 'MEDIUM'
}

interface LabelProps {
	titleText: string;
	valueText: OrNothing<string>;
	className?: string;
	titleTextClassName?: string;
	labelType?: LabelType;
}

export const Label = ({ titleText, valueText, className, titleTextClassName, labelType = LabelType.MEDIUM }: LabelProps) => {
	const labelTypeClass = labelType === LabelType.SMALL ? 'label--small' : undefined;
    return (
	    <div className={cls('label', className)}>
		    <Element className={cls('label__title-text', labelTypeClass, titleTextClassName)} tag="span">{titleText}:</Element>
		    <Normaltekst tag="span" className={labelTypeClass}>{valueText}</Normaltekst>
	    </div>
    );
};
