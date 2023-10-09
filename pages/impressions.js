import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { langs, useLang, themes, useTheme } from '@/components/Layout';
import Menu from '@/components/Menu';
import Buttons from '@/components/Buttons';

import styles from '@/styles/Page.module.css';

import eventOne_01 from '@/images/0905_01.jpg';
import eventOne_02 from '@/images/0905_02.jpg';
import eventOne_03 from '@/images/0905_03.jpg';
import eventOne_04 from '@/images/0905_04.jpg';
import eventOne_05 from '@/images/0905_05.jpg';
import eventOne_06 from '@/images/0905_06.jpg';
import eventOne_07 from '@/images/0905_07.jpg';
import eventOne_08 from '@/images/0905_08.jpg';
import eventOne_09 from '@/images/0905_09.jpg';
import eventOne_10 from '@/images/0905_10.jpg';
import eventOne_11 from '@/images/0905_11.jpg';


const impressions = () => {

  const {theme} = useTheme();
  const {lang} = useLang();

  const fgColor = theme === themes.light ? 'black' : 'white';
  const bgColor = theme === themes.light ? 'var(--bg-light)' : 'var(--bg-dark)';

  const impressionsStyle = {
    background: bgColor,
    color: fgColor
  }

  const [toggle, setToggle] = useState(false);
  const toggler = () => setToggle(prev => !prev);

  const images = [
    eventOne_01,
    eventOne_02,
    eventOne_03,
    eventOne_04,
    eventOne_05,
    eventOne_06,
    eventOne_07,
    eventOne_08,
    eventOne_09,
    eventOne_10,
    eventOne_11
  ]

  const ImageComp = ({ content }) => {
    return (
      <div className={styles.photoContainer}>
        <img src={content.src} alt="documentation photo"></img>
      </div>
    )
  }


  return (
    <main className={styles.pageMain} style={impressionsStyle}>

      <AnimatePresence>
        {toggle && <Menu setToggle={toggler} />}
      </AnimatePresence>
      <Buttons setToggle={toggler}/>

      <motion.div
        className={styles.pageBody}
        // key={animKey}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          scale: { duration: 1 },
          opacity: { duration: 0.5, delay: 0.5 },
          ease: 'easeInOut',
          transformOrigin: 'top center',
        }}
      >
        <section>
          <h1> {lang === langs.de ? 'Eindrücke' : 'Impressions'} </h1>
          {images && images.map((e, i) => <ImageComp content={e} key={i}/>)}
        </section>

        <p> photo credits: <b>Kateryna Aloshyna</b></p>

      </motion.div>

    </main>
  )
}

export default impressions