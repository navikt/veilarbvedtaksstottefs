import { Accordion, Heading, Link } from '@navikt/ds-react';
import { ExternalLink } from '@navikt/ds-icons';
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

function GammelnavskDictionary(props: { content: any }) {
	const value = props.content;
	let kansellisten = Kansellisten;
	let gammelnavsk = GammelnavskOrdliste;
	let gammelnavskResultater: GammelnavskType[] = [];
	let kansellistenResultater: KansellistenType[] = [];

	const keyword = value;
	if (keyword !== '') {
		const results = gammelnavsk.gammelnavsk_ordliste.filter(gammelnavsk => {
			return keyword.toLowerCase().match('\\b' + gammelnavsk.ord.toLowerCase() + '\\b');
		});
		gammelnavskResultater = results;
	}
	if (keyword !== '') {
		const results = kansellisten.kansellisten.filter(gammelnavsk => {
			return keyword.toLowerCase().match('\\b' + gammelnavsk.kanselliord.toLowerCase() + '\\b');
		});
		kansellistenResultater = results;
	}

	let gammelnavskVisResultater = false;
	if (gammelnavskResultater?.length > 0) {
		gammelnavskVisResultater = true;
	}

	let kansellistenVisResultater = false;
	if (kansellistenResultater.length > 0) {
		kansellistenVisResultater = true;
	}

	return (
		<>
			{(gammelnavskVisResultater || kansellistenVisResultater) && (
				<Accordion.Item>
					<Accordion.Header type="button">
						{gammelnavskResultater.length + kansellistenResultater.length > 0 && (
							<>{gammelnavskResultater.length + kansellistenResultater.length} ord som kan byttes ut</>
						)}
					</Accordion.Header>
					<Accordion.Content>
						<Heading spacing level="3" size="xsmall">
							Velg enkle ord
						</Heading>
						<div className="pb-6">Ord og utrykk som sier noe på en vanskeligere måte enn nødvendig:</div>
						{kansellistenResultater.length >= 1 && (
							<>
								{gammelnavskResultater.length >= 1 && (
									<Heading spacing level="4" size="xsmall" className="mb-4">
										Kansellisten
									</Heading>
								)}
								<Accordion className="gammelnavskAccordion">
									{kansellistenResultater.map((gammelnavsk, i) => (
										<>
											<Accordion.Item key={gammelnavsk.kanselliord}>
												<Accordion.Header className="gammelnavskAccordion">
													<span className="firstLetter">"{gammelnavsk.kanselliord}"</span>
												</Accordion.Header>
												<Accordion.Content className="gammelnavskAccordionContent">
													<Heading spacing level="4" size="xsmall">
														Forslag
													</Heading>
													Skriv heller: {gammelnavsk.alternativ_1}
													<Heading spacing className="pt-6" level="4" size="xsmall">
														Kilde
													</Heading>
													<Link
														target="_blank"
														href="https://www.sprakradet.no/klarsprak/om-skriving/kansellisten/"
													>
														Kansellisten
														<ExternalLink />
													</Link>
												</Accordion.Content>
											</Accordion.Item>
										</>
									))}
								</Accordion>
							</>
						)}
						{gammelnavskResultater.length >= 1 && kansellistenResultater.length >= 1 && (
							<div className="mb-6"></div>
						)}
						{gammelnavskResultater.length >= 1 && (
							<>
								{kansellistenResultater.length >= 1 && (
									<Heading spacing level="4" size="xsmall" className="mb-4">
										Gammelnavsk ordliste
									</Heading>
								)}
								<Accordion className="gammelnavskAccordion">
									{gammelnavskResultater.map((gammelnavsk, i) => (
										<>
											<Accordion.Item key={gammelnavsk.id}>
												<Accordion.Header className="gammelnavskAccordion">
													<span className="firstLetter">"{gammelnavsk.ord}"</span>
												</Accordion.Header>
												<Accordion.Content className="gammelnavskAccordionContent">
													<Heading spacing level="4" size="xsmall">
														Gammelnavsk
													</Heading>
													{gammelnavsk.gammelnavsk}
													<Heading spacing className="pt-6" level="4" size="xsmall">
														Klart språk
													</Heading>
													{gammelnavsk.klart_språk}
													<Heading spacing className="pt-6" level="4" size="xsmall">
														Kilde
													</Heading>
													<Link
														target="_blank"
														href="https://github.com/navikt/ordlister/blob/main/gammelnavsk/gammelnavsk_ordliste_2utgave.pdf"
													>
														Gammelnavsk ordliste
														<ExternalLink />
													</Link>
												</Accordion.Content>
											</Accordion.Item>
										</>
									))}
								</Accordion>
							</>
						)}
					</Accordion.Content>
				</Accordion.Item>
			)}
		</>
	);
}

export default GammelnavskDictionary;
