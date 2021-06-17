import { getSession } from "next-auth/client";
import Header from "../../components/header/header";

export default function AdminIndex(params) {
    return (
        <>
            <Header />
        </>
    )
}

export async function getServerSideProps(context) {
    const {req} = context;
    const session = await getSession({req});

    if (!session)
        return {
            redirect: {
                permanent: false,
                destination: '/login?redirect=admin',
            },
        };
    return {
        props: {}
    }
}