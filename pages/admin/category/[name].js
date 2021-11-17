// models
import {getMenu} from '../../../model/menu';

// libs
import Header from '../../../components/header/header';
import Head from 'next/head';
import {useState} from 'react';
import SortableTree, {getVisibleNodeCount} from 'react-sortable-tree';
import DefaultErrorPage from 'next/error';
import {getSession, useSession} from 'next-auth/client';

// parameters
import {getAllPages} from '../../../model/page';
import {useRouter} from 'next/router';

const format = page => {
    return {
        title: page.pageName,
        id: page.id,
        pageSlug: page.pageSlug,
        original_id: page.original_id,
    };
};

const getSortedFormatedPageList = (pages, defaultLocale) => {
    // filter default locale
    let list = pages.filter(p => p.language === defaultLocale);

    // sort by position
    list.sort((a, b) => a.position - b.position);

    // format data
    list = list.map(page => format(page));

    return list;
};

// styles
const containerStyle = {paddingBottom: 80};
const bottomBarStyle = {height: 80};

export default function AdminCategory({pages, menu, categoryName}) {
    const {defaultLocale} = useRouter();

    // only store default language pages (only fr)
    const [treedata, setTreedata] = useState(pages ? getSortedFormatedPageList(pages, defaultLocale) : []);

    // listeners
    const onMoveNode = nextTreeData => setTreedata(nextTreeData);

    const onSubmit = () => {
        // form
        let form = pages.map(page => {
            // Maybe do not push into array if index not found (shoudnt happen)
            let newPosition = treedata.findIndex(t => t.original_id === page.original_id);

            return {
                id: page.id,
                position: newPosition,
            };
        });

        // PUT new positions
        fetch('/api/page', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(response.statusText);
                }
            })
            .then(body => {
                // force reload
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
                alert('NOT OK');
            });
    };

    // others
    const pagesEmpty = !pages || !pages.length;
    const count = getVisibleNodeCount({treeData: treedata});

    // render

    let pageContent = '';

    if (pagesEmpty) {
        pageContent = <p className="">Il n'y a pas de page dans cette catégorie.</p>;
    } else {
        pageContent = (
            <div style={containerStyle}>
                {/* Submit */}
                <div
                    style={bottomBarStyle}
                    className="fixed bottom-0 left-0 z-10 flex items-center justify-end w-full pr-5 bg-white border-2"
                >
                    <button
                        type="button"
                        onClick={onSubmit}
                        className="px-3 py-3 font-semibold text-white bg-blue-600 rounded cursor-pointer hover:bg-blue-700"
                    >
                        Sauvegarder le nouvel ordre
                    </button>
                </div>

                {/* Category name */}
                <h1 className="mb-5 text-4xl font-semibold capitalize">{categoryName}</h1>

                <h2 className="text-2xl">Ordre d'affichage des pages : </h2>
                {/* Tree */}
                <div style={{height: count * 62}}>
                    <SortableTree
                        onChange={onMoveNode}
                        treeData={treedata}
                        maxDepth={1}
                        generateNodeProps={({node}) => {
                            const permalien = node.pageSlug.startsWith('/') ? node.pageSlug : '/' + node.pageSlug;
                            const editLink = `/admin/page/${node.original_id}`;

                            return {
                                buttons: [
                                    <a target="_blank" className="pr-2 text-gray-600 underline" href={permalien}>
                                        Voir
                                    </a>,
                                    <a target="_blank" className="pr-2 text-blue-600 underline" href={editLink}>
                                        Editer
                                    </a>,
                                ],
                            };
                        }}
                    />
                </div>
            </div>
        );
    }

    return (
        <>
            <Head>
                <title>Admin - Catégories - {categoryName}</title>
                
            </Head>
            {menu && <Header menu={menu.data} />}
            <main className="max-w-screen-xl p-4 bg-white md:mx-auto">{pageContent}</main>
        </>
    );
}

export async function getServerSideProps(context) {
    const {req} = context;
    const session = await getSession({req});

    if (!session) {
        return {
            redirect: {
                permanent: false,
                destination: `/login?redirect=admin/category`,
            },
        };
    }

    const {name} = context.params;

    const menu = await getMenu(context.locale);
    const pages = await getAllPages(null, name);

    return {
        props: {
            menu: menu,
            pages,
            categoryName: name,
        },
    };
}
