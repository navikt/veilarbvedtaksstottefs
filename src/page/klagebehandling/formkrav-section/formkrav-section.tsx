import { Radio, RadioGroup, Stack, TextField, VStack } from '@navikt/ds-react';
import { useEffect, useState } from 'react';

interface Formkrav {
	klagefristOverholdt: boolean;
	klagefristOverstyres?: boolean;
	klagerPartISaken: boolean;
	klagePaaKonkreteElementer: boolean;
	erKlagenSignert: boolean;
	avvisningsAarsak?: string;
}
interface FormkravSectionProps {
	onChange: (formkrav: Formkrav | undefined) => void;
}

export type { Formkrav };

export function FormkravSection({ onChange }: FormkravSectionProps) {
	const [klagefristOverholdt, setKlagefristOverholdt] = useState<boolean | undefined>();
	const [klagefristOverstyres, setKlagefristOverstyres] = useState<boolean | undefined>();
	const [klagerPartISaken, setKlagerPartISaken] = useState<boolean | undefined>();
	const [klagePaaKonkreteElementer, setKlagePaaKonkreteElementer] = useState<boolean | undefined>();
	const [erKlagenSignert, setErKlagenSignert] = useState<boolean | undefined>();
	const [avvisningsAarsak, setAvvisningsAarsak] = useState<string | undefined>();

	const skalAvvises =
		!(klagefristOverstyres || klagefristOverholdt) ||
		!klagerPartISaken ||
		!klagePaaKonkreteElementer ||
		!erKlagenSignert;

	useEffect(() => {
		const harValgtKlagefristUnntak = klagefristOverholdt !== false || klagefristOverstyres !== undefined;
		const ferdig =
			[klagefristOverholdt, klagerPartISaken, klagePaaKonkreteElementer, erKlagenSignert].every(
				v => v !== undefined
			) && harValgtKlagefristUnntak;

		const harGyldigAvvisningsAarsak = !skalAvvises || !!avvisningsAarsak?.trim();

		if (ferdig && harGyldigAvvisningsAarsak) {
			onChange({
				klagefristOverholdt: klagefristOverholdt!,
				klagefristOverstyres: klagefristOverholdt ? undefined : klagefristOverstyres,
				klagerPartISaken: klagerPartISaken!,
				klagePaaKonkreteElementer: klagePaaKonkreteElementer!,
				erKlagenSignert: erKlagenSignert!,
				avvisningsAarsak: skalAvvises ? avvisningsAarsak?.trim() : undefined
			});
		} else {
			onChange(undefined);
		}
	}, [
		klagefristOverholdt,
		klagefristOverstyres,
		klagerPartISaken,
		klagePaaKonkreteElementer,
		erKlagenSignert,
		avvisningsAarsak,
		skalAvvises,
		onChange
	]);

	return (
		<VStack>
			<RadioGroup
				legend="Er klagefristen overholdt?"
				size="small"
				onChange={value => {
					setKlagefristOverholdt(value);
					if (value) {
						setKlagefristOverstyres(undefined);
					}
				}}
			>
				<Stack direction="column">
					<Radio value={true}>Ja</Radio>
					<Radio value={false}>Nei</Radio>
				</Stack>
			</RadioGroup>
			{klagefristOverholdt === false && (
				<RadioGroup
					legend="Er unntak for klagefristen oppfylt?"
					size="small"
					onChange={setKlagefristOverstyres}
				>
					<Stack direction="column">
						<Radio value={true}>Ja, klager kan ikke lastes for å ha sendt inn klage etter fristen</Radio>
						<Radio value={true}>Ja, av særlige grunner er det rimelig at klagen blir behandlet</Radio>
						<Radio value={false}>Nei</Radio>
					</Stack>
				</RadioGroup>
			)}
			<RadioGroup legend="Er klager part i saken?" size="small" onChange={setKlagerPartISaken}>
				<Stack direction="column">
					<Radio value={true}>Ja</Radio>
					<Radio value={false}>Nei</Radio>
				</Stack>
			</RadioGroup>
			<RadioGroup
				legend="Klages det på konkrete elementer i vedtaket?"
				size="small"
				onChange={setKlagePaaKonkreteElementer}
			>
				<Stack direction="column">
					<Radio value={true}>Ja</Radio>
					<Radio value={false}>Nei</Radio>
				</Stack>
			</RadioGroup>
			<RadioGroup legend="Er klagen signert?" size="small" onChange={setErKlagenSignert}>
				<Stack direction="column">
					<Radio value={true}>Ja</Radio>
					<Radio value={false}>Nei</Radio>
				</Stack>
			</RadioGroup>
			{skalAvvises && (
				<TextField
					label="Begrunnelse for å avvise klage"
					value={avvisningsAarsak || ''}
					onChange={e => setAvvisningsAarsak(e.target.value)}
					required
				/>
			)}
		</VStack>
	);
}
