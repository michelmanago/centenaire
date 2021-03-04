import Head from 'next/head'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Header from '../components/header'
import styles from '../styles/pages/home.module.css'
import AppSaints from '../components/appsaints'
  


export default function Saints() {
    const router = useRouter()
    const { locale, locales, defaultLocale } = router


    return (
      <div className={styles.container}>
        <Head>
          <title>Les saints de l'archevêché</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
        {/* Header */}
        <Header/>
  
        {/* Page home */}
        <div>
          <header className={styles.header + " relative"}>
            <Image
              src="/static/img/bandeau_cathedrale.jpg"
              // width={1400}
              // height={360}
              objectFit="cover"
              layout="fill"
            />
          </header>
        </div>
        <p>
            <AppSaints currentLanguage={locale} />
       </p>
      </div>
    )
  }
