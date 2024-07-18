import { List } from '@navikt/ds-react';

export const KilderTipsInnhold = () => {
	return (
		<List size="small" title="Kilder" description="For andre kilder kan du for eksempel skrive:">
			<List.Item>Referat fra møte med veilederen din 1. januar 20xx</List.Item>
			<List.Item>Dialogmeldinger i aktivitetsplanen fra 1. til 20. februar 20xx</List.Item>
			<List.Item>Sluttrapporten fra Tiltaksarrangør AS 1. september 20xx</List.Item>
		</List>
	);
};
