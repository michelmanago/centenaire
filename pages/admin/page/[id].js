//libs
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import DefaultErrorPage from 'next/error';
import Head from 'next/head';
import {getSession, useSession} from 'next-auth/client';

// models
import {getMenu} from '../../../model/menu';
import {getPageTranslations} from '../../../model/page';

// components
import Header from '../../../components/header/header';
import PageEditor from '../../../components/page-editor/page-editor';

// utils
import {toMysqlFormat} from '../../../utils/utils';
import {bulkAttributePageToMedia} from '../../../utils/fetch/attributePageToMedia';
import { getAllCategories } from '../../../model/category';

// utils

export default function PageEditorUpdate({menu, pageTranslations, categories}) {
    if (!pageTranslations || (Array.isArray(pageTranslations) && !pageTranslations.length)) {
        return <DefaultErrorPage statusCode={404} />;
    }

    // states
    const router = useRouter();

    // router
    const {defaultLocale} = useRouter();

    // methods
    const onSubmit = (formPages, attributedMedia) => {
        // add last_modified

        const originalPage = pageTranslations.find(page => page.language === router.defaultLocale);

        const now = toMysqlFormat(new Date());
        formPages = formPages.map(formPagesItem => ({
            ...formPagesItem,
            last_modified: now,
        }));

        fetch('/api/page', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formPages),
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(response.statusText);
                }
            })
            .then(async pages => {
                await bulkAttributePageToMedia(originalPage.id, attributedMedia);

                return pages;
            })
            .then(body => {
                // do not prevent from leaving page
                window.onbeforeunload = null;

                // force reload
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
                alert('NOT OK');
            });
    };

    return (
        <>
            <Head>
                <title>Edition de page - {pageTranslations[0] && pageTranslations[0].pageName}</title>
                
            </Head>

            {menu && <Header menu={menu.data} />}
            <main className="bg-white">
                {pageTranslations && pageTranslations.length && (
                    <PageEditor editedPages={pageTranslations} onFormSubmitted={onSubmit} categories={categories}/>
                )}
            </main>
        </>
    );
}

export async function getServerSideProps(context) {
    const {req} = context;
    const session = await getSession({req});

    // menu
    const menu = await getMenu(context.locale);

    // current page edited
    const {id} = context.params;
    const pageTranslations = await getPageTranslations(id);
    const categories = await getAllCategories()

    if (!session) {
        return {
            redirect: {
                permanent: false,
                destination: `/login?redirect=admin/page/${id}`,
            },
        };
    }

    return {
        props: {
            menu: menu,
            pageTranslations,
            categories,
        },
    };
}
