import React from 'react';
import ReactDOM from 'react-dom';

class FlightInfo extends React.Component {
  state = {
    flights: []
  }

  componentDidMount() {
    if(!localStorage.newUser1) {
      const optionsUser = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body : {
          "user": {
            "email": "myemail@gmail.com",
            "first_name": "Test",
            "last_name": "Tester",
            "password": "pass"
          }
        }
      };

        fetch("https://flighter-hw5.herokuapp.com/api/users", optionsUser)
      .then(data => data.json())
      .then(JSONparsed => JSONparsed.user)
      .then(user => {localStorage.newUser1 = user;})
      .catch(error => {console.log(error);});
    }

    if(!sessionStorage.token) {
      const optionsToken = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body : {
          "session": {
            "email": localStorage.newUser1.email,
            "password": localStorage.newUser1.password
          }
        }
      };

        fetch("https://flighter-hw5.herokuapp.com/api/session", optionsToken)
      .then(data => data.json())
      .then(JSONparsed => JSONparsed.session)
      .then(session => sessionStorage.token = session.token)
      .catch(error => {console.log(error);});
    }


    const optionsFlights = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json',
        'Authoratization': sessionStorage.token
      }
    };
    fetch("https://flighter-hw5.herokuapp.com/api/flights", optionsFlights)
    .then(data => data.json())
    .then(JSONparsed => JSONparsed.flights)
    .then(flights => this.setState({flights}))
    .catch(error => {console.log(error);});
  }


  render() {
    return (
      <div>
        <h1>This is a list of all available flights:</h1>
        <hr></hr>
        <ul>
          {this.state.flights.map(flight => <li key={flight.id}>{flight.name} | Company: {flight.company.name} | 
          Date: {flight.flys_at.split("T")[0]} | Time Of Departure: {flight.flys_at.split("T")[1].substring(0,8)} | 
          Time Of Arrival: {flight.lands_at.split("T")[1].substring(0,8)} | 
          Price: {flight.base_price}kn </li>)}
        </ul>
      </div>
    )
  }
}

ReactDOM.render(<FlightInfo />, document.getElementById('root'));
