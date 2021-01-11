import React from 'react';
import dialogMsgBilde from './dialog-msg.svg';
import './dialog-section-minified.less';

export function DialogSectionMinified() {
	return (
		<div className="dialog-section-minified">
			<img
				src={dialogMsgBilde}
				alt="Ikon: Du har ingen nye meldinger"
				className="dialog-section-minified__dialog-img"
			/>
		</div>
	);
}
