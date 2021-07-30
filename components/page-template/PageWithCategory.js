// libs


// components
import PageContent from './commons/PageContent';
import SortedNavList from "./commons/SortedNavList";
import SortedNavListMobile from "./commons/SortedNavListMobile";


export default function PageWithCategory({ page }) {

    return (
        <div className="flex flex-col lg:flex-row mt-8 ">

            {/* Nav mobile */}
            <div className="lg:hidden">
                <SortedNavListMobile list={page.nav} category={page.page}/>
            </div>

            {/* Nav desktop */}
            {page.nav &&
                <div className="lg:block hidden w-1/3" >
                    <SortedNavList list={page.nav} />
                </div>
            }

            {/* Content */}
            <div className={page.nav ? "lg:w-2/3" : ""}>
                <PageContent blocks={page.blocks} pageName={page.pageName} />

            </div>
        </div>
    );
}
