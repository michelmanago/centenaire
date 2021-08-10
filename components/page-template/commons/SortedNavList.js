// utils
import { getPagesSortedByPosition } from "../../../utils/utils"

//libs
import Link from "next/link"


export default function SortedNavList({list}){

 

    return (
        <div className="mr-5">
            <ul className="pl-0">
                {
                    getPagesSortedByPosition(list).map(page => {

                        return (
                            <li className="list-none mb-1" key={page.id}>
                                <Link href={"/" + page.pageSlug}>
                                    <a className="text-blue-500 underline" >{page.pageName}</a>
                                </Link>
                            </li>
                        )

                    })
                }
            </ul>
        </div>
    )

}