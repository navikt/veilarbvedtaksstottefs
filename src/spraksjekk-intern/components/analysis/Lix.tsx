import { Accordion, BodyShort, Heading, Link } from '@navikt/ds-react';
import { ExternalLinkIcon } from '@navikt/aksel-icons';
import { OrNothing } from '../../../util/type/ornothing';

function lixResultMessage(lix: number): string {
	// LIX begrunnelse (hvor kommer grenseverdiene fra?)
	if (lix < 0) {
		return '';
	} else if (lix < 24) {
		return 'Veldig enkel å lese';
	} else if (lix < 34) {
		return 'Enkel å lese';
	} else if (lix < 44) {
		return 'Middels vanskelig å lese';
	} else if (lix < 54) {
		return 'Vanskelig å lese';
	}
	return 'Veldig vanskelig å lese';
}

function Lix(props: { content: OrNothing<string> }) {
	const LETTER_LIMIT = 6;
	if (!props.content) {
		return (
			<Accordion.Item>
				<Accordion.Header>Klarte ikke regne ut liks-verdi</Accordion.Header>
			</Accordion.Item>
		);
	}

	// Get total number of words in text
	const words = props.content.split(/\s+/);
	const wordCount = words ? words.length : 1;

	// Count sentences
	const punct = '!;.*?';
	let punctuationCount = 0;
	for (const char of props.content) {
		if (punct.includes(char)) {
			punctuationCount++;
		}
	}

	// Loop through the entire array of words
	let longWordCount = 0;
	for (const i in words) {
		if (words[i].length > LETTER_LIMIT) {
			longWordCount++;
		}
	}

	// Calculate LIX
	const lix = Math.round(wordCount / punctuationCount + (longWordCount * 100) / wordCount);

	return (
		<>
			{lix >= 34 && lix < 100 && punctuationCount > 1 && (
				<Accordion.Item>
					<Accordion.Header type="button">
						Liks: {lix} - {lixResultMessage(lix)}
					</Accordion.Header>
					<Accordion.Content>
						<BodyShort size="small">
							Liks: {lix}. Teksten kan anses{' '}
							<span style={{ textTransform: 'lowercase' }}>{lixResultMessage(lix)}</span> ifølge{' '}
							<Link target="_blank" href="https://no.wikipedia.org/wiki/Lesbarhetsindeks">
								lesbarhetsindeksen Liks
								<ExternalLinkIcon />
							</Link>
							.
						</BodyShort>
						<BodyShort size="small" className="mt-4">
							<Heading level="4" size="xsmall">
								Skriveråd
							</Heading>
							<ul id="skriverad-liste">
								<li>Skriv korte og enkle setninger</li>
								<li>Velg korte og enkle ord</li>
								<li>Skriv det viktigste først</li>
							</ul>
						</BodyShort>
					</Accordion.Content>
				</Accordion.Item>
			)}
		</>
	);
}

export default Lix;
