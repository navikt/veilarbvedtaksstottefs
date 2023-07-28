import { Accordion, Heading, Link } from '@navikt/ds-react';
import { ExternalLink } from '@navikt/ds-icons';
import { Nrkordliste } from '../../data';

interface NrkInterface {
	id: string;
	ord: string;
	bruk: string;
	bokmål: string;
	kilde: string;
	lenke: string;
}

function NrkDictionaries(props: { content: string }) {
	const value = props.content;
	let gammelnavsk = Nrkordliste;
	let gammelnavskResultater: NrkInterface[] = [];

	const keyword = value;
	if (keyword !== '') {
		const results = gammelnavsk.nrkordliste.filter(gammelnavsk => {
			return keyword.toLowerCase().match('\\b' + gammelnavsk.ord.toLowerCase() + '\\b');
		});
		gammelnavskResultater = results;
	}

	return (
		<>
			{gammelnavskResultater?.length > 0 && (
				<Accordion.Item>
					<Accordion.Header type="button">
						{gammelnavskResultater.length === 1 ? (
							<>1 mulig støtende ord</>
						) : (
							<>{gammelnavskResultater.length} mulige støtende ord</>
						)}
					</Accordion.Header>
					<Accordion.Content>
						<Heading spacing level="3" size="xsmall">
							Vær varsom
						</Heading>
						Ord i teksten som kan være støtende, eller som bør brukes med varsomhet:
						<Accordion className="gammelnavskAccordion mt-4">
							{gammelnavskResultater.map((gammelnavsk, i) => (
								<Accordion.Item key={gammelnavsk.id}>
									<Accordion.Header className="gammelnavskAccordion" type="button">
										<span className="firstLetter">&quot;{gammelnavsk.ord}&quot;</span>
									</Accordion.Header>
									<Accordion.Content className="gammelnavskAccordionContent">
										<Heading spacing level="4" size="xsmall">
											Forklaring
										</Heading>
										<p>{gammelnavsk.bokmål}</p>
										{/*                                        {gammelnavsk.bruk = "2" &&
                                            <>
                                                <p>Vær varsom eller oppmerksom når du bruker dette ordet.</p>
                                            </>
                                        }*/}
										<Heading spacing level="4" size="xsmall">
											Kilde
										</Heading>
										{
											<Link target="_blank" href={gammelnavsk.lenke}>
												{gammelnavsk.kilde}
												<ExternalLink />
											</Link>
										}
									</Accordion.Content>
								</Accordion.Item>
							))}
						</Accordion>
					</Accordion.Content>
				</Accordion.Item>
			)}
		</>
	);
}

export default NrkDictionaries;
