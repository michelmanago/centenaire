// libs
import { useRouter } from "next/router"
import React from "react"


const LanguageSwitcher = () => {
    

    // hooks
    const { locales, locale } = useRouter()

    // utils
    const removeLocaleFromPathname = pathname => pathname.replace(new RegExp(`\/(?:${locales.join("|")})/`, "i"), "/")

    const redirectToTranslatedPage = (url, selectedLocale) => {

        let originWithNewLocale = url.origin + "/" + selectedLocale
        let cleanedPathname = removeLocaleFromPathname(url.pathname)
        let newUrl = originWithNewLocale + cleanedPathname

        return newUrl
    }
    

    // methods
    const onSelectLangue = event => {
        
        // value
        let selectedLocale = event.target.value

        // has selected the current locale (useless)
        if(selectedLocale === locale){
            return
        }

        let url = new URL(window.location)

        // switch current page to selected locale
        let newUrl = redirectToTranslatedPage(url, selectedLocale)

        // change page
        window.location = newUrl

    }

    return (
        <div className="border py-3 flex justify-end">

            <select defaultValue={locale} onChange={onSelectLangue} className="mr-5 border px-2 py-3 rounded">
                {
                    locales.map(locale => (
                        <option key={locale} value={locale}>{locale.toUpperCase()}</option>
                    ))
                }
            </select>

        </div>
    )
}

export default LanguageSwitcher