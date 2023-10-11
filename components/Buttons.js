import { useState, useEffect, useRef } from 'react';
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

  const handleLangSelect = (_lang) => {
    // console.log(_lang);
    setLang(_lang);
  }

  const path = useRouter().pathname;
  const [languages, setLanguages] = useState([]); 

  const {theme, setTheme} = useTheme();
  const {lang, setLang} = useLang();

  const themeToggler = () => setTheme(theme === themes.light ? themes.dark : themes.light);
  const langToggler = () => lang === 'de' ? setLang('en') : setLang('de');

  // const handleLang = (event) => {
  //   let langCode = event.target.value;
  //   // let langName = languages.filter(e => e.value === langCode)[0].label;
  //   setLang(langCode);
  // }

  // const fgColor = theme === themes.light ? 'black' : 'white';
  const bgColor = theme === themes.light ? 'var(--bg-light)' : 'var(--bg-dark)';

  const iconProps = {
    color: bgColor,
    size: 36,
    strokeWidth: 1.5
  }

  // const selectStyle = {
  //   background: bgColor,
  //   color: fgColor
  // }

  useEffect(() => {
    if (path === '/about') {
      setLanguages([...mainLanguages, ...extraLanguages]);
    } else {
      setLanguages(mainLanguages);
      if (lang !== 'en') {
        setLang('de');
      }
    }
  
    return () => { }
  }, [path])
  

  return (
    <div className={styles.buttonContainer}>

      <button onClick={setToggle} className={styles.menubut}>
        <Icon.Menu {...iconProps}/>
      </button>

      {/* <select value={lang} onChange={handleLang} className={styles.langbut} style={selectStyle}>
        {languages.map((option, i) => (
          <option value={option.value} key={i}> {option.label} </option>
        ))}
      </select> */}

      {path === '/about' ?
        <CustomSelect languages={languages} lang={lang} onSelect={handleLangSelect} theme={theme}/> :
        <button onClick={langToggler} className={styles.langbut} style={{color: bgColor}}>
          {lang === 'en' ? 'DE' : 'EN'}
        </button>
      }

      <button onClick={themeToggler} className={styles.themebut}>
        {theme === themes.light ? <Icon.Moon {...iconProps}/> : <Icon.Sun {...iconProps}/>}
      </button>

    </div>
  )
}

export default Buttons



const CustomSelect = ({ languages, lang, onSelect, theme }) => {

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const handleDocumentClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  }

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleLangSelect = (_lang) => {
    onSelect(_lang);
    setIsOpen(false);
  }

  const optionListStyle = {
    display: isOpen ? 'block' : 'none',
    // color: 'black',
    background: theme === themes.light ? '#e1d2cb81' : '#261f1baa'
  }

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);


  return (
  <div className={styles.dropdownContainer} ref={dropdownRef}>

    <button className={styles.langbut} onClick={toggleDropdown}>
      {theme === themes.light ?
        <img src='/lang-fff.svg' alt='Language Icon'/> :
        <img src='/lang-000.svg' alt='Language Icon'/>
      }
    </button>

    <ul className={styles.optionsList} style={optionListStyle}>
      {languages.map((option, i) => (
        <li
          key={i}
          onClick={() => handleLangSelect(option.value)}
          className={option.value === lang ? styles.selected : ''}
        >
          {option.label}
        </li>
      ))}
    </ul>

  </div>
  )
}