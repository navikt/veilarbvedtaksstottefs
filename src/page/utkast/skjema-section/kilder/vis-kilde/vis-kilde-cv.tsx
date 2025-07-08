import { swallowEnterKeyPress } from '../../../../../util';
import { Alert, Checkbox } from '@navikt/ds-react';
import './vis-kilde.css';
import { useDataStore } from '../../../../../store/data-store';

interface VisKildeProps {
	kildenavn: string;
}

export function VisKildeCv({ kildenavn }: Readonly<VisKildeProps>) {
	const { cvSomKilde } = useDataStore();
	//eslint-disable-next-line no-console
	console.log('cvSomKilde', cvSomKilde);

	return (
		<>
			<Checkbox value={kildenavn} onKeyDown={swallowEnterKeyPress} disabled={!cvSomKilde.cvKanBrukesSomKilde}>
				{kildenavn}
			</Checkbox>
			{!cvSomKilde.cvKanBrukesSomKilde && (
				<Alert size="small" variant="info" inline className="vis-kilde__alert">
					Du kan ikke bruke denne kilden, fordi{' '}
					{cvSomKilde.begrunnelse ?? 'det ikke finnes et CV for denne brukeren.'}
				</Alert>
			)}
		</>
	);
}
