import React from 'react';
import { observer } from 'mobx-react';
import styles from './OneWishInfo.module.css';

function WishInfoComponent(props) {
    const { wish, flights } = props;
    const numberOfFlights = flights.filter((flight) => (flight.name.split("-").length > 1) && flight.name.split("-")[1].trim() === wish).length;

    return (

        <div key={wish}>
            <img src="http://placekitten.com/240/240" alt="I'm a dog person"/>
            <p className={styles.city}>&nbsp;{wish}</p>
            <p className={styles.bold}>{numberOfFlights ? numberOfFlights + " flights available!" : "No flights available"}</p>
        </div>
    )
}

export const OneWishInfo = observer(WishInfoComponent);