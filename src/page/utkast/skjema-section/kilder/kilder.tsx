import { useState } from 'react';
import { VisKilde } from './vis-kilde/vis-kilde';
import { RedigerKilde } from './rediger-kilde/rediger-kilde';
import { LeggTilKilde } from './legg-til-kilde/legg-til-kilde';
import { AndreKilderTipsInnhold } from './andre-kilder-tips-innhold';
import FeltHeader from '../felt-header/felt-header';
import { useSkjemaStore } from '../../../../store/skjema-store';
import { erDefaultKilde, kildelisteBokmal } from '../../../../util/skjema-utils';
import { CheckboxGroup } from '@navikt/ds-react';
import { oppdaterKildevalg } from './kilder-utils';
import { AutomatiskeKilderTipsInnhold } from './automatiske-kilder-tips-innhold';
import './kilder.css';

function Kilder() {
	const { valgteKilder, setValgteKilder, errors } = useSkjemaStore();
	const kilderFeil = valgteKilder.length === 0 ? errors.kilder : undefined;
	const [kilder, setKilder] = useState<string[]>(valgteKilder.filter(kilde => !erDefaultKilde(kilde)));
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
		setKilder(prevState => [...prevState].filter((_, idx) => idx !== index));
	}

	return (
		<div className="kilder-felt" id="kilder__scroll-til-feil">
			<FeltHeader
				id="automatiske-kilder-tittel"
				tittel="Automatisk journalførte kilder"
				tipsInnhold={<AutomatiskeKilderTipsInnhold />}
				tipsId="automatiske-kilder-tips"
				tipsAriaLabel="Tips for automatisk journalførte kilder"
				beskrivelse="Disse kildene journalføres automatisk på vedtakstidspunktet dersom de er valgt."
			/>
			<CheckboxGroup
				id="automatiske-kilder__checkboxgroup"
				size="small"
				legend="Automatisk journalførte kilder"
				hideLegend
				onChange={(nyeValgteKilder: string[]) =>
					setValgteKilder(prevState => oppdaterKildevalg(prevState, nyeValgteKilder, erDefaultKilde))
				}
				value={valgteKilder.filter(erDefaultKilde)}
				error={kilderFeil}
			>
				{kildelisteBokmal.map(kilde => (
					<VisKilde key={kilde} kildenavn={kilde} />
				))}
			</CheckboxGroup>
			<FeltHeader
				id="kilder-tittel"
				tittel="Andre kilder"
				tipsInnhold={<AndreKilderTipsInnhold />}
				tipsId="andre-kilder-tips"
				tipsAriaLabel="Tips for andre kilder"
				beskrivelse="Andre kilder må du selv sørge for er journalført."
			/>
			<CheckboxGroup
				id="andre-kilder__checkboxgroup"
				size="small"
				legend="Andre kilder"
				hideLegend
				onChange={(nyeValgteKilder: string[]) =>
					setValgteKilder(prevState =>
						oppdaterKildevalg(prevState, nyeValgteKilder, kilde => !erDefaultKilde(kilde))
					)
				}
				value={valgteKilder.filter(kilde => !erDefaultKilde(kilde))}
				error={kilderFeil}
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
