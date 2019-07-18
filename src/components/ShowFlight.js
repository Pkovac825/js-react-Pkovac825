import React from 'react';
import { observer } from 'mobx-react';
import { userState } from '../state/UserState';
import styles from './ShowFlight.module.css';

function ShowFlightContainer(props) {
  const chosenFlight = props.chosenFlight[0];
  const flyDate = chosenFlight.flys_at.trim();
  const landDate = chosenFlight.lands_at.trim();

  function logout() {
    userState.userToken = '';
  }

  return (

    <div className={styles.pageGrid}>
      <div className={styles.header}>
        <div>
          <a href="/"><button className={styles.headerButton} onClick={logout}>Logout</button></a>
        </div>
      </div>

      <div className={styles.main}>
        <div className={styles.topText}>{chosenFlight.name}</div>

        <div className={styles.infoGrid}>
          <div className={styles.infoGridElement}>
            <p>Company:</p>
            <p className={styles.grayLetters}>&nbsp;&nbsp;&nbsp;&nbsp;{chosenFlight.company_name}</p>
          </div>
          <div className={styles.infoGridElement}>
            <p>Available Seats:</p>
            <p className={styles.grayLetters}>&nbsp;&nbsp;&nbsp;&nbsp;{chosenFlight.no_of_seats}</p>
          </div>

          <div className={styles.infoGridElement}>
            <p>Departs At:</p>
            <p className={styles.grayLetters}>&nbsp;&nbsp;&nbsp;&nbsp;
            {flyDate.substring(8,10)}.{flyDate.substring(5,7)}.{flyDate.substring(0,4)},
            &nbsp;{flyDate.substring(11,16)}</p>
          </div>

          <div className={styles.infoGridElement}>
            <p>Lands At:</p>
            <p className={styles.grayLetters}>&nbsp;&nbsp;&nbsp;&nbsp;
            {landDate.substring(8,10)}.{landDate.substring(5,7)}.{landDate.substring(0,4)},
            &nbsp;{landDate.substring(11,16)}</p>
          </div>

          <div className={styles.infoGridElement}>
            <p>Base Price:</p>
            <p className={styles.grayLetters}>&nbsp;&nbsp;&nbsp;&nbsp;{chosenFlight.base_price}$</p>
          </div>

          <div className={styles.infoGridElement}>
            <p>Current Price:</p>
            <p className={styles.grayLetters}>&nbsp;&nbsp;&nbsp;&nbsp;{chosenFlight.current_price}$</p>
          </div>
        </div>

        <div className={styles.specialInfoGrid}>
          <span className={styles.grayLetters}><span role="img" aria-label="network">📶</span>  Wireless Internet</span>
          <span className={styles.grayLetters}><span role="img" aria-label="baby">🚼</span>  Kids Friendly</span>
          <span className={styles.grayLetters}><span role="img" aria-label="football">⚽</span>  TV Available</span>
          <span className={styles.grayLetters}><span role="img" aria-label="food">🍴</span>  Meals Included</span>
        </div>

        <button className={styles.bookButton}>Book Now</button>

        <img className={styles.picture} src="http://placecorgi.com/450/300" width="650" height="550" alt="That's a pretty sweet Corgi." />

      </div>
    </div>
  );
}

export const ShowFlight = observer(ShowFlightContainer);

