import React from 'react';
import { observer } from 'mobx-react';
import styles from './Results.module.css';
import { useSetState } from 'react-use';
import { OneFlightInfo } from './OneFlightInfo';

function ResultsComponent(props) {
    const { responseFlights, book, addToWishlist, query } = props;
    const [state, setState] = useSetState({
        queryText: "",
      });

    React.useEffect(() => {
        const queryText = "" + (query.location ? query.location.toUpperCase() : "")
                              + (query.month ? (query.location ? ", " : "") + query.month.toUpperCase() : "");
        setState({queryText: queryText ? "FOR " + queryText : ""})
      }, [responseFlights])

    return (
        <div className={styles.main}>
            
            <div className={styles.toptext}>
                RESULTS {state.queryText}
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