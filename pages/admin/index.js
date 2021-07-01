import {getSession, useSession} from 'next-auth/client';
import Link from 'next/link';
import Header from '../../components/header/header';

export default function AdminIndex({}) {
    const [session] = useSession();
    return (
        <>
            <Header />
            <main className="max-w-screen-xl p-4 bg-white md:mx-auto">
                {session && session.userBase.role === 'admin' ? (
                    <div className='flex flex-row'>
                        <Link href="/admin/signup">
                            <a className='px-2 py-1 mr-2 text-white rounded bg-pblue hover:bg-pblue-dark'>Ajouter un User</a>
                        </Link>
                        <Link href="/admin/page">
                            <a className='px-2 py-1 text-white rounded bg-pblue hover:bg-pblue-dark'>Administrer les pages</a>
                        </Link>
                    </div>
                ) : (
                    <div>
                        <Link href="/admin/page">
                            <a className='px-2 py-1 text-white rounded bg-pblue hover:bg-pblue-dark'>Administrer les pages</a>
                        </Link>
                        <br />
                        <Link href="/admin/category">
                            <a className='inline-block mt-5 px-2 py-1 text-white rounded bg-pblue hover:bg-pblue-dark'>Administrer les catégories</a>
                        </Link>
                    </div>
                )}
            </main>
        </>
    );
}

export async function getServerSideProps(context) {
    const {req} = context;
    const session = await getSession({req});

    console.warn("ENLEVER FALSE")
    if (false && !session)
        return {
            redirect: {
                permanent: false,
                destination: '/login?redirect=admin',
            },
        };
    return {
        props: {},
    };
}
