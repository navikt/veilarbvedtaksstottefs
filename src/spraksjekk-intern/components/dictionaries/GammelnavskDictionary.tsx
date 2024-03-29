import { Accordion, BodyShort, Heading, Link } from '@navikt/ds-react';
import { ExternalLinkIcon } from '@navikt/aksel-icons';
import { OrNothing } from '../../../util/type/ornothing';
import { GammelnavskOrdliste } from '../../data';
import { Kansellisten } from '../../data';

interface GammelnavskType {
	id: string;
	ord: string;
	gammelnavsk: string;
	klart_språk: string;
}

interface KansellistenType {
	kanselliord: string;
	alternativ_1: string;
	alternativ_2: string;
}

function GammelnavskDictionary(props: { content: OrNothing<string> }) {
	let gammelnavskResultater: GammelnavskType[] = [];
	let kansellistenResultater: KansellistenType[] = [];

	if (props.content !== '') {
		gammelnavskResultater = GammelnavskOrdliste.gammelnavsk_ordliste.filter(gammelnavsk => {
			return props.content?.toLowerCase().match('\\b' + gammelnavsk.ord.toLowerCase() + '\\b');
		});
	}
	if (props.content !== '') {
		kansellistenResultater = Kansellisten.kansellisten.filter(gammelnavsk => {
			return props.content?.toLowerCase().match('\\b' + gammelnavsk.kanselliord.toLowerCase() + '\\b');
		});
	}

	return (
		<>
			{(gammelnavskResultater.length > 0 || kansellistenResultater.length > 0) && (
				<Accordion.Item>
					<Accordion.Header type="button">
						{gammelnavskResultater.length + kansellistenResultater.length} ord som kan byttes ut
					</Accordion.Header>
					<Accordion.Content>
						<Heading level="3" size="xsmall">
							Velg enkle ord
						</Heading>
						<BodyShort size="small" className="mb-4">
							Her vises ord og uttrykk som mulig sier noe på en vanskeligere måte enn nødvendig. Disse er
							hentet fra gammelnavsk ordliste og Språkrådets kansellisten.
						</BodyShort>

						{gammelnavskResultater.length >= 1 && (
							<>
								{gammelnavskResultater.map((gammelnavsk, i) => (
									<Accordion.Item key={'gammelnavsk' + i}>
										<Accordion.Header type="button">
											<span className="firstLetter">&quot;{gammelnavsk.ord}&quot;</span>
										</Accordion.Header>
										<Accordion.Content>
											<Heading level="4" size="xsmall">
												Gammelnavsk
											</Heading>
											<BodyShort size="small">
												<em>{gammelnavsk.gammelnavsk}</em>
											</BodyShort>
											<Heading className="mt-4" level="4" size="xsmall">
												Klart språk
											</Heading>
											{gammelnavsk.klart_språk}
										</Accordion.Content>
									</Accordion.Item>
								))}
								<Accordion.Content className="gammelnavsk-kilde">
									<Heading className="mt-4" level="4" size="xsmall">
										Kilde
									</Heading>
									<Link
										target="_blank"
										href="https://navno.sharepoint.com/:b:/r/sites/intranett-kommunikasjon/Delte%20dokumenter/Spr%C3%A5k/gammelnavsk_ordliste_2utgave.pdf?csf=1&web=1&e=2LfhY8"
									>
										Gammelnavsk ordliste
										<ExternalLinkIcon />
									</Link>
								</Accordion.Content>
							</>
						)}

						{kansellistenResultater.length >= 1 && (
							<>
								{kansellistenResultater.map((kanselli, i) => (
									<Accordion.Item key={'kanselli' + i}>
										<Accordion.Header type="button">
											<span className="firstLetter">&quot;{kanselli.kanselliord}&quot;</span>
										</Accordion.Header>
										<Accordion.Content>
											<Heading level="4" size="xsmall">
												Forslag
											</Heading>
											Skriv heller: {kanselli.alternativ_1}
										</Accordion.Content>
									</Accordion.Item>
								))}
								<Accordion.Content className="gammelnavsk-kilde">
									<Heading className="mt-4" level="4" size="xsmall">
										Kilde
									</Heading>
									<Link
										target="_blank"
										href="https://www.sprakradet.no/klarsprak/om-skriving/kansellisten/"
									>
										Kansellisten
										<ExternalLinkIcon />
									</Link>
								</Accordion.Content>
							</>
						)}
					</Accordion.Content>
				</Accordion.Item>
			)}
		</>
	);
}

export default GammelnavskDictionary;
