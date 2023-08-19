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

export type searchUpdateFunctionType = (
    id?:string,
    title?:string,
    category?:string,
    startDate?:string,
    endDate?:string
) => void


export const isSSR = (typeof window === "undefined");