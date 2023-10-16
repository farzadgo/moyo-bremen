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
  const [isMounted, setIsMounted] = useState(false);

  const multilangThanksPhrases = {
    en: 'Special thanks to our cooperation partners:',
    de: 'Besonderer Dank an unsere Kooperationspartner*innen:',
    bg: 'Специални благодарности на нашите партньори за сътрудничество:',
    ku: 'Spasiyên taybetî ji bo hevkarên me yên hevkariyê:',
    uk: 'Окрема подяка нашим партнерам по співпраці:',
    ro: 'Mulțumiri speciale partenerilor noștri de cooperare:',
    ko: '협력 파트너에게 특별히 감사드립니다:',
    et: 'Eriline tänu meie koostööpartneritele:',
    sw: 'Shukrani za pekee kwa washirika wetu wa ushirikiano:',
    ar: 'شكر خاص لشركاء التعاون:',
    ne: 'हाम्रो सहयोग साझेदारहरूलाई विशेष धन्यवाद:',
    es: 'Un agradecimiento especial a nuestros socios colaboradores:',
    fr: 'Nous remercions tout particulièrement nos partenaires de coopération :',
    ff: 'Special thanks to our cooperation partners:',
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

    setIsMounted(true);
    setThanksPhrase(multilangThanksPhrases[lang]);

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

      {isMounted && (
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
            <h3 style={{margin: '4em 0 2em'}}> {thanksPhrase} </h3>

              <div className={styles.row}>
                <div className={styles.logo}>
                  <img src="./partner-logos/logo_ANB.png" alt="partner logo"></img>
                </div>
                <div className={styles.logo}>
                  <img src="./partner-logos/logo_koreanisch.png" alt="partner logo"></img>
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.logo}>
                  <img src="./partner-logos/logo_tolerance.png" alt="partner logo"></img>
                </div>
                <div className={styles.logo}>
                  <img src="./partner-logos/logo_guineischer.png" alt="partner logo"></img>
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.logo}>
                  <img src="./partner-logos/logo_schwaKiBi.png" alt="partner logo"></img>
                </div>
              </div>

          </section>

        </motion.div>
      )}

    </main>
  )
}
 
export default About