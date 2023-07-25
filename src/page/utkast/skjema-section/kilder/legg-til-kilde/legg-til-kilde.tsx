import { Button } from '@navikt/ds-react';
import { PlusIcon } from '@navikt/aksel-icons';

interface LeggTilKildeProps {
	leggTilKilde: () => void;
}

export function LeggTilKilde(props: LeggTilKildeProps) {
	return (
		<Button size="small" variant="tertiary-neutral" icon={<PlusIcon />} onClick={props.leggTilKilde}>
			Legg til andre kilder
		</Button>
	);
}
