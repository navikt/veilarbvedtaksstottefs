import { Box, Radio, RadioGroup, Stack, Textarea, VStack } from '@navikt/ds-react';
import { useEffect, useState } from 'react';
import { KlagefristUnntakSvar } from '../../../api/veilarbvedtaksstotte/klagebehandling.ts';

interface Formkrav {
	klagefristOverholdt: boolean;
	klagefristOverstyres?: KlagefristUnntakSvar;
	klagerPartISaken: boolean;
	klagePaaKonkreteElementer: boolean;
	erKlagenSignert: boolean;
	avvisningsAarsak?: string;
}

interface FormkravUtkast {
	klagefristOverholdt?: boolean;
	klagefristOverstyres?: KlagefristUnntakSvar;
	klagerPartISaken?: boolean;
	klagePaaKonkreteElementer?: boolean;
	erKlagenSignert?: boolean;
	avvisningsAarsak?: string;
}

interface FormkravSectionProps {
	onChange: (formkrav: Formkrav | undefined) => void;
	onDraftChange: (formkrav: FormkravUtkast) => void;
}

export type { Formkrav, FormkravUtkast };

export function FormkravSection({ onChange, onDraftChange }: FormkravSectionProps) {
	const [klagefristOverholdt, setKlagefristOverholdt] = useState<boolean | undefined>();
	const [klagefristOverstyres, setKlagefristOverstyres] = useState<KlagefristUnntakSvar | undefined>();
	const [klagerPartISaken, setKlagerPartISaken] = useState<boolean | undefined>();
	const [klagePaaKonkreteElementer, setKlagePaaKonkreteElementer] = useState<boolean | undefined>();
	const [erKlagenSignert, setErKlagenSignert] = useState<boolean | undefined>();
	const [avvisningsAarsak, setAvvisningsAarsak] = useState<string | undefined>();

	const skalAvvises =
		(klagefristOverholdt === false && klagefristOverstyres === KlagefristUnntakSvar.NEI) ||
		klagerPartISaken === false ||
		klagePaaKonkreteElementer === false ||
		erKlagenSignert === false;

	useEffect(() => {
		onDraftChange({
			klagefristOverholdt,
			klagefristOverstyres: klagefristOverholdt ? undefined : klagefristOverstyres,
			klagerPartISaken,
			klagePaaKonkreteElementer,
			erKlagenSignert,
			avvisningsAarsak: avvisningsAarsak?.trim() || undefined
		});
	}, [
		klagefristOverholdt,
		klagefristOverstyres,
		klagerPartISaken,
		klagePaaKonkreteElementer,
		erKlagenSignert,
		avvisningsAarsak,
		onDraftChange
	]);

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
		<VStack gap="space-32">
			<VStack gap="space-4">
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
					<Box paddingInline="space-28">
						<RadioGroup
							legend="Er unntak for klagefristen oppfylt?"
							size="small"
							onChange={setKlagefristOverstyres}
						>
							<Stack direction="column">
								<Radio value={KlagefristUnntakSvar.JA_KLAGER_KAN_IKKE_LASTES}>
									Ja, klager kan ikke lastes for å ha sendt inn klage etter fristen
								</Radio>
								<Radio value={KlagefristUnntakSvar.JA_SAERLIGE_GRUNNER}>
									Ja, av særlige grunner er det rimelig at klagen blir behandlet
								</Radio>
								<Radio value={KlagefristUnntakSvar.NEI}>Nei</Radio>
							</Stack>
						</RadioGroup>
					</Box>
				)}
			</VStack>
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
				<Box width="100%" maxWidth="60%">
					<Textarea
						label="Begrunnelse for avvisning som skal sendes til bruker"
						size="small"
						resize
						value={avvisningsAarsak || ''}
						onChange={e => setAvvisningsAarsak(e.target.value)}
						required
					/>
				</Box>
			)}
		</VStack>
	);
}
