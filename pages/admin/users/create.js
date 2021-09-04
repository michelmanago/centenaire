// models
import { getMenu } from "../../../model/menu"

// libs
import Head from "next/head"


// components
import Header from "../../../components/header/header"
import UserEditor from "../../../components/user-edtior/UserEditor"


export default function PageCreateUser({menu}){

        // methods
        const onCreateUser = async form => {

            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    password: form.password,
                    provider: 'custom',
                    role: form.role,
                }),
            });
    
            console.log(response)
    
            if (response.status === 200) {
                return true
            } else {
                return false
            }
    
        }

    return (
        <>
            <Head>
                <title>Creation d'utilisateur</title>
                
            </Head>
            {menu && <Header menu={menu.data}/>}
            <main className="max-w-screen-xl px-5 pt-5 mx-auto bg-white">

                <UserEditor
                    onSubmit={onCreateUser}
                    pageTitle={"Ajouter un utilisateur"}
                    submitLabel={"Ajouter un utilisateur"}
                    user={null}
                />

            </main>
        </>
    )

}


export async function getServerSideProps(context) {

    const menu = await getMenu(context.locale)
  
    return {props: {
      menu: menu
    }}
}
    