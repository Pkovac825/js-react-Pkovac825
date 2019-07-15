import React from 'react';
import { useLocalStorage, useAsync } from 'react-use';
import { ChosenFlights } from '../components/ChosenFlights';

export function Landing(props) {
  const [serverToken, setServerToken] = useLocalStorage('serverToken', '');
  useAsync(createServerToken);
  const { value } = useAsync(fetchFlights);

  return (
     value ? <ChosenFlights flightsJSON={value} /> : "Loading..."
  );


//FUNCTIONS
  async function createServerToken() {
    if (serverToken) return;
    const session = await createServerSession();
    if (!session || !session.session.token) {
      createServerUser();
      session = await createServerSession();
    }
    setServerToken(session.session.token);
  }

  async function createServerUser() {
    const optionsUser = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "user": {
          "email": "default@default.com",
          "first_name": "default",
          "last_name": "default",
          "password": "default"
        }
      })

    };
    return await fetch('https://flighter-hw7.herokuapp.com/api/users', optionsUser)
      .then((res) => res.json())
      .catch(() => { });
  }

  async function createServerSession() {
    const optionsSession = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "session": {
          "email": "default@default.com",
          "password": "default"
        }
      })
    };
    return fetch('https://flighter-hw7.herokuapp.com/api/session', optionsSession)
      .then((res) => res.json())
      .catch(() => { });
  };

  async function fetchFlights() {
    const optionsFlight = {
      method: 'GET',
      headers: {
        'Authorization': serverToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };
    return fetch('https://flighter-hw7.herokuapp.com/api/flights', optionsFlight)
      .then((res) => res.json());
  }
}