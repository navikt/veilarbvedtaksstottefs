import React from 'react';
import cls from 'classnames';
import './page.less';

interface PageProps {
	children: React.ReactNode;
	className?: string;
}

const Page = (props: PageProps) => {
	return (
		<div className={cls('page', props.className)}>
			<div className="page__content">
				{props.children}
			</div>
		</div>
	);
};

export default Page;