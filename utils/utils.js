function twoDigits(d) {
    if(0 <= d && d < 10) return "0" + d.toString();
    if(-10 < d && d < 0) return "-0" + (-1*d).toString();
    return d.toString();
}

const Utils = {


    // permalink
    getPagePermalink: (slug = "/", locale) => {

        // origin
        let origin = process.env.NEXTAUTH_URL

        // locale
        locale = locale ? ("/" + locale) : ""

        // full url
        return `${origin}${locale}/${slug}`

    },

    toMysqlFormat(date){
        return date.getFullYear() + "-" + twoDigits(1 + date.getMonth()) + "-" + twoDigits(date.getDate()) + " " + twoDigits(date.getHours()) + ":" + twoDigits(date.getMinutes()) + ":" + twoDigits(date.getSeconds());
    }


}

export default Utils