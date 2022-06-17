import { Accordion } from '@navikt/ds-react';

function DublicateWords(props: { content: string }) {
	let value = props.content;
	value = value.replaceAll('Kontakt', '');
	value = value.replaceAll(/\d+(?: \d+)/g, '');
	value = value.toLowerCase();

	// Find dublicate words
	let dublicateWordsList: JSX.Element[] = [];
	let dublicateWordsCount: number = 0;
	const match = value.match(/\b(\w+)\s+\1\b/g);
	if (match !== null) {
		dublicateWordsCount = match.length;
		dublicateWordsList = match.map((duplicatedword, index) => <li key={index}>{duplicatedword}</li>);
	}
	return (
		<>
			{dublicateWordsCount != 0 && (
				<Accordion.Item>
					<Accordion.Header
						onClick={e => {
							e.preventDefault();
						}}
					>
						{dublicateWordsCount == 1 ? (
							<>1 gjentakelse av like ord</>
						) : (
							<>{dublicateWordsCount} gjentakelser av like ord</>
						)}
					</Accordion.Header>
					<Accordion.Content>
						Gjentakelse av like ord etter hverandre:
						<ul className="list-disc pt-5 list-inside">{dublicateWordsList}</ul>
					</Accordion.Content>
				</Accordion.Item>
			)}
		</>
	);
}

export default DublicateWords;
