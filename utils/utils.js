const Utils = {


    // permalink
    getPagePermalink: (slug = "/", locale) => {

        // origin
        let url = new URL(window.location)
        let origin = url.origin

        // locale
        locale = locale ? ("/" + locale) : ""

        // full url
        return `${origin}${locale}/${slug}`

    },


    // DATABASE
    getSQLDatatime(data){
        return data.toISOString().slice(0, 19).replace('T', ' ')
    }


}

export default Utils