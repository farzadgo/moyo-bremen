import { useState, useEffect } from 'react';
import Head from 'next/head';
import { title, description, keywords, url, image, author } from '../data/sitedata';
import { useRouter } from 'next/router';

const Meta = () => {

  const pathname = useRouter().pathname;

  const [pageTitle, setPageTitle] = useState('');
  
  useEffect(() => {
    if (pathname !== '/') {
      setPageTitle(`${title} | ${pathname.slice(1)}`)
    } else {
      setPageTitle(title)
    }

    return () => {}
  }, [pathname])
  

  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet='utf-8' />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="theme-color" content="#e9cec0" />
      <meta name="image" content={url + image} />      
      <meta name="author" content={author} />      

      <meta property="og:title" content={title} key="title"/>
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={url + image} />

      {/* <title>{`${title} ${'|' + pathname.slice(1)}`}</title> */}
      <title>{pageTitle}</title>

      {/* <link rel="manifest" href="/manifest.json" /> */}
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}

export default Meta