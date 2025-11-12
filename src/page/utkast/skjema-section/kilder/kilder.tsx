import { useState } from 'react';
import { VisKilde } from './vis-kilde/vis-kilde';
import { RedigerKilde } from './rediger-kilde/rediger-kilde';
import { LeggTilKilde } from './legg-til-kilde/legg-til-kilde';
import { KilderTipsInnhold } from './kilder-tips-innhold';
import FeltHeader from '../felt-header/felt-header';
import { useSkjemaStore } from '../../../../store/skjema-store';
import { mergeMedDefaultKilder } from '../../../../util/skjema-utils';
import { Kilde } from '../../../../api/veilarbvedtaksstotte';
import { CheckboxGroup } from '@navikt/ds-react';
import './kilder.css';

function Kilder() {
	const { valgteKilder, setValgteKilder, errors } = useSkjemaStore();
	const [valgteKildeIder, setValgteKildeIder] = useState<string[]>(valgteKilder.map(kilde => kilde.kildeId));
	const [kilder, setKilder] = useState<Kilde[]>(mergeMedDefaultKilder(valgteKilder));
	const [redigeringModusIndeks, setRedigeringModusIndeks] = useState<string | null>(null);
	const [visLeggTilNyKilde, setVisLeggTilNyKilde] = useState<boolean>(true);

	function nullstillState() {
		setRedigeringModusIndeks(null);
	}

	function handleKildeChanged(kilde: Kilde, endringstype: 'ENDRET' | 'NY') {
		if (!kilde.tekst.trim()) return;

		setKilder(prevState => {
			const kilderKopi = [...prevState];

			if (endringstype === 'NY') {
				kilderKopi.push(kilde);
				return kilderKopi;
			}

			const kildelisteIndex = kilderKopi.findIndex(kildekopi => kildekopi.kildeId === kilde.kildeId);
			kilderKopi[kildelisteIndex] = kilde;
			return kilderKopi;
		});
	}

	function handleKildeDeleted(index: number) {
		setKilder(prevState => [...prevState].filter((o, idx) => idx !== index));
	}

	return (
		<div className="kilder-felt" id="kilder__scroll-til-feil">
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
				onChange={nyeValgteKildeIder => {
					setValgteKildeIder(nyeValgteKildeIder);
					setValgteKilder(prevValgteKilder =>
						prevValgteKilder.filter(kilde => nyeValgteKildeIder.includes(kilde.kildeId))
					);
				}}
				value={valgteKildeIder}
				error={errors.kilder}
			>
				{kilder.map((kilde, index) =>
					redigeringModusIndeks !== kilde.kildeId ? (
						<VisKilde
							kildeId={kilde.kildeId}
							kildetekst={kilde.tekst}
							handleKilde={() => {
								setRedigeringModusIndeks(kilde.kildeId);
								setVisLeggTilNyKilde(true);
							}}
							key={kilde.kildeId}
						/>
					) : (
						<RedigerKilde
							key={kilde.kildeId}
							kilde={kilde}
							negativeBtn="DELETE"
							onTekstSubmit={endretKilde => {
								handleKildeChanged(endretKilde, 'ENDRET');
								setValgteKilder(prevState =>
									prevState.map(prevKilde =>
										prevKilde.tekst === kilde.tekst ? endretKilde : prevKilde
									)
								);
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
					kilde={null}
					negativeBtn="CANCEL"
					onTekstSubmit={nyKilde => {
						handleKildeChanged(nyKilde, 'NY');
						setValgteKilder(prevState => [...prevState, nyKilde]);
						setValgteKildeIder(prevState => [...prevState, nyKilde.kildeId]);
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
