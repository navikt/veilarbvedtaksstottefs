import React from 'react';
import { Normaltekst, Systemtittel, Undertittel } from 'nav-frontend-typografi';
import './tips.less';

export const Tips = () => {
    return (
    	<div className="tips">
		    <Systemtittel className="tips_tittel">Tips</Systemtittel>
		    <div className="tips__bolk">
			    <Undertittel>Kilder</Undertittel>
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
				    <li>Legeerklæringen 1. november 20xx</li>
			    </ul>
		    </div>

		    <div className="tips__bolk">
			    <Undertittel>Begrunnelse</Undertittel>
			    <Normaltekst>
				    Begrunnelse må skrives for alle innsatsgrupper, bortsett fra standard innsats.
				    Når du skal skrive begrunnelse og gjøre vurderingen din, er følgende spørsmål nyttige å stille:
			    </Normaltekst>
			    <ul className="tips__liste">
				    <li>Hva tenker denne personen selv om mulighetene sine til å være eller komme i jobb?</li>
				    <li>Hvilke typer arbeid ønsker denne personen seg og hva er realistisk ut fra dagens arbeidsmarked?</li>
				    <li>Hva slags veiledning trenger denne personen?</li>
				    <li>Er arbeidsevnen nedsatt, og hvorfor?</li>
				    <li>
					    Trenger denne personen:
					    <ul>
						    <li>yrkes- og/eller karriereveiledning?</li>
						    <li>arbeidsrettede aktiviteter og tiltak?</li>
						    <li>behandling eller oppfølging fra helsevesenet?</li>
					    </ul>
				    </li>
				    <li>Hva har dere blitt enige om?</li>
			    </ul>
		    </div>

	    </div>
    );
};
