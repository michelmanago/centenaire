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
            <ul className="pl-0">
                {
                    getSortedPages().map(page => {

                        return (
                            <li className="list-none mb-1" key={page.id}><a className="text-blue-500 underline" href={"/" + page.pageSlug}>{page.pageName}</a></li>
                        )

                    })
                }
            </ul>
        </div>
    )

}