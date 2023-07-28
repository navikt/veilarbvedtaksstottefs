import { Normaltekst, Undertittel } from 'nav-frontend-typografi';

export const KilderTipsInnhold = () => {
	return (
		<>
			<Undertittel className="blokk-xs">Kilder</Undertittel>
			<Normaltekst>For andre kilder kan du for eksempel skrive:</Normaltekst>
			<ul className="tips__liste">
				<li>
					Referat fra møte med veilederen din
					<br />
					1. januar 20xx
				</li>
				<li>
					Dialogmeldinger i aktivitetsplanen fra
					<br />
					1. til 20. februar 20xx
				</li>
				<li>
					Sluttrapporten fra Tiltaksarrangør AS
					<br />
					1. september 20xx
				</li>
			</ul>
		</>
	);
};
