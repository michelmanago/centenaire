// libs
import Link from "next/link"

// icons
import IconPrev from "../icons/IconPrev"
import IconNext from "../icons/IconNext"
import { useRouter } from "next/router"


export default function ListMediaPagination({pagination, changePaginationPage}){

    // router
    const {query} = useRouter()

    // methods
    const goNextPage = () => changePaginationPage(pagination.page + 1)
    const goPrevPage = () => changePaginationPage(pagination.page - 1)
    const jumpAt = pageOffset => changePaginationPage(pageOffset)

    // others
    const currentPage = pagination.page
    const canGoPrevPage = (currentPage > 0)
    const canGoNextPage = (currentPage + 1 < pagination.page_count)

    return (
        <div className="my-2 flex justify-center items-center">

            {/* Pagination */}
            <div className="flex items-center">

                {/* Prev */}
                <ArrowButton active={canGoPrevPage} onClick={goPrevPage}>
                    <IconPrev/>
                </ArrowButton>

                {/* Pages */}

                {
                    Array(pagination.page_count).fill(true).map((page, pageIndex) => {

                        const distance = Math.abs(pagination.page - pageIndex)

                        if(distance > 3) return ""

                        const isCurrent = pageIndex === pagination.page
                        const currentStyles = `bg-gray-900 text-white`
                        const notCurrentStyles = `hover:bg-gray-300`

                        if(isCurrent){
                            return (
                                <span
                                key={"page-" + pageIndex}
                                    className={`inline-flex justify-center items-center rounded mx-1 w-8 h-8 ${isCurrent ? currentStyles : notCurrentStyles}`}
                                >{pageIndex + 1}</span>
                            )
                        }

                        return (
                            <Link
                                key={"page-" + pageIndex}
                                href={{
                                    pathname: "/admin/media",
                                    query: Object.assign( {
                                        offset: pageIndex,
                                    },
                                        query.accepts ? {accepts: query.accepts} : {},
                                        query.page ? {page: query.page} : {},
                                    )
                                }}
                            >
                                <a
                                    className={`inline-flex justify-center items-center rounded mx-1 w-8 h-8 ${isCurrent ? currentStyles : notCurrentStyles}`}
                                >{pageIndex + 1}</a>
                            </Link>
                        )

                    })
                }



                {/* Next */}
                <ArrowButton active={canGoNextPage} onClick={goNextPage}>
                    <IconNext/>
                </ArrowButton>

            </div>
        </div>
    )

}

const ArrowButton = ({onClick, children, active}) => {


    const activeStyles = `hover:opacity-50`
    const disabledStyles = `opacity-10 cursor-not-allowed`

    return (
        <button disabled={!active} type="button" onClick={onClick} className={`px-3 py-1 text-red-gray-500 ${active ? activeStyles : disabledStyles}`}>
            {children}
        </button>
    )
}