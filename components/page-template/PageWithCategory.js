// libs


// components
import PageContent from './commons/PageContent';
import SortedNavList from "./commons/SortedNavList"

export default function PageWithCategory({page}) {
    
    return (
        <div className="flex">

            {/* Nav */}
            {page.nav  && <SortedNavList list={page.nav} name={page.page}/>}

            {/* Content */}
            <div className={page.nav ? "w-2/3" : ""}>
                <PageContent blocks={page.blocks} pageName={page.pageName}/>
            </div>
        </div>
    );
}
