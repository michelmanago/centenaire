import Head from 'next/head'
import Header from '../components/header'
import styles from '../styles/pages/home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Exposition centenaire</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <Header/>

      <div>
        <h1>Hello homepage</h1>
      </div>

    </div>
  )
}
