import { Loader } from '@navikt/ds-react';
import './spinner.css';

function Spinner() {
	return (
		<div className="vedtaksstotte-spinner">
			<Loader size="2xlarge" />
		</div>
	);
}

export default Spinner;
