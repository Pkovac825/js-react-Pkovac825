import React from 'react';
import styles from './Landing.module.css';
import { observer } from 'mobx-react';
import { userState } from '../state/UserState';
import { Link } from 'react-router-dom';

function LandingComponent(props) {
  const { responseFlights } = props;

  function logout() {
    userState.userToken = '';
  }
  
  return (

    <div className={styles.pageGrid}>
      <div className={styles.header}>
        {userState.userToken ?
          <div>
            <a href="/"><button className={styles.headerButton} onClick={logout}>Logout</button></a>
          </div>
          :
          <div>
            <a href="/login"><button className={styles.headerButton}>Login</button></a>
            <a href="/register"><button className={styles.headerButton}>Register</button></a>
          </div>
        }
      </div>


      <div className={styles.search}>
        <div className={styles.searchText}>
          Find the best flights for you and your friends!
        </div>

        <div className={styles.searchButtonsArea}>
          <select className={styles.dropbtn} name="date" defaultValue="defOpt">
            <option className={styles.dropdownContent} value="defOpt" disabled hidden>Choose the date!</option>
            <option className={styles.dropdownContent} value="">Now!</option>
            <option className={styles.dropdownContent} value="">Never!</option>
            <option className={styles.dropdownContent} value="">The third Sol of the autumn.</option>
          </select>

          <select className={styles.dropbtn} name="city" defaultValue="defOpt">
            <option className={styles.dropdownContent} value="defOpt" disabled hidden>Choose the location!</option>
            <option className={styles.dropdownContent} value="">bish</option>
            <option className={styles.dropdownContent} value="">bash</option>
            <option className={styles.dropdownContent} value="">bosh</option>
          </select>

          <select className={styles.dropbtn} name="people" defaultValue="defOpt">
            <option className={styles.dropdownContent} value="defOpt" disabled hidden>Choose the number of people!</option>
            <option className={styles.dropdownContent} value="">1 Person</option>
            <option className={styles.dropdownContent} value="">2 Guys</option>
            <option className={styles.dropdownContent} value="">3 Pals</option>
          </select>



          <button className={styles.searchButton}>SEARCH</button>
        </div>
      </div>



      <div className={styles.main}>
        <div className={styles.toptext}>
          RESULTS
        </div>
        <div className={styles.flightInfo}>

          {
            responseFlights.map((flight) => (

              <div className={styles.oneFlightInfo} key={flight.id}>
                <select className={styles.alignRight} name="booking" defaultValue="defOpt">
                  <option className={styles.threeDots} value="defOpt" disabled hidden>&#8942;</option>
                  <option value={flight.id}>Book</option>
                  <option value={flight.id}>Add to wishlist</option>
                </select>
                <Link to={"/book?" + flight.id}><img src="http://placecorgi.com/400/300" width="400" height="350" alt="That's a pretty sweet Corgi." /></Link>
                <div className={styles.desc}>
                  <h4>Departs at {flight.flys_at.split("T")[1].substring(0, 5)}</h4>
                  <p>{flight.company_name}</p>
                  <p ><span className={styles.star}>&#9733;&#9733;&#9733;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <span className={styles.grayLetters}>|&nbsp;&nbsp;&nbsp;&nbsp;{flight.no_of_seats} tickets available</span></p>
                  <p>Price <span className={styles.money}>&nbsp;&nbsp;{flight.base_price}$</span> </p>
                </div>
              </div>

            ))
          }

        </div>
      </div>
    </div>
  );
}

export const ChosenFlights = observer(LandingComponent);

