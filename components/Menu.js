import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { contact, links } from '../data/sitedata';
import { motion } from 'framer-motion';

import { themes, useTheme, langs, useLang } from '@/components/Layout';
import styles from '@/styles/Menu.module.css';

import * as Icon from 'react-feather';

const Menu = ({ setToggle }) => {

  const [entries, setEntries] = useState({});
  const path = useRouter().pathname;

  const {theme} = useTheme();
  const {lang} = useLang();

  const fgColor = theme === themes.light ? 'black' : 'white';
  // const bgColor = theme === themes.light ? 'var(--bg-light)' : 'var(--bg-dark)';

  const multilangEntries = {
    en: {
      home:'moyo',
      about: 'About us',
      impressions: 'Impressions'
    },
    de: {
      home:'moyo',
      about: 'Über uns',
      impressions: 'Eindrücke'
    }
  }

  const navListStyle = {
    borderTop: `1px dotted ${fgColor}`,
    borderBottom: `1px dotted ${fgColor}`
  }

  const activeStyle = {
    fontStyle: 'italic',
    pointerEvents: 'none'
  }

  const iconProps = {
    color: fgColor,
    size: 48,
    strokeWidth: 1
  }

  const handleEntries = () => {
    // console.log(lang);
    if (lang === langs.en) {
      setEntries({...multilangEntries.en})
    }
    if (lang !== langs.en) {
      setEntries({...multilangEntries.de})
    }
  }


  useEffect(() => {
    handleEntries();

    document.body.classList.add('disable-scroll');
    return () => {
      document.body.classList.remove('disable-scroll');
    }
  }, [lang]);
  

  return (
    <motion.div
      className={styles.container}
      // key={animKey}
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1, transition: { duration: 0.4} }}
      exit={{ x: '100%', opacity: 0, transition: { duration: 0.4} }}
    >
      {/* <CloseMenu setToggle={setToggle}/> */}
      <div className={styles.close}>
        <button className={styles.closebtn} onClick={setToggle}>
          <Icon.X {...iconProps}/>
        </button>
      </div>

      <nav className={styles.nav}>
        <ul>
          <li style={path === '/' ? {...navListStyle, ...activeStyle} : navListStyle}>
            <Link href='/'>
              {entries.home} 
            </Link>
          </li>
          <li style={path === '/about' ? activeStyle : {}}>
            <Link href='/about'>
              {entries.about} 
            </Link>
          </li>
          <li style={path === '/impressions' ? {...navListStyle, ...activeStyle} : navListStyle}>
            <Link href='/impressions'>
              {entries.impressions} 
            </Link>
          </li>
        </ul>
      </nav>

      <section className={styles.contactSection}>
        {contact.map((item, i) => <Contact key={i} item={item} fgColor={fgColor}/>)}
      </section>

    </motion.div>
  )
}

export default Menu


const Contact = ({ item, fgColor }) => {
  const iconProps = {
    color: fgColor,
    size: 16,
    strokeWidth: 2
  }
  const TagName = Icon[item.name];

  return (
    <div className={styles.contact}>
      <TagName {...iconProps}/>
      <a
        href={item.url}
        aria-label={item.name}
        target="_blank"
        rel="noreferrer"
      >
        {item.title}
      </a>
    </div>
  )
}
