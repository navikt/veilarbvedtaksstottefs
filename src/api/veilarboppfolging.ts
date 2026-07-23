import TilgangTilBrukersKontor from '../util/type/tilgang-til-brukers-kontor';
import { AxiosPromise } from 'axios';
import { axiosInstance } from './utils';

export default interface OppfolgingData {
	reservasjonKRR: boolean;
	underOppfolging: boolean;
	inaktivIArena: boolean;
}

interface OppfolgingStatusGraphQLData {
	brukerStatus: {
		krr?: { reservertIKrr: boolean } | null;
		arena?: { inaktivIArena: boolean } | null;
	} | null;
	oppfolging?: { erUnderOppfolging?: boolean | null } | null;
}

const HENT_OPPFOLGING_STATUS_QUERY = `
    query HentOppfolgingStatus($fnr: String!) {
        brukerStatus(fnr: $fnr) {
            krr {
                reservertIKrr
            }
            arena {
                inaktivIArena
            }
        }
        oppfolging(fnr: $fnr) {
            erUnderOppfolging
        }
    }
`;

export function fetchOppfolging(fnr: string): AxiosPromise<OppfolgingData> {
	return axiosInstance
		.post<{ data: OppfolgingStatusGraphQLData }>(`/veilarboppfolging/api/graphql`, {
			query: HENT_OPPFOLGING_STATUS_QUERY,
			variables: { fnr }
		})
		.then(res => ({
			...res,
			data: {
				reservasjonKRR: res.data.data.brukerStatus?.krr?.reservertIKrr ?? false,
				underOppfolging: res.data.data.oppfolging?.erUnderOppfolging ?? false,
				inaktivIArena: res.data.data.brukerStatus?.arena?.inaktivIArena ?? false
			}
		}));
}

export function fetchTilgangTilBrukersKontor(fnr: string): AxiosPromise<TilgangTilBrukersKontor> {
	return axiosInstance.post(`/veilarboppfolging/api/v3/oppfolging/hent-veilederTilgang`, { fnr });
}
