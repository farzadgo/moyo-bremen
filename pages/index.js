import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
// import Head from 'next/head';
import { useRouter } from 'next/router';
import { program } from '../data/program-data';
import { langs, themes, useLang, useTheme } from '@/components/Layout';
import Buttons from '@/components/Buttons';
import Menu from '@/components/Menu';
import ProgEntry from '@/components/ProgEntry';
import styles from '@/styles/Home.module.css';

// import logoBgOne from '@/public/moyo-claim.png'
// import logoBgTwo from '@/public/moyo-claim-wt.png'

export default function Home() {

  const {theme} = useTheme();
  const {lang} = useLang();
  const [progdata, setProgdata] = useState('');

  const router = useRouter();

  const [activeParag, setActiveParag] = useState('intro')
  const setActive = (id) => {
    setActiveParag(id);
    // router.push(`/#${id}`);
    setTimeout(() => {
      router.push(`/#${id}`);
    }, "100");
  }
  
  const [bgURL, setBgURL] = useState('/moyo-claim.png');
  
  const fgColor = theme === themes.light ? 'black' : 'white';
  const bgColor = theme === themes.light ? 'var(--bg-light)' : 'var(--bg-dark)';

  const mainStyle = {
    background: bgColor,
    color: fgColor
  }

  const landingStyle = {
    backgroundImage: `url(${bgURL})`
  }

  const timespanStyle = {
    borderBottom: `1.5px solid ${fgColor}`
  }

  const arrowStyle = {
    borderLeft: `1.5px solid ${fgColor}`,
    borderBottom: `1.5px solid ${fgColor}`
  }

  const [toggle, setToggle] = useState(false);
  const toggler = () => setToggle(prev => !prev);

  useEffect(() => {
    setProgdata(program);
    return () => {}
  }, [])

  useEffect(() => {
    let url = theme === themes.light ? '/moyo-claim.png' : '/moyo-claim-wt.png';
    setBgURL(url);
    return () => {}
  }, [theme])
  

  return (
    <main className={styles.homeMain} style={mainStyle}>

      <AnimatePresence>
        {toggle && <Menu setToggle={toggler} />}
      </AnimatePresence>
      <Buttons setToggle={toggler}/>

      <section className={styles.homeLanding} style={landingStyle}>
        <div className={styles.gotoprogram}>
          <p style={timespanStyle}> September - {lang === langs.de ? 'Dezember' : 'December'} 2023 </p>
          <a href="#program"> {lang === langs.de ? 'PROGRAMM' : 'PROGRAM'} <span style={arrowStyle}></span> </a>
        </div>
      </section>

      <section className={styles.homeProgram} id="program">
        {progdata && progdata.map((e, i) => <ProgEntry content={e} key={i} lang={lang} fgColor={fgColor} activeParag={activeParag} setActive={setActive}/>)}
      </section>
        
    </main>
  )
}