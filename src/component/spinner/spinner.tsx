import { Loader } from '@navikt/ds-react';
import './spinner.less';

function Spinner() {
	return (
		<div className="vedtaksstotte-spinner">
			<Loader size="2xlarge" />
		</div>
	);
}

export default Spinner;
