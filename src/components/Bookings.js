import React from 'react';
import { observer } from 'mobx-react';
import { OneBookingInfo } from './OneBookingInfo'
import styles from './Bookings.module.css';
import { useSetState } from 'react-use';

function BookingsComponent(props) {
    const { bookings, loading } = props;
    const [state, setState] = useSetState({
        itemsToShow: 4,
        expanded: false,
    });

    function showMore() {
        state.itemsToShow === 4 ? (
            setState({ itemsToShow: bookings.length, expanded: true })
        ) : (
                setState({ itemsToShow: 4, expanded: false })
            )
    }


    return (
        <>
            <div className={styles.main}>
                <p><span className={styles.bigText}>MY BOOKINGS</span>
                    {(bookings.length > state.itemsToShow || state.expanded) && <a className={styles.expandable} onClick={showMore}>
                        {state.expanded ? (
                            <span>Show less</span>
                        ) : (
                                <span>Show more</span>
                            )} </a>}</p>

                {
                    !loading && (bookings.length ?
                        <div className={styles.bookingGrid}>
                            {bookings.slice(0, state.itemsToShow).map((booking) => (
                                <OneBookingInfo booking={booking} key={booking.id} />
                            ))}
                        </div>
                        :
                        <a className={styles.blueLink} href="/">You haven't booked any flights. Click here to find flights to book!</a>
                    )}


            </div>
        </>
    )

}

export const Bookings = new observer(BookingsComponent);