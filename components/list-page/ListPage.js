// libs
import {useState} from 'react';
import Link from 'next/link';

// utils

// icons
import IconOpenNew from '../icons/IconOpenNew';

export default function ListPage({pages, categories}) {
    // states
    const [search, setSearch] = useState('');

    // methods

    const onSearch = event => {
        setSearch(event.target.value);
    };

    // others
    const filteredPages = search ? pages.filter(p => p.pageName.match(new RegExp(search, 'i'))) : pages;
    const thereIsNoPages = !pages || (pages && !pages.length);

    return (
        <main className="max-w-screen-xl p-4 bg-white md:mx-auto">
            {/* H1 */}
            <div className="mt-5">
                <h1 className="inline-block mb-5 text-3xl font-semibold">Liste des pages</h1>
                <Link href="/admin/page/create">
                    <a className="inline-block px-3 py-1 ml-3 font-medium text-blue-500 bg-gray-100 border border-blue-500 rounded">
                        Ajouter
                    </a>
                </Link>
            </div>

            {/* Filters */}
            <div className="my-2">
                {/* Count */}
                {<span>Nombre de pages ({thereIsNoPages ? '0' : pages.length})</span>}

                {/* Filter by category */}
                <span className="ml-5">
                    Filtrer par :
                    {categories.map((cat, index) => (
                        <span key={cat.id}>
                            {index !== 0 ? ' - ' : ''}
                            <Link href={`/admin/page?cat=${cat.title}`}>
                                <a className="mx-2 underline">{cat.title}</a>
                            </Link>
                        </span>
                    ))}
                </span>
            </div>

            {/* Search */}
            <div className="mb-5">
                <label className="block mb-2 font-medium" htmlFor="search">
                    Rechercher une page :{' '}
                </label>
                <input
                    className="block w-full px-2 py-3 bg-gray-100 border rounded"
                    placeholder="Titre de la page"
                    value={search}
                    onChange={onSearch}
                    type="text"
                    id="search"
                />
            </div>

            {/* List */}
            {pages && (
                <table className="w-full border table-auto">
                    <thead className="">
                        <tr>
                            <ColHead className="px-3" label="Titre" />
                            <ColHead label="Catégorie" />
                            <ColHead label="Auteur" />
                            <ColHead label="Date de création" />
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPages.map(page => {
                            const editLink = `/admin/page/${page.id}`;
                            const category_link = page.page ? `/admin/category/${page.page}` : '';

                            return (
                                <tr key={page.id}>
                                    <ColBody className="px-3">
                                        <span className="inline-flex items-center">
                                            <a className="mr-2 text-blue-500 hover:underline" href={editLink}>
                                                {page.pageName}
                                            </a>
                                            <a
                                                href={`/${page.pageSlug}`}
                                                target="_blank"
                                                className="text-gray-900 hover:opacity-50"
                                            >
                                                <IconOpenNew size="16px" />
                                            </a>
                                        </span>
                                    </ColBody>
                                    <ColBody>
                                        <Link href={category_link}>
                                            <a className="underline">{page.page}</a>
                                        </Link>
                                    </ColBody>
                                    <ColBody>{page.author}</ColBody>
                                    <ColBody>
                                        {page.created_at ? new Date(page.created_at).toLocaleString() : ''}
                                    </ColBody>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </main>
    );
}

const colStyles = {
    height: 75,
};

const ColHead = ({label, className = ''}) => (
    <th style={colStyles} className={'text-left border-t border-b py-2 align-top  ' + className}>
        {label}
    </th>
);
const ColBody = ({children, className = ''}) => (
    <td style={colStyles} className={'h-12 align-top  ' + className}>
        {children}
    </td>
);
