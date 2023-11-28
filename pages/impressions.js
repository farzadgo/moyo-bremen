import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { langs, useLang, themes, useTheme } from '@/components/Layout';
import Menu from '@/components/Menu';
import Buttons from '@/components/Buttons';
import styles from '@/styles/Page.module.css';

import Lightbox from 'yet-another-react-lightbox';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import PhotoAlbum from 'react-photo-album';

import one_01 from '@/images/09.05/DSC_4881.jpg';
import one_02 from '@/images/09.05/DSC_4997.jpg';
import one_03 from '@/images/09.05/DSC_5028.jpg';
import one_04 from '@/images/09.05/DSC_5078.jpg';
import one_05 from '@/images/09.05/DSC_5166.jpg';

import two_01 from '@/images/09.12/DSC_5381.jpg';
import two_02 from '@/images/09.12/DSC_5478.jpg';
import two_03 from '@/images/09.12/DSC_5590.jpg';
import two_04 from '@/images/09.12/DSC_5614.jpg';
import two_05 from '@/images/09.12/DSC_5721.jpg';
import two_06 from '@/images/09.12/DSC_5843.jpg';

import three_01 from '@/images/09.26/DSC_6043.jpg';
import three_02 from '@/images/09.26/DSC_6216.jpg';
import three_03 from '@/images/09.26/DSC_6236.jpg';
import three_04 from '@/images/09.26/DSC_6327.jpg';
import three_05 from '@/images/09.26/DSC_6401.jpg';
import three_06 from '@/images/09.26/DSC_6580.jpg';

import four_01 from '@/images/10.06/DSC_6833.jpg';
import four_02 from '@/images/10.06/DSC_6890.jpg';
import four_03 from '@/images/10.06/DSC_6973.jpg';
import four_04 from '@/images/10.06/DSC_6988.jpg';

import five_01 from '@/images/10.10/DSC_7016.jpg';
import five_02 from '@/images/10.10/DSC_7104.jpg';
import five_03 from '@/images/10.10/DSC_7116.jpg';
import five_04 from '@/images/10.10/DSC_7161.jpg';

import six_01 from '@/images/10.17/DSC_7248.jpg';
import six_02 from '@/images/10.17/DSC_7427.jpg';
import six_03 from '@/images/10.17/DSC_7494.jpg';
import six_04 from '@/images/10.17/DSC_7496.jpg';
import six_05 from '@/images/10.17/DSC_7499.jpg';


const impressions = () => {

  const {theme} = useTheme();
  const {lang} = useLang();

  const fgColor = theme === themes.light ? 'black' : 'white';
  const bgColor = theme === themes.light ? 'var(--bg-light)' : 'var(--bg-dark)';

  const impressionsStyle = {
    background: bgColor,
    color: fgColor
  }

  const [index, setIndex] = useState(-1);

  const [toggle, setToggle] = useState(false);
  const toggler = () => setToggle(prev => !prev);

  /**
   * this works with lightbox but for gallery they need height and width 
   * galley works with imported images as next.js adds the necessary props
   */
   
  // const images_09_05 = [
  //   {src: 'https://cloud.disorient.xyz/s/LjKGRrR6KRa4m3D/preview', description: 'Slide description'},
  //   {src: 'https://cloud.disorient.xyz/s/7r8FZNksCbzP2jX/preview', description: 'More Dexrfiptiojk'},
  //   {src: 'https://cloud.disorient.xyz/s/ZKXqJw2qM5eMnHr/preview', description: 'And AD ADA'},
  //   {src: 'https://cloud.disorient.xyz/s/bRwdMcsmN9mWsLF/preview', description: 'metoo more herre'},
  //   {src: 'https://cloud.disorient.xyz/s/WxtbynFNxLtMHzH/preview', description: 'what the fck'}
  // ];

  const images_09_05 = [one_01, one_02, one_03, one_04, one_05];
  const images_09_05_ = images_09_05.map((e, i) => ({...e, title: `05.09.2023`}));

  const images_09_12 = [two_01, two_02, two_03, two_04, two_05, two_06];
  const images_09_12_ = images_09_12.map((e, i) => ({...e, title: `12.09.2023`}));

  const images_09_26 = [three_01, three_02, three_03, three_04, three_05, three_06];
  const images_09_26_ = images_09_26.map((e, i) => ({...e, title: `26.09.2023`}));

  const images_10_06 = [four_01, four_02, four_03, four_04];
  const images_10_06_ = images_10_06.map((e, i) => ({...e, title: `06.10.2023`}));

  const images_10_10 = [five_01, five_02, five_03, five_04];
  const images_10_10_ = images_10_10.map((e, i) => ({...e, title: `10.10.2023`}));

  const images_10_17 = [six_01, six_02, six_03, six_04, six_05];
  const images_10_17_ = images_10_17.map((e, i) => ({...e, title: `17.10.2023`}));

  const allImages = [...images_09_05_, ...images_09_12_, ...images_09_26_, ...images_10_06_, ...images_10_10_, ...images_10_17_];
  

  return (
    <main className={styles.pageMain} style={impressionsStyle}>

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
          transformOrigin: 'top center',
        }}
      >
        <section>
          <h1> {lang === langs.de ? 'Eindrücke' : 'Impressions'} </h1>

          <PhotoAlbum
            layout='rows'
            photos={allImages}
            targetRowHeight={200}
            onClick={({ index: current }) => setIndex(current)}
          />

          <Lightbox
            slides={allImages}
            index={index}
            open={index >= 0}
            close={() => setIndex(-1)}
            plugins={[Captions]}
          />

        </section>

        <p> photo credits: <b>Kateryna Aloshyna</b></p>

      </motion.div>

    </main>
  )
}

export default impressions