import React from 'react';
import './grid.less';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	columns: number;
	gap?: string;
}

function Grid(props: Props) {
	const columns = new Array(props.columns).fill('1fr').join(props.gap ? ` ${props.gap} ` : ' ');

	const rows = new Array(Math.ceil(React.Children.count(props.children) / props.columns))
		.fill('auto')
		.join(props.gap ? ` ${props.gap} ` : ' ');

	const style = {
		gridTemplateColumns: columns,
		gridTemplateRows: rows,
		msGridColumns: columns,
		msGridRows: rows,
		columnGap: '1rem',
		rowGap: '1rem'
	};

	return (
		<div className={`grid ${props.className ? props.className : ''}`} style={style}>
			{props.children}
		</div>
	);
}

export default Grid;
