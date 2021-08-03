// utils
import { getPagesSortedByPosition } from "../../../utils/utils"


export default function SortedNavList({list}){

 

    return (
        <div className="w-1/3 mr-5">
            <ul className="list-disc">
                {
                    getPagesSortedByPosition(list).map(page => {

                        return (
                            <li key={page.id}><a className="text-blue-400 underline" href={"/" + page.pageSlug}>{page.pageName}</a></li>
                        )

                    })
                }
            </ul>
        </div>
    )

}