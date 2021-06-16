import Head from 'next/head'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Header from '../components/header/header'
import styles from '../styles/pages/home.module.css'
import AppHome from '../components/apphome'
import { getMenu } from '../model/menu'

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
      <Header menu={menu}/>

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

  const menu = await getMenu(context)

  return {props: {
    menu: menu
  }}
}
  
  