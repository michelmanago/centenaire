// libs

import { useState } from "react"
import { CATEGORIES } from "../../utils/parameters"

export default function ListPage({pages}){

    
    // states
    const [search, setSearch] = useState("")

    // methods

    const onSearch = event => {

        setSearch(event.target.value)

    }

    // others
    const filteredPages = search ? pages.filter(p => p.pageName.match(new RegExp(search, "i"))) : pages
    const categories = Object.values(CATEGORIES)

    return (
        <main className="max-w-screen-xl p-4 bg-white md:mx-auto">

            {/* H1 */}
            <div className="mt-5">
                <h1 className="inline-block text-3xl font-semibold mb-5">Liste des pages</h1>
                <a className="ml-3 inline-block bg-gray-100 border rounded text-blue-500 border-blue-500 px-3 py-1 font-medium" href="/admin/page/create">Ajouter</a>
            </div>

            {/* Filters */}
            <div className="my-2">

                {/* Count */}
                <span>Nombre de pages ({pages.length})</span>

                {/* Filter by category */}
                <span className="ml-5">
                    Filtrer par : 
                    {
                        categories.map((cat, index) => (
                            <span key={cat}>
                                {index !== 0 ? " - " : ""}
                                <a className="mx-2 underline" href={`/admin/page?cat=${cat}`}>{cat}</a>
                            </span>
                        ))
                    }
                </span>

            </div>

            {/* Search */}
            <div className="mb-5">
                <label className="block font-medium mb-2" htmlFor="search">Rechercher une page : </label>
                <input 
                    className="block border bg-gray-100 rounded w-full py-3 px-2" 
                    placeholder="Titre de la page" 
                    value={search} 
                    onChange={onSearch}
                    type="text" 
                    id="search" 
                />
            </div>

            {/* List */}
            { pages && 
                <table className="table-auto w-full border">

                    <thead className="">
                        <tr>
                            <ColHead className="px-3" label="Titre"/>
                            <ColHead label="Catégorie"/>
                            <ColHead label="Auteur"/>
                            <ColHead label="Date de création"/>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        filteredPages.map(page => {

                            const editLink = `/admin/page/${page.original_id}`
                            const category_link = page.page ? `/admin/category/${page.page}` : ""

                            return (
                                <tr key={page.id}>
                                    <ColBody className="px-3"><a className="text-blue-500 hover:underline" href={editLink}>{page.pageName}</a></ColBody>
                                    <ColBody><a className="underline" href={category_link}>{page.page}</a></ColBody>
                                    <ColBody>{page.author}</ColBody>
                                    <ColBody>{page.created_at ? new Date(page.created_at).toLocaleString() : ""}</ColBody>
                                </tr>  
                            )

                        })
                    }
                    </tbody>
                </table>
            }

        </main>
    )

}

const colStyles = {
    height: 75
}

const ColHead = ({label, className = ""}) => <th style={colStyles} className={"text-left border-t border-b py-2 align-top  " + className}>{label}</th>
const ColBody = ({children, className = ""}) => <td style={colStyles} className={"h-12 align-top  " + className}>{children}</td>