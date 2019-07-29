import React from 'react';
import { observer } from 'mobx-react';
import styles from './Results.module.css';
import { OneFlightInfo } from './OneFlightInfo';

function ResultsComponent(props) {
    const { responseFlights, book, addToWishlist } = props;

    return (
        <div className={styles.main}>
            
            <div className={styles.toptext}>
                RESULTS
            </div>

            <div className={styles.flightInfo}>
                {
                    responseFlights.map((flight) => (
                        <OneFlightInfo flight={flight} key={flight.id} book={book} addToWishlist={addToWishlist}/>
                    ))
                }
            </div>

        </div>
    )

}

export const Results = new observer(ResultsComponent);