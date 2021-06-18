import Link from 'next/link';

export default function NavCompositeur({list}) {
    return (
        <div className="">
            <div>les compositeurs de musique liturgique:</div>
            <ul className="list-disc">
                {list &&
                    list.map(page => (
                        <li key={page.pageSlug}>
                            <Link href={`/${page.pageSlug}`}>
                                <a>{page.pageName}</a>
                            </Link>
                        </li>
                    ))}
            </ul>
        </div>
    );
}
