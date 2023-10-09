import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { langs, useLang, themes, useTheme } from '@/components/Layout';
import Menu from '@/components/Menu';
import Buttons from '@/components/Buttons';
import styles from '@/styles/Page.module.css';

const About = () => {

  const {theme} = useTheme();
  const {lang} = useLang();

  const [toggle, setToggle] = useState(false);
  const [direction, setDirection] = useState('ltr');
  
  const [about, setAbout] = useState('');
  const [title, setTitle] = useState('');
  const [thanksPhrase, setThanksPhrase] = useState('');

  const fgColor = theme === themes.light ? 'black' : 'white';
  const bgColor = theme === themes.light ? 'var(--bg-light)' : 'var(--bg-dark)';

  const aboutStyle = {
    background: bgColor,
    color: fgColor
  }

  const toggler = () => setToggle(prev => !prev);

  // const [width, setWidth] = useState(900);
  // const [about, setAbout] = useState('');

  // const handleResize = debounce(() => {
  //   setWidth(window.innerWidth)
  // }, 1000);

  const [animKey, setAnimKey] = useState(0);

  const multilangThanksPhrases = {
    en: 'Special thanks to our cooperation partners:',
    de: 'Besonderer Dank an unsere Kooperationspartner*innen:'
  }

  const createMarkup = (string) => {
    return {__html: string}
  }


  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/about');
      const data = await response.json();
      const content = await data.filter(e => e.lang === lang)[0].data;
      setAbout(content[0].BODY);
      setTitle(content[0].TITLE);
    }
    fetchData();

    if (lang === langs.ar) {      
      setDirection('rtl')
    } else {
      setDirection('ltr')
    }

    if (lang === langs.en) {
      setThanksPhrase(multilangThanksPhrases.en)
    } else {
      setThanksPhrase(multilangThanksPhrases.de)
    }

    setAnimKey(animKey + 1);

    // setWidth(window.innerWidth);
    // window.addEventListener('resize', handleResize);
    return () => {
      // window.removeEventListener('resize', handleResize);
    }
  }, [lang])

  return (
    <main className={styles.pageMain} style={aboutStyle}>

      <AnimatePresence>
        {toggle && <Menu setToggle={toggler} />}
      </AnimatePresence>
      <Buttons setToggle={toggler}/>

      <motion.div
        className={styles.pageBody}
        key={animKey}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          scale: { duration: 1 },
          opacity: { duration: 0.5, delay: 0.5 },
          ease: 'easeInOut',
          transformOrigin: 'top center',
        }}
      >
        <section dir={direction}>
          {title && <h1> {title} </h1>}
          {about && about.map((e, i) => <p key={i} dangerouslySetInnerHTML={createMarkup(e)}/>)}
        </section>

        <section>
          <h4> {thanksPhrase} </h4>
          <div className='gallery'></div>
        </section>
      </motion.div>

    </main>
  )
}
 
export default About