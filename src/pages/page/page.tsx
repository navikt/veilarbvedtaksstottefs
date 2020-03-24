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
			<div className={cls('page__content', props.contentClassName)}>
				{props.children}
			</div>
		</div>
	);
};

export default Page;
