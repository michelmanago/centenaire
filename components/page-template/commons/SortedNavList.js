// utils
import { getPagesSortedByPosition } from "../../../utils/utils"

//libs
import Link from "next/link"
import Popup from "reactjs-popup"


const contentStyle = {
    background: "#FFF",
    boxShadow: "0 0 2px rgba(0, 0, 0, .2)"
}

export default function SortedNavList({list}){

    return (
        <div className="mr-5">
            <ul className="pl-0 max-w-full">
                {
                    getPagesSortedByPosition(list).map(page => {

                        return (
                            <li className="list-none mb-1" key={page.id}>
                                <Link href={"/" + page.pageSlug}>
                                    <a className="text-blue-500 underline" >
                                        <Popup
                                            trigger={
                                                <span className="inline-block max-w-full truncate">{page.pageName}</span>
                                            }
                                            on={["hover", "focus"]}
                                            position={["right center"]}
                                            contentStyle={contentStyle}
                                        >
                                            <div className="px-3 py-1 font-bold">
                                                {page.pageName}
                                            </div>
                                        </Popup>
                                    </a>
                                </Link>
                            </li>
                        )

                    })
                }
            </ul>
        </div>
    )

}