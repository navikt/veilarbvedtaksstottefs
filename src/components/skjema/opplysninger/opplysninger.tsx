import React, { useContext, useState } from 'react';
import { VisOpplysning } from './vis-opplysning/vis-opplysning';
import { RedigerOpplysning } from './rediger-opplysning/rediger-opplysning';
import { LeggTilOpplysning } from './legg-til-opplysning/legg-til-opplysning';
import { Normaltekst } from 'nav-frontend-typografi';
import { OpplysningerHjelpeTekster } from './hjelpetekst-opplysninger';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import SkjemaBolk from '../bolk/skjema-bolk';
import { useSkjemaStore } from '../../../stores/skjema-store';
import './opplysninger.less';
import { lagSkjemaElementFeil } from '../skjema-utils';

export type Opplysning = {
	[key: string]: boolean;
};

function Opplysninger() {
	const { opplysninger, setOpplysninger, errors } = useSkjemaStore();
	const [redigeringModusIndeks, setRedigeringModusIndeks] = useState<number>(-1);
	const [visLeggTilNyOpplysning, setVisLeggTilNyOpplysning] = useState<boolean>(true);
	const [sistEndretIndeks, setSistEndretIndeks] = useState<number>(-1);

	function nullstilState() {
		setRedigeringModusIndeks(-1);
		setSistEndretIndeks(-1);
	}

	function handleOpplysningerChanged(index: number, opplysning: Opplysning) {
		if (Object.keys(opplysning)[0].trim()) {
			setSistEndretIndeks(index);
			setOpplysninger(prevState => {
				if (index === prevState.length) {
					return [...prevState, opplysning];
				}
				return prevState.map((prevOpplysning, idx) => {
					if (idx === index) {
						return opplysning;
					}
					return prevOpplysning;
				});
			});
		}
	}

	function handleOpplysningDeleted(index: number) {
		setOpplysninger(prevState => {
			return [...prevState].filter((o, idx) => idx !== index);
		});
	}

	function handleOpplysningerChecked(opplysning: Opplysning) {
		setOpplysninger(prevState => {
			return prevState.map(prevOpplysning => {
				if (Object.keys(prevOpplysning)[0] === Object.keys(opplysning)[0]) {
					return opplysning;
				}
				return prevOpplysning;
			});
		});
	}

	return (
		<SkjemaBolk tittel="Kilder" tittelId="kilder-tittel">
			<div className="opplysninger">
				<Normaltekst>Velg eller skriv inn kilder som vises i vedtaksbrevet.</Normaltekst>
				<div className="opplysninger__innhold">
					<SkjemaGruppe aria-labelledby="kilder-tittel" feil={lagSkjemaElementFeil(errors.opplysninger)}>
						{opplysninger.map((opplysning, index) =>
							redigeringModusIndeks !== index ? (
								<VisOpplysning
									opplysning={opplysning}
									handleOpplysning={() => {
										setRedigeringModusIndeks(index);
										setVisLeggTilNyOpplysning(true);
									}}
									key={index}
									onChange={handleOpplysningerChecked}
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
							opplysning={{ '': true }}
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
				<OpplysningerHjelpeTekster />
			</div>
		</SkjemaBolk>
	);
}

export default Opplysninger;
