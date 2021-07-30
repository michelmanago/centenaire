// 

export default function SortedNavList({list}){

    const getSortedPages = () => {

        if(!list) return []


        const sortedPages = [...list]
        sortedPages.sort((a, b) => a.position - b.position)

        return sortedPages

    }

    return (
        <div className="mr-5">
            <ul className="list-disc">
                {
                    getSortedPages().map(page => {

                        return (
                            <li key={page.id}><a className="text-blue-400 underline" href={"/" + page.pageSlug}>{page.pageName}</a></li>
                        )

                    })
                }
            </ul>
        </div>
    )

}