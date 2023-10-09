import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { themes, useTheme, useLang } from '@/components/Layout';
import styles from '@/styles/Buttons.module.css';

import * as Icon from 'react-feather';

const Buttons = ({setToggle}) => {

  const mainLanguages = [
    { value: 'de', label: 'Deutsch' },
    { value: 'en', label: 'English' }
  ]

  const extraLanguages = [
    { value: 'bg', label: 'български' },
    { value: 'ku', label: 'Kurdî (Kurmancî)' },
    { value: 'uk', label: 'українська' },
    { value: 'ro', label: 'Română' },
    { value: 'ko', label: '한국어' },
    { value: 'et', label: 'eesti keel' }, /* to be checked */
    { value: 'sw', label: 'Kiswahili' }, /* to be checked */
    { value: 'ar', label: 'العربية' }, /* to be checked */
    { value: 'ne', label: 'नेपाली' }, /* to be checked */
    { value: 'es', label: 'Español' },
    { value: 'fr', label: 'Français' },
    { value: 'ff', label: '𞤊𞤵𞤤𞤬𞤵𞤤𞤣𞤫' }
  ]

  const path = useRouter().pathname;
  const [languages, setLanguages] = useState([]); 

  const {theme, setTheme} = useTheme();
  const {lang, setLang} = useLang();

  const themeToggler = () => setTheme(theme === themes.light ? themes.dark : themes.light);

  const handleLang = (event) => {
    let langCode = event.target.value;
    // let langName = languages.filter(e => e.value === langCode)[0].label;
    setLang(langCode);
  }

  const fgColor = theme === themes.light ? 'black' : 'white';
  const bgColor = theme === themes.light ? 'var(--bg-light)' : 'var(--bg-dark)';

  const iconProps = {
    color: fgColor,
    size: 36,
    strokeWidth: theme === themes.light ? 1 : 1.5
  }

  const selectStyle = {
    background: bgColor,
    color: fgColor
  }

  useEffect(() => {
    if (path === '/about') {
      setLanguages([...mainLanguages, ...extraLanguages]);
    } else {
      setLanguages(mainLanguages);
      if (lang !== 'en') {
        setLang('de');
      }
    }

    // console.log(lang);
  
    return () => { }
  }, [path])
  

  return (
    <div className={styles.buttonContainer}>

      <select value={lang} onChange={handleLang} className={styles.langbut} style={selectStyle}>
        {languages.map((option, i) => (
          <option value={option.value} key={i}> {option.label} </option>
        ))}
      </select>

      <button onClick={setToggle} className={styles.menubut}>
        <Icon.Menu {...iconProps}/>
      </button>

      <button onClick={themeToggler} className={styles.themebut}>
        {theme === themes.light ? <Icon.Moon {...iconProps}/> : <Icon.Sun {...iconProps}/>}
      </button>

    </div>
  )
}

export default Buttons