import React from 'react';
import { observer } from 'mobx-react';
import styles from './FlightBookingInfo.module.css';
import moment from 'moment-with-locales-es6';


function FlightBookingComponent(props) {
    const { chosenFlight, openBookingModal } = props;
    const departureTimeStamp = React.useMemo(() => moment.utc((chosenFlight.flys_at)).format('D.MM.YYYY, HH:mm'), [chosenFlight.flys_at]);
    const landingTimestamp = React.useMemo(() => moment.utc((chosenFlight.lands_at)).format('D.MM.YYYY, HH:mm'), [chosenFlight.lands_at]);

    return (
        <div className={styles.main}>
        <div className={styles.topText}>{chosenFlight.name}</div>

        <div className={styles.infoGrid}>
          <div className={styles.infoGridElement}>
            <p>Company:</p>
            <p className={styles.grayLetters}>&nbsp;&nbsp;&nbsp;&nbsp;{chosenFlight.company_name}</p>
          </div>
          <div className={styles.infoGridElement}>
            <p>Available Seats:</p>
            <p className={styles.grayLetters}>&nbsp;&nbsp;&nbsp;&nbsp;{chosenFlight.no_of_seats - chosenFlight.no_of_booked_seats}</p>
          </div>

          <div className={styles.infoGridElement}>
            <p>Departs At:</p>
            <p className={styles.grayLetters}>&nbsp;&nbsp;&nbsp;&nbsp;
            {departureTimeStamp}</p>
          </div>

          <div className={styles.infoGridElement}>
            <p>Lands At:</p>
            <p className={styles.grayLetters}>&nbsp;&nbsp;&nbsp;&nbsp;
            {landingTimestamp}</p>
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

        <button className={styles.bookButton} onClick={(e) => openBookingModal(chosenFlight)}>Book Now</button>

        <img className={styles.picture} src="http://placecorgi.com/450/300" width="650" height="550" alt="That's a pretty sweet Corgi." />

      </div>
    )
}

export const FlightBookingInfo = observer(FlightBookingComponent);