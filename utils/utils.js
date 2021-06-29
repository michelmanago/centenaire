
// DATE
export function twoDigits(d) {
    if(0 <= d && d < 10) return "0" + d.toString();
    if(-10 < d && d < 0) return "-0" + (-1*d).toString();
    return d.toString();
}

// MYSQL
export function toMysqlFormat(date){
    return date.getFullYear() + "-" + twoDigits(1 + date.getMonth()) + "-" + twoDigits(date.getDate()) + " " + twoDigits(date.getHours()) + ":" + twoDigits(date.getMinutes()) + ":" + twoDigits(date.getSeconds());
}

// MATH
export function inRange(x, min, max) {
    return ((x-min)*(x-max) <= 0)
}

// FETCH
export function handleResponse(){

}

// Menu
export function resolveMenuHref(href){
    return href
}

const Utils = {

    toMysqlFormat,
    inRange,
    twoDigits,
    handleResponse,
}

export default Utils