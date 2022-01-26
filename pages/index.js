import { Fragment } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css'
import Link from 'next/link';

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>Blood Center</title>
        <meta
          name='description'
          content='Donate and request blood'
        />
      </Head>

      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>
            Welcome To Blood Center Of The Phillipines
          </h1>

          <div className={styles.grid}>
          <Link href='/donate'>
              <div className={styles.card}>
                <h2>I am a Donor</h2>
                <p>I want to donate blood and help people that needs it. Thank you!</p>
              </div>
            </Link>

            <Link href='/request'>
              <div className={styles.card}>
                <h2>I am a Patient</h2>
                <p>I am requesting blood for medical reason. Thank you!</p>
              </div>
            </Link>
          </div>
        </main>
      </div>

    </Fragment>
  );
}

export default HomePage;
