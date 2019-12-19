import React from 'react';
import cls from 'classnames';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import './label.less';

interface LabelProps {
	labelText: string;
	valueText?: string | null;
	className?: string;
	labelClassName?: string;
}

export const Label = ({ labelText, valueText, className, labelClassName }: LabelProps) => {
    return (
	    <div className={cls('label', className)}>
		    <Element className={cls('label__title--gap-normal', labelClassName)} tag="span">{labelText}:</Element>
		    <Normaltekst tag="span">{valueText}</Normaltekst>
	    </div>
    );
};
