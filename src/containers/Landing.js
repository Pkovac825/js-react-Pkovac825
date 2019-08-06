import React from 'react';
import styles from './Landing.module.css';
import { useAsync } from 'react-use';
import { observer } from 'mobx-react';
import { Header } from '../components/Header';
import { loadFlights } from '../services/flights';
import { useSetState } from 'react-use';
import { SearchOptions } from '../components/SearchOptions';
import { Results } from '../components/Results';
import { AppContext } from '../state/AppContext';
import { action } from 'mobx';
import moment from 'moment-with-locales-es6';

/**
 * The main container which shows all the available flights.
 * Matches path "/
 */
function LandingContainer(props) {
  const { appState } = React.useContext(AppContext);
  useAsync(loadFlights.bind(null, appState, appState.userToken));
  const [state, setState] = useSetState({
    flights: appState.getBookableFlights,
    filteredFlights: [],
    query: {
      numberOfPeople: false,
      location: false,
      month: false,
    },
  });
  const searchText = "Find the best flights for you and your friends!";
  const buttonNames = ["month", "location", "numberOfPeople"];
  const buttonDefaultTexts = ["Choose the month!", "Choose the location!", "Choose the number of people!"];
  const buttonOptions = [moment.months(), React.useMemo(() => appState.getDestinations, [appState.flights]), ["1", "2", "3", "4"]];
  /**Filters flights by query parameters. */
  const filter = state.flights.filter((flight) => (!state.query.numberOfPeople || flight.no_of_seats - flight.no_of_booked_seats >= state.query.numberOfPeople) &&
                                                  (!state.query.location || flight.name.split("-")[1].trim() === state.query.location) &&
                                                  (!state.query.month || moment.utc(flight.flys_at).format('MMMM') === state.query.month));
  /**Adds a city to the wishlist. If the wishlist already contains the city, the city won't be added. */
  const addToWishlist = action("wishlist", (city) => {
    appState.user.wishlist = JSON.parse(appState.user.wishlist);
    if(!appState.user.wishlist.includes(city)) {
      appState.user.wishlist.push(city);
    }
    appState.user.wishlist = JSON.stringify(appState.user.wishlist);
  });

  React.useEffect(() => {
    setState({flights: appState.getBookableFlights});
    setState({filteredFlights: appState.getBookableFlights})
  }, [appState.flights]);

  /**
   * Updates state query.
   */
  const updateFilter = function(select) {
      const index = select.nativeEvent.target.selectedIndex;
      const name = select.nativeEvent.srcElement.name;
      const value = select.nativeEvent.srcElement[index].childNodes[0].nodeValue;
      const query = {...state.query};
      query[name] = value;
      setState({query});
  }

  return (
    <div className={styles.pageGrid}>
      <Header logout={action("logout", () => appState.userToken = '')} firstName={appState.user.firstName} onLanding={true} />

      <SearchOptions searchText={searchText} buttonNames={buttonNames} onQueryChange={updateFilter} 
        onSearch={() => setState({filteredFlights: filter})}
        buttonDefaultTexts={buttonDefaultTexts} buttonOptions={buttonOptions} />

      {state.flights && <Results
        query={state.query}
        responseFlights={state.filteredFlights}
        book={(id) => props.history.push("/book/modal/" + id)}
        addToWishlist={addToWishlist} />
      }
    </div>
  );
}

export const Landing = observer(LandingContainer);