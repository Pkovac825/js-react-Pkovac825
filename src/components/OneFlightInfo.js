import React from 'react';
import { observer } from 'mobx-react';
import styles from './OneFlightInfo.module.css';
import { Link } from 'react-router-dom';

function FlightInfoComponent(props) {
    const { flight, book, addToWishlist } = props;

    function changeSelected(select) {
        const index = select.nativeEvent.target.selectedIndex - 1;
        if(index) {
            (flight.name.split("-").length > 1) && addToWishlist(flight.name.split("-")[1].trim())
        } else {
            book(flight.id)
        }
    }

    return (
        <div className={styles.oneFlightInfo} key={flight.id}>
            <select className={styles.alignRight} name="booking" defaultValue="defOpt" onChange={changeSelected}>
                <option className={styles.threeDots} value="defOpt" disabled hidden>&#8942;</option>
                <option value={flight.id}>Book</option>
                <option value={flight.id}>Add to wishlist</option>
            </select>
            <Link to={"/book/" + flight.id}><img src="http://placegoat.com/400/300" width="400" height="350" alt="That's a pretty sweet goat." /></Link>
            <div className={styles.desc}>
                <h4>Departs at {flight.flys_at.split("T")[1].substring(0, 5)}</h4>
                <p>{flight.company_name}</p>
                <p ><span className={styles.star}>&#9733;&#9733;&#9733;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <span className={styles.grayLetters}>|&nbsp;&nbsp;&nbsp;&nbsp;{flight.no_of_seats - flight.no_of_booked_seats} tickets available</span></p>
                <p>Price <span className={styles.money}>&nbsp;&nbsp;{flight.base_price}$</span> </p>
            </div>
        </div>
    )
}

export const OneFlightInfo = observer(FlightInfoComponent);