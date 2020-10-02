import React, { PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';
import { useEventListener } from '../../utils/hooks';
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
    const toastRef = useRef<HTMLDivElement | null>(null);
    const [isMounted, setMounted] = useState(true);
    const [isFixedPosition, setFixedPosition] = useState(false);
    const [fadeClass, setFadeClass] = useState<'fade-in' | 'fade-out'>('fade-out');
    const [offsetTop, setOffsetTop] = useState<number | null>(null);

    const {onHide, durationMs} = props;

    useEffect(() => {
        if (toastRef.current && !offsetTop) {
            setOffsetTop(toastRef.current.offsetTop);
        }
    }, [toastRef, offsetTop]);


    useEventListener('scroll', event => {
        if (toastRef.current && offsetTop) {
            if (window.scrollY > offsetTop) {
                setFixedPosition(true);
            } else {
                setFixedPosition(false);
            }
        }
    }, [offsetTop]);


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
            setMounted(false);
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

    if (!isMounted) {
        return null;
    }

    return (
        <div ref={toastRef} className={cls('toast',(isFixedPosition ? 'fixed-position' : undefined))}>
            <AlertStripe type={props.type} className={fadeClass}>{props.children}</AlertStripe>
        </div>
    );
}
