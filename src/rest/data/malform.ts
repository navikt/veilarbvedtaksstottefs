export enum MalformType {
    NB = 'NB',
    NN = 'NN'
}

export interface MalformData {
    malform: MalformType | null;
}
