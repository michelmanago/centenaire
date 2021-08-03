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
      <div className={styles.home}>
        <header className={styles.header + " relative"}>
          <div className={styles.homeBandeauVideoContainer}>
            <video className={styles.homeBandeauVideo}loop muted autoPlay playsInline src="/static/videos/bandeau-centenaire.mp4"></video>
          </div>          
        </header>
        <AppHome  currentLanguage={locale} />
      </div>

    </div>
  )
}


export async function getStaticProps(context) {

  const menu = await getMenu(context.locale)

  return {
    props: {
      menu: menu
    },
    revalidate: 10,
  }
}
  
  