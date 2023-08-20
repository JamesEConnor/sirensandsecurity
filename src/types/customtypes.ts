export type incidentType = {
    title: string,
    date: number,
    category: string,
    description: string,
    loc: {
        name: string,
        coords: Array<number>
    },
    media: Array<{name:string, url:string}>
};

export type incidentsResultType = Array<Array<string|incidentType>>;

export type searchUpdateFunctionType = (
    id?:string,
    title?:string,
    category?:string,
    startDate?:string,
    endDate?:string
) => void

export type loadFunctionProps = {
    id:string,
    keyphrase:string,
    category:string,
    startDate?:Date,
    endDate?:Date,
    sort:string
}

export type loadReturnFunction = (
    query_str:string,
    incidents:incidentsResultType
)=>void


export const isSSR = (typeof window === "undefined");