import { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { delay } from '../../util/promise-utils';
import { Alert, AlertProps } from '@navikt/ds-react';
import './varsel-toast.less';

interface VarselToastProps {
	type: AlertProps['variant'];
	durationMs: number;
	onHide?: () => void;
}

export function VarselToast(props: PropsWithChildren<VarselToastProps>) {
	const [hide, setHide] = useState(false);
	const [fadeClass, setFadeClass] = useState<'fade-in' | 'fade-out'>('fade-out');

	const { onHide, durationMs } = props;

	const fadeIn = useCallback(() => {
		setFadeClass('fade-in');
	}, []);

	const fadeOut = useCallback(() => {
		setFadeClass('fade-out');
	}, []);

	const unmount = useCallback(() => {
		setHide(true);
		if (onHide) {
			onHide();
		}
	}, [onHide]);

	useEffect(() => {
		Promise.resolve()
			.then(delay(300))
			.then(fadeIn)
			.then(delay(durationMs))
			.then(fadeOut)
			.then(delay(500))
			.then(unmount);
	}, [durationMs, fadeIn, fadeOut, unmount]);

	if (hide) {
		return null;
	}

	return (
		<div className={'toast'} role={'alert'}>
			<Alert size="small" variant={props.type} className={fadeClass} role="alert">
				{props.children}
			</Alert>
		</div>
	);
}
