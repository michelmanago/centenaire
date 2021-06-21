// model
import { getMenu } from "../model/menu";

// components
import Header from "../components/header/header";


export default function Page404({menu}){
    return (
        <>
            {menu && <Header menu={menu.data}/>}
            <main className="border max-w-screen-xl p-4 bg-white md:mx-auto">
                <div className="p-10">
                    <h1 className="text-2xl">Vous tentez de modifier un contenu qui n’existe pas. Peut-être a-t-il été supprimé ?</h1>
                </div>
            </main>
        </>
    )
}

export async function getStaticProps(context) {

    const menu = await getMenu(context.locale)
  
    return {props: {
      menu: menu
    }}
}
    