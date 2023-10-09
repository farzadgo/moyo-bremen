import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { themes, useTheme } from '@/components/Layout';
import Menu from '@/components/Menu';
import Buttons from '@/components/Buttons';
import styles from '@/styles/Page.module.css';

// import { imprint } from '@/data/imprint-data';
// this throws Hydration error >> see: https://nextjs.org/docs/messages/react-hydration-error


const About = () => {

  const {theme} = useTheme();

  const fgColor = theme === themes.light ? 'black' : 'white';
  const bgColor = theme === themes.light ? 'var(--bg-light)' : 'var(--bg-dark)';

  const imprintStyle = {
    background: bgColor,
    color: fgColor
  }

  const [toggle, setToggle] = useState(false);
  const [imprint, setImprint] = useState('');

  const toggler = () => setToggle(prev => !prev);

  const createMarkup = (string) => {
    return {__html: string}
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/imprint');
      const data = await response.json();
      setImprint(data);
    }
    fetchData();

    // setWidth(window.innerWidth);
    // window.addEventListener('resize', handleResize);
    return () => {
      // window.removeEventListener('resize', handleResize);
    }
  }, [])

  return (
    <main className={styles.pageMain} style={imprintStyle}>

      <AnimatePresence>
        {toggle && <Menu setToggle={toggler} />}
      </AnimatePresence>
      <Buttons setToggle={toggler}/>

      <motion.div
        className={styles.pageBody}
        // key={animKey}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          scale: { duration: 1 },
          opacity: { duration: 0.5, delay: 0.5 },
          ease: 'easeInOut',
        }}
      >
        <section className={styles.imprintSection}>
          <h1> Impressum </h1>
          {imprint && imprint.map((e, i) => 
            <div key={i}>
              {e.title && <h3> {e.title} </h3>}
              {e.body && e.body.map((e, i) => <p key={i} dangerouslySetInnerHTML={createMarkup(e)}/>)}
            </div>
          )}
        </section>
      </motion.div>

    </main>
  )
}
 
export default About