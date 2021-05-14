import Head from 'next/head'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Header from '../components/header'
import styles from '../styles/pages/home.module.css'
import AppHome from '../components/apphome'

export default function Home() {

  const router = useRouter()
  const { locale, locales, defaultLocale } = router

  return (
    <div className={styles.container}>
      <Head>
        <title>Exposition du centenaire</title>
        <link rel="icon" href="/favicon.ico" />
        <meta http-equiv="Refresh" content="0; url=//fr.archeveche.eu" />
      </Head>

      {/* Header */}
      <Header/>

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