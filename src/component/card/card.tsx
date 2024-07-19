import React from 'react';
import cls from 'classnames';
import './card.css';

interface CardProps {
	children: React.ReactNode;
	className?: string;
}

const Card: React.FunctionComponent<CardProps> = (props: CardProps) => {
	return <section className={cls('card', props.className)}>{props.children}</section>;
};

export default Card;
