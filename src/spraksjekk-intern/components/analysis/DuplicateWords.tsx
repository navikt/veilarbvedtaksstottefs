import { Accordion } from '@navikt/ds-react';

function DuplicateWords(props: { content: string }) {
	let value = props.content;
	value = value.replaceAll('Kontakt', '');
	value = value.replaceAll(/\d+(?: \d+)/g, '');
	value = value.toLowerCase();

	// Find duplicate words
	let duplicateWordsList: string | number | boolean | JSX.Element[] | null | undefined = [];
	let duplicateWordsCount = 0;
	const matches = value.match(/\b(\w{2,5})\s+\1\b/g);
	if (matches) {
		duplicateWordsCount = matches.length;
		duplicateWordsList = matches.map(
			(duplicatedword: string, index: number): JSX.Element => (
				<li className="pb-2" key={index}>
					{duplicatedword}
				</li>
			)
		);
	}
	return (
		<>
			{duplicateWordsCount !== 0 && (
				<Accordion.Item>
					<Accordion.Header type="button">
						{duplicateWordsCount === 1 ? (
							<>1 gjentakelse av like ord</>
						) : (
							<>{duplicateWordsCount} gjentakelser av like ord</>
						)}
					</Accordion.Header>
					<Accordion.Content className="removeAccordionPaddingBottom">
						Gjentakelse av like ord etter hverandre:
						<ul className="list-disc pt-5 list-inside">{duplicateWordsList}</ul>
					</Accordion.Content>
				</Accordion.Item>
			)}
		</>
	);
}

export default DuplicateWords;
