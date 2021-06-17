// libs
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'

// components
import Header from '../components/header/header'
import AppHome from '../components/apphome'

// models
import { getMenu } from '../model/menu'

// styles
import styles from '../styles/pages/home.module.css'

export default function Home({menu}) {

  const router = useRouter()
  const { locale, locales, defaultLocale } = router

  return (
    <div className={styles.container}>
      <Head>
        <title>Exposition du centenaire</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      {menu && <Header menu={menu.data}/>}

      {/* Page home */}
      <div>
        <header className={styles.header + " relative"}>
          <Image
            src="/static/img/bandeau_cathedrale.jpg"
            // width={1400}
            // height={927}
            objectFit="cover"
            layout="fill"
          />
        </header>
        <AppHome  currentLanguage={locale} />
      </div>

    </div>
  )
}


export async function getStaticProps(context) {

  const menu = await getMenu(context.locale)

  return {props: {
    menu: menu
  }}
}
  
  