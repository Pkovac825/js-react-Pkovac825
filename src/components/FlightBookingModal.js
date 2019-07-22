import React from 'react';
import { observer } from 'mobx-react';
import styles from './FlightBookingModal.module.css';
import { useSetState } from 'react-use';
import { bookFlight } from '../services/bookFlight';

function FlightBookingModalContainer(props) {
    const { flight, appState, history } = props;
    const [state, setState] = useSetState({
        selectedNumber: 1,
        errorMsg: null,
    });

    function changeSelected(select) {
        setState({ selectedNumber: select.nativeEvent.target.selectedIndex + 1 });
    }

    function book(e) {
        e.preventDefault();
        if(flight.no_of_seats - flight.no_of_booked_seats - state.selectedNumber >= 0) {
            bookFlight(appState, appState.userToken, state.selectedNumber, flight.id);
            history.push("/book?id=" + flight.id);
        } else {
            setState({ errorMsg: "The plane has only " + (flight.no_of_seats - flight.no_of_booked_seats) + " seats." });
        }
        
    }

    return (<React.Fragment>
        {flight ?
            <div className={styles.modalContainer}>
                <div className={styles.modalContent}>
                    <p className={styles.topText}>Create booking</p>
                    <p className={styles.smallText}>Number of passengers</p>
                    <form onSubmit={book} onChange={changeSelected}>
                        <select className={styles.dropbtn} name="booking" defaultValue="defOpt" onChange={changeSelected}>
                            <option className={styles.dropdownContent} key="1" value="1" onSelect={changeSelected}>1</option>
                            <option className={styles.dropdownContent} key="2" value="2">2</option>
                            <option className={styles.dropdownContent} key="3" value="3">3</option>
                            <option className={styles.dropdownContent} key="4" value="4">4</option>
                        </select>
                        {state.errorMsg && <div className={styles.errorText}>{state.errorMsg}</div>}
                        <input className={styles.searchButton} type="submit" name="SUBMITBUTTON" value="Confirm booking"/>
                        
                    </form>

                </div>
            </div>
            :
            <div></div>

        }
    </React.Fragment>
    );
}

export const FlightBookingModal = observer(FlightBookingModalContainer);