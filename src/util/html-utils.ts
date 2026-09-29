import DOMPurify from 'dompurify';

const urlRegex = new RegExp(
	/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/,
	'gi'
);

export function purifyUnsafeHtml(dirtyHtml: string): string {
	const sanitizedHtml = DOMPurify.sanitize(dirtyHtml, {
		ALLOWED_TAGS: ['a', 'br'],
		ALLOWED_ATTR: ['target', 'href']
	});
	const template = document.createElement('template');
	template.innerHTML = sanitizedHtml;
	template.content.querySelectorAll('a[target="_blank"]').forEach(link => {
		link.setAttribute('rel', 'noopener noreferrer');
	});
	return template.innerHTML;
}

export function replaceNewLineWithBr(tekst: string): string {
	return tekst.replace(/\n/g, '</br>');
}

export function replaceTextUrlsWithTags(dialogTekst: string): string {
	let tekst = dialogTekst;

	while (true) {
		const urlMatch = urlRegex.exec(dialogTekst);

		if (!urlMatch) break;

		const matchedUrl = urlMatch[0];
		const isInternalUrl = matchedUrl.includes('.adeo.no/'); // This could be made more robust if the need arises
		const target = isInternalUrl ? '' : 'target="_blank" rel="noopener noreferrer"';

		const urlTag = `<a ${target} href="${matchedUrl}">${matchedUrl}</a>`;
		tekst = tekst.replace(matchedUrl, urlTag);
	}

	return tekst;
}
