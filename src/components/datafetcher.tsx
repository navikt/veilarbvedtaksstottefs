import React, { useEffect } from 'react';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { useFetchStore } from '../stores/fetch-store';
import { hasAnyFailed, isAnyNotStartedOrPending, isNotStarted } from '../rest/utils';

export function DataFetcher (props: {fnr: string, children: any}) {
    const { underOppfolging, features, malform, vedtak } = useFetchStore();

    useEffect(() => {
        if (isNotStarted(vedtak)) {
            vedtak.fetch({ fnr: props.fnr });
        }

        if (isNotStarted(underOppfolging)) {
            underOppfolging.fetch({ fnr: props.fnr });
        }

        if (isNotStarted(malform)) {
            malform.fetch({ fnr: props.fnr });
        }

        if (isNotStarted(features)) {
            features.fetch(null);
        }
    }, [vedtak, underOppfolging, malform, features]);

    if (isAnyNotStartedOrPending([vedtak, malform, underOppfolging, features])) {
        return <NavFrontendSpinner className="vedtaksstotte-spinner" type="XL"/>;
    } else if (hasAnyFailed([vedtak, malform, underOppfolging, features])) {
        return (
            <AlertStripeFeil className="vedtaksstotte-alert">
                Det oppnås for tiden ikke kontakt med alle baksystemer.
                Vi jobber med å løse saken. Vennligst prøv igjen senere.
            </AlertStripeFeil>
        );
    }

    return props.children;
}
