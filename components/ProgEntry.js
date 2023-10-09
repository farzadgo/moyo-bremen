import { useState, useEffect } from 'react';
import * as Icon from 'react-feather';
import styles from '@/styles/ProgEntry.module.css';

const ProgEntry = ({ content, lang, fgColor, activeParag, setActive }) => {

  const [body, setBody] = useState('');

  const [bodyHeight, setBodyHeight] = useState(0);

  const [funPadding, setFunPadding] = useState('0');
  const [arrowAngle, setArrowAngle] = useState(0);

  const handleTimeClick = (e) => {
    // let targetID = e.target.parentNode.id;
    // setActiveParag(targetID);
    // router.push(`/#${targetID}`);
    // setActive(content.ID);
    setActive(content.date);
  }

  const createMarkup = (string) => {
    return {__html: string}
  }

  const iconProps = {
    color: fgColor,
    size: 36,
    strokeWidth: 1
  }
  
  useEffect(() => {
    // console.log(content);
    let imperial = content.body.filter(obj => obj.lang === lang);
    let extra = content.body.filter(obj => obj.lang !== 'de' && obj.lang !== 'en');
    setBody([...extra, ...imperial]);

    // console.log(activeParag);

    if (content.date === activeParag) {
      setBodyHeight('auto');
      setFunPadding('30px');
      setArrowAngle(90);
    } else {
      setBodyHeight(0);
      setFunPadding('0');
      setArrowAngle(0);
    }

    return () => {}
  }, [lang, activeParag])
  

 
  return (
   <div id={content.date} className={styles.programentry} style={{paddingTop: funPadding}}>
    
    <div className={styles.time} style={{border: `2px solid ${fgColor}`}} onClick={handleTimeClick}>
      <p> {content.date} <Icon.ChevronRight {...iconProps} style={{transform: `rotate(${arrowAngle}deg)`}}/> </p>
    </div>

    <div className={styles.description} style={{height: bodyHeight, overflow: 'hidden'}}>
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