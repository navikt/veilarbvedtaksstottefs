import { Switch } from '@navikt/ds-react';
import { JSX } from 'react';

export function DarkmodeToggle({
	darkmode,
	setDarkmode
}: {
	darkmode: boolean;
	setDarkmode: (value: boolean) => void;
}): JSX.Element {
	{
		return (
			<div className="dark-mode-toggle">
				<Switch size="medium" onChange={() => setDarkmode(!darkmode)} checked={darkmode}>
					Slå {darkmode ? ' av ' : ' på '} darkmode
				</Switch>
			</div>
		);
	}
}
