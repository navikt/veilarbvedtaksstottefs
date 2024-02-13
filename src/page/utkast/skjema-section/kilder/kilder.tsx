import { useEffect, useState } from 'react';
import { VisKilde } from './vis-kilde/vis-kilde';
import { RedigerKilde } from './rediger-kilde/rediger-kilde';
import { LeggTilKilde } from './legg-til-kilde/legg-til-kilde';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import { KilderTipsInnhold } from './kilder-tips-innhold';
import FeltHeader from '../felt-header/felt-header';
import './kilder.less';
import { useSkjemaStore } from '../../../../store/skjema-store';
import { mergeMedDefaultKilder } from '../../../../util/skjema-utils';
import { useIsAfterFirstRender } from '../../../../util/hooks';
import { lagSkjemaelementFeilmelding } from '../../../../util';

export interface Kilde {
	navn: string;
	erValgt: boolean;
}

function Kilder() {
	const { valgteKilder: valgteKilderfraStore, setValgteKilder, errors } = useSkjemaStore();
	const [kilder, setKilder] = useState<Kilde[]>(mergeMedDefaultKilder(valgteKilderfraStore));
	const [redigeringModusIndeks, setRedigeringModusIndeks] = useState<number>(-1);
	const [visLeggTilNyKilde, setVisLeggTilNyKilde] = useState<boolean>(true);
	const [sistEndretIndeks, setSistEndretIndeks] = useState<number>(-1);
	const isAfterFirstRender = useIsAfterFirstRender();

	function nullstilState() {
		setRedigeringModusIndeks(-1);
		setSistEndretIndeks(-1);
	}

	function handleKildeChanged(index: number, kilde: Kilde) {
		if (!kilde.navn.trim()) return;

		setSistEndretIndeks(index);

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

	function handleKildeChecked(index: number, kilde: Kilde) {
		setKilder(prevState => {
			const kilderKopi = [...prevState];
			kilderKopi[index] = kilde;
			return kilderKopi;
		});
	}

	useEffect(() => {
		if (isAfterFirstRender) {
			const valgteKilder = kilder.filter(kilde => kilde.erValgt).map(kilde => kilde.navn);

			setValgteKilder(valgteKilder);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [kilder]);

	return (
		<div className="kilder-felt" id="kilder-scroll-to">
			<FeltHeader
				id="kilder-tittel"
				tittel="Kilder"
				tipsId="kilder-tips"
				tipsInnhold={<KilderTipsInnhold />}
				tipsAriaLabel="Tips for kilder"
			/>

			<div className="kilder">
				<div className="kilder__innhold">
					<SkjemaGruppe aria-labelledby="kilder-tittel" feil={lagSkjemaelementFeilmelding(errors.kilder)}>
						{kilder.map((kilde, index) =>
							redigeringModusIndeks !== index ? (
								<VisKilde
									kilde={kilde}
									handleKilde={() => {
										setRedigeringModusIndeks(index);
										setVisLeggTilNyKilde(true);
									}}
									key={index}
									onChange={o => handleKildeChecked(index, o)}
									erSistEndretIndeks={index === sistEndretIndeks}
								/>
							) : (
								<RedigerKilde
									key={index}
									kilde={kilde}
									negativeBtn="DELETE"
									onTekstSubmit={endretKilde => {
										setRedigeringModusIndeks(-1);
										handleKildeChanged(index, endretKilde);
									}}
									onTekstDeleteOrCancel={() => {
										handleKildeDeleted(index);
										nullstilState();
									}}
								/>
							)
						)}
					</SkjemaGruppe>
					{visLeggTilNyKilde ? (
						<LeggTilKilde
							leggTilKilde={() => {
								setVisLeggTilNyKilde(false);
								nullstilState();
							}}
						/>
					) : (
						<RedigerKilde
							kilde={{ navn: '', erValgt: true }}
							negativeBtn="CANCEL"
							onTekstSubmit={endretKilde => {
								handleKildeChanged(kilder.length, endretKilde);
								setVisLeggTilNyKilde(true);
							}}
							onTekstDeleteOrCancel={() => {
								setVisLeggTilNyKilde(true);
							}}
						/>
					)}
				</div>
			</div>
		</div>
	);
}

export default Kilder;
