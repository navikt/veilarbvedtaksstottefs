import React from 'react';
import cls from 'classnames';
import './page.less';

interface PageProps {
	children: React.ReactNode;
	className?: string;
	contentClassName?: string;
}

const Page = (props: PageProps) => {
	return (
		<div className={cls('page', props.className)}>
			<h3>Test av branch deploy til Q1</h3>
			<div className={cls('page__content', props.contentClassName)}>{props.children}</div>
		</div>
	);
};

export default Page;
