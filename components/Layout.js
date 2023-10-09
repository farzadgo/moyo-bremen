import React, { useContext, useState } from 'react';
import Meta from './Meta';
import Footer from './Footer';


export const themes = {
  light: 'light',
  dark: 'dark'
}

export const langs = {
  de: 'de',
  en: 'en',
  et: 'et',
  ar: 'ar',
  ne: 'ne',
  sw: 'sw',
  uk: 'uk',
  bg: 'bg',
  ro: 'ro',
  es: 'es',
  ko: 'ko',
  fr: 'fr',
  ff: 'ff'
}

// const languages = {
//   en: 'English',
//   de: 'Deutch',
//   fa: 'فارسی',
//   tr: 'Türkçe',
//   ku: 'Kurdî/کوردی',
//   uk: 'українська'
// }

export const ThemeContext = React.createContext({
  theme: undefined,
  setTheme: async (theme) => null
});

export const LangContext = React.createContext({
  lang: undefined,
  setLang: async (lang) => null
})

export const useTheme = () => useContext(ThemeContext);
export const useLang = () => useContext(LangContext);


export const Layout = ({children}) => {

  const [theme, setTheme] = useState(themes.light);
  const [lang, setLang] = useState(langs.de);
  
  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      <LangContext.Provider value={{lang, setLang}}>
        <Meta />
        {children}
        <Footer />
      </LangContext.Provider>
    </ThemeContext.Provider>
  )
}