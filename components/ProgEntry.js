import { useState, useEffect, useRef } from 'react';
// import * as Icon from 'react-feather';
import styles from '@/styles/ProgEntry.module.css';

const ProgEntry = ({ content, lang, fgColor, activeParag, setActive }) => {

  const descRef = useRef(0);
  const [body, setBody] = useState('');

  const [bodyHeight, setBodyHeight] = useState(0);

  const [activeMargin, setActiveMargin] = useState('0');
  const [arrowAngle, setArrowAngle] = useState(0);
  const [day, setDay] = useState('');

  const handleTimeClick = (e) => {
    // let targetID = e.target.parentNode.id;
    // setActiveParag(targetID);
    // router.push(`/#${targetID}`);
    // setActive(content.ID);
    setActive(content.DATE);
  }

  const createMarkup = (string) => {
    return {__html: string}
  }

  // const iconProps = {
  //   color: fgColor,
  //   size: 36,
  //   strokeWidth: 1.5
  // }
  
  useEffect(() => {
    // console.log(content);
    let imperial = content.BODY.filter(obj => obj.lang === lang);
    setDay(imperial[0].day);
    let extra = content.BODY.filter(obj => obj.lang !== 'de' && obj.lang !== 'en');
    setBody([...extra, ...imperial]);

    // console.log(activeParag);
    // console.log(body);

    if (content.DATE === activeParag) {
      setBodyHeight('auto');
      setActiveMargin('calc(var(--padding) + 48px)');
      setArrowAngle(180);

      let tempTitle = descRef.current.previousSibling;
      if (tempTitle.id === 'temp-title') tempTitle.style.display = 'none';
    } else {
      setBodyHeight(0);
      setActiveMargin('0');
      setArrowAngle(0);
      
      let tempTitle = descRef.current.previousSibling;
      if (tempTitle.id === 'temp-title') tempTitle.style.display = 'block';
    }

    return () => {}
  }, [lang, activeParag])
  

 
  return (
   <div id={content.DATE} className={styles.programentry} >
    
    <div className={styles.time} onClick={handleTimeClick} style={{marginTop: activeMargin, borderTop: `1px solid ${fgColor}`}}>
      {/* <p> {day} – {content.DATE} <Icon.ArrowDown {...iconProps} style={{transform: `rotate(${arrowAngle}deg)`}}/> </p> */}
      <span> {day} – {content.DATE} </span>
      <img src='/moyo-logo-72.png' style={{transform: `rotate(${arrowAngle}deg)`}} />
    </div>

    {body.length > 1 && <h2 id='temp-title'> {body[0].title} </h2>}

    <div className={styles.description} style={{height: bodyHeight}} ref={descRef}>
      {body && body.map((e, i) => (
        <div key={i} style={e.lang !== 'en' && e.lang !== 'de' ? {color: 'var(--moyo-c1'} : {}}>
          <h2> {e.title} </h2>
          {e.parags && e.parags.map((e, i) => <p key={i} dangerouslySetInnerHTML={createMarkup(e)}/>)}
        </div>
      ))}
    </div>

   </div>
  )
}

export default ProgEntry