import { Fragment } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css'
import Link from 'next/link';

function HomePage(props) {

  if (typeof window !== "undefined") {
    var status = localStorage.getItem('status');
  }
  let authenticated = ('authenticated' === status);

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
            Every Blood Donor, Is a Life Saver
          </h1>

          
          {
            !authenticated && (
              <div className={styles.grid}>
                <Link href='/account/signup'>
                  <div className={styles.card}>
                    <h2>No account yet?</h2>
                    <p>Register now to start using the service!</p>
                  </div>
                </Link>
                <Link href='/account/login'>
                  <div className={styles.card}>
                    <h2>Existing user?</h2>
                    <p>Login to start using the service!</p>
                  </div>
                </Link>
              </div>
            )
          }

          {
            authenticated && (
              <div className={styles.grid}>
                <Link href='/donate'>
                  <div className={styles.card}>
                    <h2>I am a Donor</h2>
                    <p>I want to donate blood and help people that needs it. Thank you!</p>
                  </div>
                </Link>

                <Link href='/request'>
                  <div className={styles.card}>
                    <h2>I am a Seeker</h2>
                    <p>I am requesting blood for medical reason. Thank you!</p>
                  </div>
                </Link>
              </div>
            )
          }
        </main>
      </div>

    </Fragment>
  );
}

export default HomePage;
