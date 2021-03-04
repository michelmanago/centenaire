import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/header'
import styles from '../styles/pages/home.module.css'

export default function Home() {

  return (
    <div className={styles.container}>
      <Head>
        <title>Exposition du centenaire</title>
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
      </div>

    </div>
  )
}