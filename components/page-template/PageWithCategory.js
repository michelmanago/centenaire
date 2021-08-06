// libs


// components
import PageInfo from '../page-info/PageInfo';
import PageContent from './commons/PageContent';
import SortedNavList from "./commons/SortedNavList";
import SortedNavListMobile from "./commons/SortedNavListMobile";


export default function PageWithCategory({ page }) {

    return (
        <div className="flex flex-col lg:flex-row mt-8">

            {/* Sidebar */}
            <div className="lg:w-1/3 w-full">
                {/* Nav mobile */}
                <div className="lg:hidden">
                    <SortedNavListMobile list={page.nav} category={page.page}/>
                </div>

                {/* Nav desktop */}
                {page.nav &&
                    <div className="lg:block hidden" >
                        <SortedNavList list={page.nav} />
                    </div>
                }

                {/* Information */}
                <PageInfo author={page.author} media={page.associated_media} created_at={page.created_at} last_modified={page.last_modified} source={page.source}/>

            </div>

            {/* Content */}
            <div className={page.nav ? "lg:w-2/3" : ""}>
                <PageContent blocks={page.blocks} pageName={page.pageName} />

            </div>
        </div>
    );
}
