import {useState} from 'react';
import Header from '../../../components/header/header';
import CustomEditor from '../../../components/Slate/customEditor';
import {getPageBySlug} from '../../../model/page';

export default function editPage({pageSlug, pageData}) {
    const [pageName, setPageName] = useState(() => (pageData ? pageData.pageName : ''));
    const [newPageSlug, setNewPageSlug] = useState(() => (pageData ? pageData.pageSlug : ''));
    const [blockContent, setBlockContent] = useState(() => (pageData ? pageData.blockcontent : ''))
    return (
        <div>
            <Header />
            <main className="max-w-screen-xl p-4 bg-white sm:mx-auto">
                <div>Edit Page {pageData ? pageData.pageName : pageSlug}</div>

                {pageData && (
                    <div>
                        <div className="flex flex-col">
                            <label htmlFor="name">Nom de page:</label>
                            <input
                                className="border border-black rounded"
                                type="text"
                                id="name"
                                value={pageName}
                                onChange={e => setPageName(e.currentTarget.value)}
                            />
                            <input className="border border-black rounded" type='text' id='slug' value={pageSlug} />
                        </div>

                        <div>
                            <CustomEditor block={blockContent} setContent={setBlockContent} />
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export async function getServerSideProps(context) {
    const {pageSlug} = context.params;
    const pageData = await getPageBySlug(pageSlug);

    return {props: {pageSlug, pageData}};
}
