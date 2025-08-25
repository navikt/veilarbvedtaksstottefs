import React from 'react';
import cls from 'classnames';
import './footer.css';

interface FooterProps {
	className?: string;
	children?: React.ReactNode;
}

function Footer(props: FooterProps) {
	return <footer className={cls('vedtaksstotte-footer', props.className)}>{props.children}</footer>;
}

export default Footer;
