// utils
import { getPagesSortedByPosition } from "../../../utils/utils"


export default function SortedNavList({list}){

 

    return (
        <div className="mr-5">
            <ul className="pl-0">
                {
                    getPagesSortedByPosition(list).map(page => {

                        return (
                            <li className="list-none mb-1" key={page.id}><a className="text-blue-500 underline" href={"/" + page.pageSlug}>{page.pageName}</a></li>
                        )

                    })
                }
            </ul>
        </div>
    )

}