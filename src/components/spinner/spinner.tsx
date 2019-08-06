import React from 'react';
import NavFrontendSpinner from 'nav-frontend-spinner';
import './spinner.less';

function Spinner() {
	return (
		<div className="vedtaksstotte-spinner">
			<NavFrontendSpinner type="XL" />
		</div>
	);
}

export default Spinner;
