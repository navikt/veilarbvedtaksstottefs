import * as React from 'react';
import cls from 'classnames';
import './card.less';

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

const Card: React.FunctionComponent<CardProps> = (props: CardProps) => {
    return (
        <div className={cls('card', props.className)}>
            {props.children}
        </div>
    );
};

export default Card;