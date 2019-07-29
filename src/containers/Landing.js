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

  const addToWishlist = action("wishlist", (city) => {
    appState.user.wishlist = JSON.parse(appState.user.wishlist);
    if(!appState.user.wishlist.includes(city)) {
      appState.user.wishlist.push(city);
    }
    appState.user.wishlist = JSON.stringify(appState.user.wishlist);
  });

  return (
    <div className={styles.pageGrid}>
      <Header logout={action("logout", () => appState.userToken = '')} firstName={appState.user.firstName} onLanding={true} />
      <SearchOptions searchText={searchText} buttonNames={buttonNames}
        buttonDefaultTexts={buttonDefaultTexts} buttonOptions={buttonOptions} />
      <Results responseFlights={appState.flights}
        book={(id) => props.history.push("/book/modal/" + id)}
        addToWishlist={addToWishlist} />
    </div>
  );
}

export const Landing = observer(LandingContainer);