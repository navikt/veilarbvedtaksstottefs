import React from 'react';
import { VedtakData } from '../../utils/types/vedtak';
import { OrNothing } from '../../utils/types/ornothing';

export function Historikk(props: {vedtakHistorikk: OrNothing<VedtakData []>}) {
   if (!props.vedtakHistorikk || props.vedtakHistorikk.length === 0) {
       return (
       <div className="panel">
           Finns ingen historikk
       </div>

        );
   }

   return (
     <div className="panel">
         {props.vedtakHistorikk.map(historisktVedtak => <h1 key={historisktVedtak.sistOppdatert}>Historiskt vedtak</h1>)}
     </div>
   );
}