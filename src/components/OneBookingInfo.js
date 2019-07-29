import React from 'react';
import { observer } from 'mobx-react';
import styles from './OneBookingInfo.module.css';

function BookingInfoComponent(props) {
    const { booking } = props;
    const city = React.useMemo(() => booking.flight_name.split("-")[1].trim(), [booking]);
    const companyName = booking.company_name;
    const months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                    "Jul", "Aug", "Sep", "Oc", "Nov", "Dec" ];
    const  day = React.useMemo(() => booking.flys_at.substring(8, 10).trim(), [booking]);
    const month = React.useMemo(() => months[parseInt(booking.flys_at.substring(5, 7)) - 1], [booking]);
    const year = React.useMemo(() => booking.flys_at.substring(0, 4), [booking]);
    const time = React.useMemo(() => booking.flys_at.substring(11, 16), [booking]);

    return (

        <div>
            <img src="http://placecorgi.com/240/240"/>
            <p><span className={styles.city}>&nbsp;{city}&nbsp;&nbsp;</span><span className={styles.grayLetters}>|&nbsp;&nbsp;{companyName}</span></p>
            <p className={styles.bold}><span>&nbsp;&nbsp;{day}.&nbsp;{month}&nbsp;{year}&nbsp;&nbsp;<span className={styles.grayLetters}>|</span>&nbsp;&nbsp;</span><span>{time}</span></p>
        </div>
    )
}

export const OneBookingInfo = observer(BookingInfoComponent);