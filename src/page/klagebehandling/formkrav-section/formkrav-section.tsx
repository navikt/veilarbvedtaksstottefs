import { Radio, RadioGroup, Stack, TextField, VStack } from '@navikt/ds-react';
import { useEffect, useState } from 'react';

interface FormkravSectionProps {
	onChange: (ferdig: boolean) => void;
}

export function FormkravSection({ onChange }: FormkravSectionProps) {
	const [klagefristOverholdt, setKlagefristOverholdt] = useState<boolean | undefined>();
	const [klagefristOverstyres, setKlagefristOverstyres] = useState<boolean | undefined>();
	const [klagerPartISaken, setKlagerPartISaken] = useState<boolean | undefined>();
	const [klagePaaKonkreteElementer, setKlagePaaKonkreteElementer] = useState<boolean | undefined>();
	const [erKlagenSignert, setErKlagenSignert] = useState<boolean | undefined>();
	const [avvisningsAarsak, setAvvisningsAarsak] = useState<string | undefined>();

	useEffect(() => {
		const ferdig = [klagefristOverholdt, klagerPartISaken, klagePaaKonkreteElementer, erKlagenSignert].every(
			v => v !== undefined
		);
		onChange(ferdig);
	}, [klagefristOverholdt, klagerPartISaken, klagePaaKonkreteElementer, erKlagenSignert, onChange]);

	return (
		<VStack>
			<RadioGroup legend="Er klagefristen overholdt?" size="small" onChange={setKlagefristOverholdt}>
				<Stack gap="space-0 space-24" direction={{ xs: 'column', sm: 'row' }} wrap={false}>
					<Radio value={true}>Ja</Radio>
					<Radio value={false}>Nei</Radio>
				</Stack>
			</RadioGroup>
			{!klagefristOverholdt && (
				<RadioGroup legend="Er unntak for klagefristen oppfylt?" size="small" onChange={setKlagefristOverstyres}>
					<Stack gap="space-0 space-24" direction={{ xs: 'column', sm: 'row' }} wrap={false}>
						<Radio value={true}>Ja, klager kan ikke lastes for å ha sendt inn klage etter fristen</Radio>
						<Radio value={true}>Ja, av særlige grunner er det rimelig at klagen blir behandlet</Radio>
						<Radio value={false}>Nei</Radio>
					</Stack>
				</RadioGroup>
			)}
			<RadioGroup legend="Er klager part i saken?" size="small" onChange={setKlagerPartISaken}>
				<Stack gap="space-0 space-24" direction={{ xs: 'column', sm: 'row' }} wrap={false}>
					<Radio value={true}>Ja</Radio>
					<Radio value={false}>Nei</Radio>
				</Stack>
			</RadioGroup>
			<RadioGroup
				legend="Klages det på konkrete elementer i vedtaket?"
				size="small"
				onChange={setKlagePaaKonkreteElementer}
			>
				<Stack gap="space-0 space-24" direction={{ xs: 'column', sm: 'row' }} wrap={false}>
					<Radio value={true}>Ja</Radio>
					<Radio value={false}>Nei</Radio>
				</Stack>
			</RadioGroup>
			<RadioGroup legend="Er klagen signert?" size="small" onChange={setErKlagenSignert}>
				<Stack gap="space-0 space-24" direction={{ xs: 'column', sm: 'row' }} wrap={false}>
					<Radio value={true}>Ja</Radio>
					<Radio value={false}>Nei</Radio>
				</Stack>
			</RadioGroup>
			{(!(klagefristOverstyres || klagefristOverholdt) && klagerPartISaken && klagePaaKonkreteElementer && erKlagenSignert) && (
				<TextField label="Begrunnelse for å avvise klage"
						   value={avvisningsAarsak}
						   onChange={e => setAvvisningsAarsak(e.target.value)} />
			) }
		</VStack>
	);
}