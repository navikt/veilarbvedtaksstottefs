import React, { PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';
import AlertStripe, { AlertStripeType } from 'nav-frontend-alertstriper';
import './varsel-toast.less';
import cls from 'classnames';
import { delay } from '../../utils/promise-utils';

interface VarselToastProps {
    type: AlertStripeType;
    durationMs: number;
    onHide?: () => void;
}

export function VarselToast(props: PropsWithChildren<VarselToastProps>) {
    const [hide, setHide] = useState(false);
    const [fadeClass, setFadeClass] = useState<'fade-in' | 'fade-out'>('fade-out');

    const {onHide, durationMs} = props;

    const fadeIn = useCallback(
        () => {
                setFadeClass('fade-in');
        }, []
    );

    const fadeOut = useCallback(
        () => {
                setFadeClass('fade-out');
        },
        []
    );

    const unmount = useCallback(
        () => {
            setHide(true);
            if (onHide) {
                onHide();
            }
        }, [onHide]
    );

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
        <div className={'toast'}>
            <AlertStripe type={props.type} className={fadeClass}>{props.children}</AlertStripe>
        </div>
    );
}
