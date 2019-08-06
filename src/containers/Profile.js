import React from 'react';
import { useAsync } from 'react-use';
import { observer } from 'mobx-react';
import styles from './Profile.module.css';
import { AppContext } from '../state/AppContext';
import { Header } from '../components/Header';
import { UserInfo } from '../components/UserInfo';
import { Bookings } from '../components/Bookings';
import { Wishlist } from '../components/Wishlist';
import { action } from 'mobx';
import { loadFlights } from '../services/flights';
import { fetchUser } from '../services/userAPI';

/**
 * The profile page container.
 * Matches path "/profile"
 */
function ProfileContainer() {
  const { appState } = React.useContext(AppContext);
  useAsync(loadFlights.bind(null, appState, appState.userToken));
  const { loading } = useAsync(fetchUser.bind(null, appState, appState.user.id, appState.userToken));

  return (
    <>
      <div className={styles.consistentFonts}>
        <Header logout={action("logout", () => appState.userToken = '')} firstName={appState.user.firstName} />
      </div>
      <div className={styles.pageGrid}>
        <UserInfo id={appState.user.id} firstName={appState.user.firstName} lastName={appState.user.lastName} email={appState.user.email} imageurl={appState.user.imageurl} />
        <Bookings bookings={appState.user.bookings} loading={loading} />
        <Wishlist wishlist={JSON.parse(appState.user.wishlist)} flights={appState.getBookableFlights} />
      </div>
    </>
  )
}

export const Profile = observer(ProfileContainer);