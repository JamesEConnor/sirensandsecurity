//Generate locale date string by UTC
export var generateDateFromUTC = function(utc:number) {
    var d = new Date(0)
    d.setUTCSeconds(utc)
    return d
}