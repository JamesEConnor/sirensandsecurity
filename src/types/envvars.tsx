import { Fragment, ReactFragment } from "react";

export const BASE_PATH =
    (process.env.NODE_ENV == "development") ?
    "" :
    "/sirensandsecurity";

export function PATH(path:string) {
    return BASE_PATH + path;
}