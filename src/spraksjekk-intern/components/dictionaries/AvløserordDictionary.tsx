import { Accordion, Heading, Link } from '@navikt/ds-react';
import { ExternalLinkIcon } from '@navikt/aksel-icons';
import Avløserord from '../../data/avløserord.json';
import Datatermer from '../../data/datatermer.json';

interface AvløserordInterface {
	importord: string;
	avløserord: string;
}

interface DatatermerInterface {
	ord: string;
	bokmål: string;
	nynorsk: string;
	definisjon: string;
}

function GammelnavskCheck(props: { content: string }) {
	const value = props.content;
	const gammelnavsk = Avløserord;
	let gammelnavskResultater: AvløserordInterface[] = [];

	const datatermer = Datatermer;
	let datatermerResultater: DatatermerInterface[] = [];

	const keyword = value;
	if (keyword !== '') {
		const results = gammelnavsk.avløserord.filter(gammelnavsk => {
			return keyword.toLowerCase().match('\\b' + gammelnavsk.importord.toLowerCase() + '\\b');
		});
		gammelnavskResultater = results;

		const results2 = datatermer.datatermer.filter(datatermer => {
			return keyword.toLowerCase().match('\\b' + datatermer.ord.toLowerCase() + '\\b');
		});
		datatermerResultater = results2;
	}

	return (
		<>
			{(gammelnavskResultater.length > 0 || datatermerResultater.length > 0) && (
				<Accordion.Item>
					<Accordion.Header type="button">
						{gammelnavskResultater.length + datatermerResultater.length === 1 ? (
							<>1 mulig avløserord</>
						) : (
							<>{gammelnavskResultater.length + datatermerResultater.length} mulige avløserord</>
						)}
					</Accordion.Header>
					<Accordion.Content>
						Norske ord som kan brukes i stedet for de tilsvarende engelske:
						{gammelnavskResultater.length > 0 && (
							<Accordion className="gammelnavskAccordion mt-4">
								{gammelnavskResultater.map(gammelnavsk => (
									<Accordion.Item key="">
										<Accordion.Header className="gammelnavskAccordion" type="button">
											<span className="firstLetter">&quot;{gammelnavsk.importord}&quot;</span>
										</Accordion.Header>
										<Accordion.Content className="gammelnavskAccordionContent">
											<Heading spacing level="4" size="xsmall">
												Avløserord
											</Heading>
											<p>{gammelnavsk.avløserord}</p>
											<Heading spacing level="4" size="xsmall">
												Kilde
											</Heading>
											{
												<Link
													target="_blank"
													href="https://www.sprakradet.no/sprakhjelp/Skriverad/Avloeysarord/"
												>
													På godt norsk – avløserord
													<ExternalLinkIcon />
												</Link>
											}
										</Accordion.Content>
									</Accordion.Item>
								))}
							</Accordion>
						)}
						{datatermerResultater.length > 0 && (
							<Accordion className="gammelnavskAccordion">
								{datatermerResultater.map(gammelnavsk => (
									<Accordion.Item key="">
										<Accordion.Header className="gammelnavskAccordion" type="button">
											<span className="firstLetter">{gammelnavsk.ord}</span>
										</Accordion.Header>
										<Accordion.Content className="gammelnavskAccordionContent">
											<Heading spacing level="4" size="xsmall">
												Avløserord
											</Heading>
											<p>{gammelnavsk.bokmål}</p>
											<Heading spacing level="4" size="xsmall">
												Definisjon/forklaring
											</Heading>
											<p>{gammelnavsk.definisjon}</p>
											<Heading spacing level="4" size="xsmall">
												Kilde
											</Heading>
											{
												<Link
													target="_blank"
													href="https://www.sprakradet.no/sprakhjelp/Skriverad/Ordlister/Datatermar/"
												>
													Språkrådets datatermer <ExternalLinkIcon />
												</Link>
											}
										</Accordion.Content>
									</Accordion.Item>
								))}
							</Accordion>
						)}
					</Accordion.Content>
				</Accordion.Item>
			)}
		</>
	);
}

export default GammelnavskCheck;
