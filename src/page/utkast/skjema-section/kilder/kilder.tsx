import { useState } from 'react';
import { VisKilde } from './vis-kilde/vis-kilde';
import { RedigerKilde } from './rediger-kilde/rediger-kilde';
import { LeggTilKilde } from './legg-til-kilde/legg-til-kilde';
import { KilderTipsInnhold } from './kilder-tips-innhold';
import FeltHeader from '../felt-header/felt-header';
import { useSkjemaStore } from '../../../../store/skjema-store';
import { mergeMedDefaultKilder } from '../../../../util/skjema-utils';
import { CheckboxGroup } from '@navikt/ds-react';
import './kilder.css';

function Kilder() {
	const { valgteKilder, setValgteKilder, errors } = useSkjemaStore();
	const [kilder, setKilder] = useState<string[]>(mergeMedDefaultKilder(valgteKilder));
	const [redigeringModusIndeks, setRedigeringModusIndeks] = useState<number>(-1);
	const [visLeggTilNyKilde, setVisLeggTilNyKilde] = useState<boolean>(true);

	function nullstillState() {
		setRedigeringModusIndeks(-1);
	}

	function handleKildeChanged(index: number, kilde: string) {
		if (!kilde.trim()) return;

		setKilder(prevState => {
			const kilderKopi = [...prevState];

			if (index === kilder.length) {
				kilderKopi.push(kilde);
				return kilderKopi;
			}

			kilderKopi[index] = kilde;
			return kilderKopi;
		});
	}

	function handleKildeDeleted(index: number) {
		setKilder(prevState => [...prevState].filter((o, idx) => idx !== index));
	}

	return (
		<div className="kilder-felt" id="kilder-scroll-to">
			<FeltHeader
				id="kilder-tittel"
				tittel="Kilder"
				tipsId="kilder-tips"
				tipsInnhold={<KilderTipsInnhold />}
				tipsAriaLabel="Tips for kilder"
			/>
			<CheckboxGroup
				id="kilder__checkboxgroup"
				size="small"
				legend="Valg av kilder"
				hideLegend
				onChange={nyeValgteKilder => setValgteKilder(nyeValgteKilder)}
				value={valgteKilder}
				error={errors.kilder}
			>
				{kilder.map((kilde, index) =>
					redigeringModusIndeks !== index ? (
						<VisKilde
							kildenavn={kilde}
							handleKilde={() => {
								setRedigeringModusIndeks(index);
								setVisLeggTilNyKilde(true);
							}}
							key={index}
						/>
					) : (
						<RedigerKilde
							key={index}
							kildenavn={kilde}
							negativeBtn="DELETE"
							onTekstSubmit={endretKilde => {
								handleKildeChanged(index, endretKilde);
								setValgteKilder(prevState => prevState.map(k => (k === kilde ? endretKilde : k)));
								nullstillState();
							}}
							onTekstDeleteOrCancel={() => {
								handleKildeDeleted(index);
								setValgteKilder(prevState => [...prevState].filter(k => k !== kilde));
								nullstillState();
							}}
						/>
					)
				)}
			</CheckboxGroup>
			{visLeggTilNyKilde ? (
				<LeggTilKilde
					leggTilKilde={() => {
						setVisLeggTilNyKilde(false);
						nullstillState();
					}}
				/>
			) : (
				<RedigerKilde
					kildenavn={''}
					negativeBtn="CANCEL"
					onTekstSubmit={nyKilde => {
						handleKildeChanged(kilder.length, nyKilde);
						setValgteKilder(prevState => [...prevState, nyKilde]);
						setVisLeggTilNyKilde(true);
					}}
					onTekstDeleteOrCancel={() => {
						setVisLeggTilNyKilde(true);
					}}
				/>
			)}
		</div>
	);
}

export default Kilder;
