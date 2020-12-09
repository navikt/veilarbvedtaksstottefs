import React, { useEffect, useState } from 'react';
import { VisOpplysning } from './vis-opplysning/vis-opplysning';
import { RedigerOpplysning } from './rediger-opplysning/rediger-opplysning';
import { LeggTilOpplysning } from './legg-til-opplysning/legg-til-opplysning';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import { useSkjemaStore } from '../../../../stores/skjema-store';
import { mergeMedDefaultOpplysninger } from '../../../../utils/skjema-utils';
import { useIsAfterFirstRender } from '../../../../utils/hooks';
import { OpplysningerTipsInnhold } from './opplysninger-tips-innhold';
import FeltHeader from '../felt-header/felt-header';
import { lagSkjemaelementFeilmelding } from '../../../../utils';
import './opplysninger.less';

export interface Opplysning {
	navn: string;
	erValgt: boolean;
}

function Opplysninger() {
	const { opplysninger: skjemaOpplysninger, setOpplysninger: setSkjemaOpplysninger, errors } = useSkjemaStore();
	const [opplysninger, setOpplysninger] = useState<Opplysning[]>(mergeMedDefaultOpplysninger(skjemaOpplysninger));
	const [redigeringModusIndeks, setRedigeringModusIndeks] = useState<number>(-1);
	const [visLeggTilNyOpplysning, setVisLeggTilNyOpplysning] = useState<boolean>(true);
	const [sistEndretIndeks, setSistEndretIndeks] = useState<number>(-1);
	const isAfterFirstRender = useIsAfterFirstRender();

	function nullstilState() {
		setRedigeringModusIndeks(-1);
		setSistEndretIndeks(-1);
	}

	function handleOpplysningerChanged(index: number, opplysning: Opplysning) {
		if (!opplysning.navn.trim()) return;

		setSistEndretIndeks(index);

		setOpplysninger(prevState => {
			const opplysningerKopi = [...prevState];

			if (index === opplysninger.length) {
				opplysningerKopi.push(opplysning);
				return opplysningerKopi;
			}

			opplysningerKopi[index] = opplysning;
			return opplysningerKopi;
		});
	}

	function handleOpplysningDeleted(index: number) {
		setOpplysninger(prevState => [...prevState].filter((o, idx) => idx !== index));
	}

	function handleOpplysningerChecked(index: number, opplysning: Opplysning) {
		setOpplysninger(prevState => {
			const opplysningerKopi = [...prevState];
			opplysningerKopi[index] = opplysning;
			return opplysningerKopi;
		});
	}

	useEffect(() => {
		if (isAfterFirstRender) {
			const valgteOpplysninger = opplysninger
				.filter(opplysning => opplysning.erValgt)
				.map(opplysning => opplysning.navn);

			setSkjemaOpplysninger(valgteOpplysninger);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [opplysninger]);

	return (
		<div className="opplysninger-bolk blokk-l" id="opplysninger-scroll-to">
			<FeltHeader
				id="kilder-tittel"
				tittel="Kilder"
				tipsId="opplysninger-tips"
				tipsInnhold={<OpplysningerTipsInnhold />}
				tipsAriaLabel="Kilder tips"
			/>

			<div className="opplysninger">
				<div className="opplysninger__innhold">
					<SkjemaGruppe
						aria-labelledby="kilder-tittel"
						feil={lagSkjemaelementFeilmelding(errors.opplysninger)}
					>
						{opplysninger.map((opplysning, index) =>
							redigeringModusIndeks !== index ? (
								<VisOpplysning
									opplysning={opplysning}
									handleOpplysning={() => {
										setRedigeringModusIndeks(index);
										setVisLeggTilNyOpplysning(true);
									}}
									key={index}
									onChange={o => handleOpplysningerChecked(index, o)}
									erSistEndretIndeks={index === sistEndretIndeks}
								/>
							) : (
								<RedigerOpplysning
									key={index}
									opplysning={opplysning}
									negativeBtn="DELETE"
									onTekstSubmit={endretOpplysning => {
										setRedigeringModusIndeks(-1);
										handleOpplysningerChanged(index, endretOpplysning);
									}}
									onTekstDeleteOrCancel={() => {
										handleOpplysningDeleted(index);
										nullstilState();
									}}
								/>
							)
						)}
					</SkjemaGruppe>
					{visLeggTilNyOpplysning ? (
						<LeggTilOpplysning
							leggTilOpplysning={() => {
								setVisLeggTilNyOpplysning(false);
								nullstilState();
							}}
						/>
					) : (
						<RedigerOpplysning
							opplysning={{ navn: '', erValgt: true }}
							negativeBtn="CANCEL"
							onTekstSubmit={endretOpplysning => {
								handleOpplysningerChanged(opplysninger.length, endretOpplysning);
								setVisLeggTilNyOpplysning(true);
							}}
							onTekstDeleteOrCancel={() => {
								setVisLeggTilNyOpplysning(true);
							}}
						/>
					)}
				</div>
			</div>
		</div>
	);
}

export default Opplysninger;
