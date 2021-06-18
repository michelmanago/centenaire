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

    }


}

export default Utils