import React from 'react';
import './CSS/Landing.css';
import { useSessionStorage } from 'react-use';
import './CSS/Buttons.css';

export function ChosenFlights(props) {
  const { flightsJSON } = props;
  console.log(sessionStorage.getItem('userToken'));

  return (

    <div className="pageGrid">
      <div className="header">
        {sessionStorage.getItem('userToken') ?
          <div>
            <a href="/"><button className="headerButton" onClick={logout}>Logout</button></a>
          </div>
          :
          <div>
            <a href="/login"><button className="headerButton">Login</button></a>
            <a href="/register"><button className="headerButton">Register</button></a>
          </div>
        }
      </div>


      <div className="search">
        <div className="searchText">
          Find the best flights for you and your friends!
        </div>

        <div className="searchButtonsArea">
          <div className="dropdown">
            <button onClick={drop} className="dropbtn alignLeft" id="date">01. FEB 2019.</button>
            <div id="dateDropdown" className="dropdown-content">
              <p>02. FEB 2019.</p>
              <p>03. FEB 2019.</p>
              <p>04. FEB 2019.</p>
              <p>05. FEB 2019.</p>
            </div>
          </div>

          <div className="dropdown">
            <button onClick={drop} className="dropbtn alignLeft" id="city">AMSTERDAM</button>
            <div id="cityDropdown" className="dropdown-content">
              <p>ZAGREB</p>
              <p>BERLIN</p>
              <p>ROME</p>
              <p>LONDON</p>
            </div>
          </div>

          <div className="dropdown">
            <button onClick={drop} className="dropbtn alignLeft" id="passengerNumber">4 PEOPLE</button>
            <div id="passengerNumberDropdown" className="dropdown-content">
              <p>1 PERSON</p>
              <p>2 PEOPLE</p>
              <p>3 PEOPLE</p>
            </div>
          </div>
          <button className="searchButton">SEARCH</button>
        </div>
      </div>



      <div className="main">
        <div className="toptext">
          RESULTS
        </div>
        <div className="flightInfo">

          {
            flightsJSON && flightsJSON.flights && flightsJSON.flights.map((flight) => (
              <div className="oneFlightInfo" key={flight.id}>
                <div className="alignRight">
                  <div className="dropdown">
                    <button onClick={drop} className="dropbtn alignRight" id={flight.id + "dots"}>&#8942;</button>
                    <div id={flight.id + "dotsDropdown"} className="dropdown-content alignRight">
                      <p className="alignCenter">Book</p>
                      <p className="alignCenter">Add to wishlist</p>
                    </div>
                  </div>
                </div>
                <img src="http://placecorgi.com/400/300" width="400" height="350" />
                <div className="desc">
                  <h4>Departs at {flight.flys_at.split("T")[1].substring(0, 5)}</h4>
                  <p>{flight.company_name}</p>
                  <p ><span className="star">&#9733;&#9733;&#9733;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <span className="grayLetters">|&nbsp;&nbsp;&nbsp;&nbsp;{flight.no_of_seats} tickets available</span></p>
                  <p>Price <span className="money">&nbsp;&nbsp;{flight.base_price}$</span> </p>
                </div>
              </div>

            ))
          }
          
          <div className="oneFlightInfo"></div>
          <div className="oneFlightInfo"></div>
          <div className="oneFlightInfo"></div>
          <div className="oneFlightInfo"></div>
          <div className="oneFlightInfo"></div>
          <div className="oneFlightInfo"></div>
          <div className="oneFlightInfo"></div>
          <div className="oneFlightInfo"></div>
          <div className="oneFlightInfo"></div>
          <div className="oneFlightInfo"></div>
          <div className="oneFlightInfo"></div>
          <div className="oneFlightInfo"></div>

        </div>
      </div>
    </div>
  );
}

function logout() {
  sessionStorage.removeItem('userToken', null);
  sessionStorage.removeItem('loginMessage')
}

function drop(e) {
  document.getElementById(e.target.id + "Dropdown").classList.toggle("show");
}

window.onclick = function (event) {
  const drpID = event.target.id ? event.target.id + "Dropdown" : "";
  var dropdowns = document.getElementsByClassName("dropdown-content");
  var i;
  for (i = 0; i < dropdowns.length; i++) {
    var openDropdown = dropdowns[i];
    if (openDropdown.classList.contains('show') && (openDropdown.id != drpID)) {
      openDropdown.classList.remove('show');
    }
  }
}