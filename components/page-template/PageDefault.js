// libs


// components
import PageContent from './commons/PageContent';


export default function PageDefault({page}) {
    return (
        <div className="">
            {/* Content */}
            <PageContent blocks={page.blocks} pageName={page.pageName}/>
        </div>
    );
}
