import React from 'react';
import styles from './Landing.module.css';
import { useAsync } from 'react-use';
import { observer } from 'mobx-react';
import { Header } from '../components/Header';
import { loadFlights } from '../services/flights';
import { SearchOptions } from '../components/SearchOptions';
import { Results } from '../components/Results';
import { AppContext } from '../state/AppContext';
import { action } from 'mobx';

function LandingContainer(props) {
  const { appState } = React.useContext(AppContext);
  useAsync(loadFlights.bind(null, appState, appState.userToken));
  const searchText = "Find the best flights for you and your friends!";
  const buttonNames = ["date", "city", "people"];
  const buttonDefaultTexts = ["Choose the date!", "Choose the location!", "Choose the number of people!"];
  const buttonOptions = [["Now", "Never", "Tomorrow comes today", "Anytime"],
                         ["bish", "bash", "bosh"],
                         ["1 Person", "2 Guys", "3 Pals"]];

  const logout = action("logout", () => appState.userToken = '');

  function toBooking(flightId) {
    props.history.push("/book/modal/" + flightId);
  }

  return (
    <div className={styles.pageGrid}>
      <Header logout={logout}/>
      <SearchOptions searchText={searchText} buttonNames={buttonNames}
                      buttonDefaultTexts={buttonDefaultTexts} buttonOptions={buttonOptions}/>
      <Results responseFlights={appState.flights } toBooking={toBooking}/>
    </div>
  );
}

export const Landing = observer(LandingContainer);