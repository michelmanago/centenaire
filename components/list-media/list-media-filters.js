// libs
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import fetchPagesByName from "../../utils/fetch/fetchPagesByName"

// styles
const mediaFilerItemActiveStyles = `bg-purple-300 text-gray-100`

// utils
import { MEDIA_TYPES } from "../../utils/utils-media"
import SelectSearch from "../select-search/select-search"
const allMedia = Object.values(MEDIA_TYPES)

export default function ListMediaFilters(){

    // hooks
    const router = useRouter()
    const {query} = router

    // utils
    const isFilteringNonAssociated = !(typeof query.with_no_page === "undefined")

    // states
    const [search, setSearch] = useState("")
    const [results, setResults] = useState([])
    const [selected, setSelected] = useState(null)

    // methods
    const searchPages = async (name) => {
        const res =  await fetchPagesByName(name)
        setResults(res)
    }

    const onFilterNonAssociated = () => {
        
        if(isFilteringNonAssociated){
            router.push({
                pathname: `/admin/media`,
                query: Object.assign({
                    accepts: query.type,
                }, query.page ? {page: query.page} : {})
            })
        } else {
            router.push({
                pathname: `/admin/media`,
                query: Object.assign({
                    accepts: query.type,
                    with_no_page: ""
                }, query.page ? {page: query.page} : {})
            })
        }
    }

    const onSearchByName = value => {

        // update state
        setSearch(value)

        // call api
        if(value){
            searchPages(value)
        } 
        
        // reset page filter
        else {
            setResults([])
            setSelected(null)
        }


    }

    const onSelectPage = page => {

        setSelected(page)
        setSearch(page.pageName)
    }

    return (
        <div>
            {/* Media type */}
            <div className="flex items-center">
                <p className="font-medium mr-5">Restreindre le type de média</p>
                <div>
                    {
                        allMedia.map(type => {

                            const isActive = query.accepts === type

                            // add accepts filter to other filter, but remove pagination
                            const enablingHref = {
                                pathname: `/admin/media`,
                                query: Object.assign({
                                    accepts: type,
                                }, query.page ? {page: query.page} : {})
                            }

                            // keep others filter but remove accepts filter
                            const disablingHref = {
                                pathname: `/admin/media`,
                                query: Object.assign({}
                                , query.page ? {page: query.page} : {}
                                )
                            }

                            return (
                                <Link
                                    key={type}
                                    href={isActive ? disablingHref : enablingHref}
                                >
                                    <a className={`border hover:bg-purple-300 hover:text-gray-100 border-purple-300  px-3 mr-4 py-1 rounded ${isActive ? mediaFilerItemActiveStyles : "text-purple-400"}`}>{type}</a>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>

            {/* Page association */}
            {
                !isFilteringNonAssociated && (
                    <div className="flex items-center mt-4">
                        <p className="font-medium mr-5">Restreindre par page</p>
                        <div className="border w-1/3">
                            <SelectSearch
                                value={search}
                                setValue={onSearchByName}
                                results={results}
                                getKey={({id}) => id}
                                onSelect={onSelectPage}
                                renderResult={item => (
                                    <p className="text-md">{item.pageName}</p>
                                )}
                                inputPlaceholder="Rechercher le nom d'une page"
                            
                            />
                        </div>
                        {
                            selected && (
                                <Link
                                    href={{
                                        pathname: "/admin/media",
                                        query: Object.assign({
                                            page: selected.id,
                                        }, query.accepts ? {accepts: query.accepts} : {})
                                    }}
                                >
                                    <a className="border border-blue-400 rounded-sm text-blue-400 hover:bg-blue-400 hover:text-white px-2 py-1 text-sm ml-3 max-w-xs inline-block truncate">Filtrer les media de <strong>{selected.pageName}</strong></a>
                                </Link>
                            )
                        }

                    </div>
                )
            }

            {/* Non associated */}
            <div className="flex items-center mt-4">
                <label htmlFor="checkbox_filter_non_associated" className="font-medium mr-5">Afficher seulement les medias non associés</label>
                <div>
                    <input 
                        id="checkbox_filter_non_associated"
                        type="checkbox" 
                        checked={isFilteringNonAssociated}
                        onChange={onFilterNonAssociated}
                    />
                </div>
            </div>


        </div>
    )

}