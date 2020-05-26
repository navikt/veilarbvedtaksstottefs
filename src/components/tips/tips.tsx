import React from 'react';
import './tips.less'

interface TipsProps {
	children: React.ReactNode;
}

export const Tips = (props: TipsProps) => {
	return (
		<div className="tips">
			{props.children}
		</div>
	);
};
