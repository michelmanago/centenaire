// libs


// components
import PageContent from './commons/PageContent';
import SortedNavList from "./commons/SortedNavList";
import SortedNavListMobile from "./commons/SortedNavListMobile";


export default function PageWithCategory({ page }) {

    return (
        <div className="flex flex-col lg:flex-row mt-8 ">

            {/* Nav */}
            <div className="lg:hidden">
                <SortedNavListMobile list={page.nav} />
            </div>

            {/* Nav mobile */}
            {page.nav &&
                <div className=" lg:block hidden   " >
                    <SortedNavList list={page.nav} name={page.page} />
                </div>
            }

            {/* Content */}
            <div className={page.nav ? "lg:w-2/3" : ""}>
                <PageContent blocks={page.blocks} pageName={page.pageName} />

            </div>
        </div>
    );
}
