import React from 'react';
import { observer } from 'mobx-react';
import styles from './OneBookingInfo.module.css';
import moment from 'moment-with-locales-es6';

function BookingInfoComponent(props) {
    const { booking } = props;
    const timestamp = React.useMemo(() => moment.utc((booking.flys_at)), [booking.flys_at]);
    const date = React.useMemo(() => timestamp.format('D. MMM YYYY'), [booking.flys_at]);
    const time = React.useMemo(() => timestamp.format('HH:mm'), [booking.flys_at]);
    const city = booking.flight_name.split("-")[1].trim();
    const companyName = booking.company_name;

    return (

        <div>
            <img src="http://placecorgi.com/240/240"/>
            <p><span className={styles.city}>&nbsp;{city}&nbsp;&nbsp;</span><span className={styles.grayLetters}>|&nbsp;&nbsp;{companyName}</span></p>
            <p className={styles.bold}><span>&nbsp;&nbsp;{date}&nbsp;&nbsp;<span className={styles.grayLetters}>|</span>&nbsp;&nbsp;</span><span>{time}</span></p>
        </div>
    )
}

export const OneBookingInfo = observer(BookingInfoComponent);