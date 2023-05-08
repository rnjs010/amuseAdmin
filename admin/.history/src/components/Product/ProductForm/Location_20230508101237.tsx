import { useState } from 'react';
import styles from './Location.module.css';

function Location() {
  const [country, setCountry] = useState<string>('');
  const handleCountry = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(event.target.value);
  };
  
  const [city, setCity] = useState<string>('');
  const handleCity = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  return (
    <div className={`${styles.container} ${styles.location}`}>
      <div className={styles.country}>
        <span className={styles.title}>국가</span>
        <input className={`${styles.countryInput}`} value={country} onChange={handleCountry} type="text"/>
      </div>
      <div className={styles.city}>
        <span className={styles.title}>도시</span>
        <input className={`${styles.cityInput}`} value={city} onChange={handleCity} type="text"/>
      </div>
    </div>
  );  
}

export default Location;