import DOMPurify from 'dompurify';

const urlRegex = new RegExp(
	/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/,
	'gi'
);

export function purfiyUnsafeHtml(dirtyHtml: string): string {
	return DOMPurify.sanitize(dirtyHtml, { ALLOWED_TAGS: ['a'], ALLOWED_ATTR: ['target', 'href'] });
}

export function replaceTextUrlsWithTags(dialogTekst: string): string {
	let tekst = dialogTekst;

	while (true) {
		const urlMatch = urlRegex.exec(dialogTekst);

		if (!urlMatch) break;

		const matchedUrl = urlMatch[0];
		const isInternalUrl = matchedUrl.includes('.adeo.no/'); // This could be made more robust if the need arises
		const target = isInternalUrl ? '' : 'target="_blank"';

		const urlTag = `<a ${target} href="${matchedUrl}">${matchedUrl}</a>`;
		tekst = tekst.replace(matchedUrl, urlTag);
	}

	return tekst;
}
