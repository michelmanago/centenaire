import { useRouter } from "next/router"
import React, { Component } from "react"


function boutonSelectLien({ list }) {

    const getSortedPages = () => {

        if(!list) return []


        const sortedPages = [...list]
        sortedPages.sort((a, b) => a.position - b.position)

        return sortedPages

    }

    // methods
    const onSelectLangue = event => {
        // value
        let pageName = event.target.value
        const found = list.find(element => element.pageName === pageName);
        let url = new URL(window.location)
        let originWithNewUrl = url.origin + "/" + found.pageSlug
        let newUrl = originWithNewUrl

        // change page
        window.location = newUrl

    }

    const lists = list.map((page) =>
        <li >
            {page.pageName}
        </li>)

    return (
        <select className="mb-8 mr-5 border px-2 py-3 rounded" onChange={onSelectLangue} >
            {
                getSortedPages().map(page => (
                    <option key={page} value={page.pageName}>
                        {page.pageName}


                    </option>
                ))
            }
        </select>
    );


}

export default boutonSelectLien;

