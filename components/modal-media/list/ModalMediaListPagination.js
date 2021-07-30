// icons
import IconPrev from "../../icons/IconPrev"
import IconNext from "../../icons/IconNext"


export default function ModalMediaListPagination({pagination, changePaginationPage}){

    // methods
    const goNextPage = () => changePaginationPage(pagination.page + 1)
    const goPrevPage = () => changePaginationPage(pagination.page - 1)

    // others
    const currentPage = pagination.page
    const canGoPrevPage = (currentPage > 0)
    const canGoNextPage = (currentPage < pagination.page_count)

    return (
        <div className="mt-2 flex justify-center items-center">

            {/* Pagination */}
            <div className="flex items-center">
                
                {/* Prev */}
                <ArrowButton active={canGoPrevPage} onClick={goPrevPage}>
                    <IconPrev/>
                </ArrowButton>

                {/* Current */}
                <span className="select-none inline-flex justify-center items-center text-sm mx-6 bg-gray-500 w-8 h-8 rounded text-white font-medium">{pagination.page + 1}</span>


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