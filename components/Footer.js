// import { useState, useEffect } from 'react';
import Link from 'next/link';
import { langs, useLang } from '@/components/Layout';
import styles from '@/styles/Footer.module.css';
import { ExternalLink } from 'react-feather';

// import fundOne from '@/public/funding-logos/ministerium-logo.png';
// import fundTwo from '@/public/funding-logos/PIB-logo.png';

const Footer = () => {

  const {lang} = useLang();

  const message = 'Die Pilotphase im Jahr 2023 wurde koordiniert und begleitet durch das Projektbüro Innenstadt Bremen und finanziert durch das Bundesprogramm „Zukunftsfähige Innenstädte und Zentren“, mit dem die nachhaltige Entwicklung der Bremer Innenstadt gefördert wird.';  

  return (
    <footer className={styles.footer}>

      <section className={styles.fundSection}>
        <p> {message} </p>
        <div className={styles.logoContainer}>
          <div className={styles.logo}>
            <img src="./funding-logos/ministerium-logo-durch.png" alt="funding logo"></img>
          </div>
          <div className={styles.logo}>
            <img src="./funding-logos/PIB-logo.png" alt="funding logo"></img>
          </div>
        </div>
      </section>

      <section className={styles.linkSection}>
        <div>
          <p> © 2023 moyo </p> &nbsp;
          <p style={{display: 'flex', alignItems: 'center'}}> | web by <a href='https://github.com/farzadgo' target='_blank'>farzadgo</a> &nbsp; <ExternalLink {...{color: '#111', size: 14, strokeWidth: 2}}/> </p>
        </div>
        <Link href='/imprint'> {lang === langs.de ? 'Impressum' : 'Imprint'} </Link>
      </section>

    </footer>
  )
}
 
export default Footer