import { get } from './flightsAPI';

export function sessionRequest(method, email, password) {
    const optionsSession = {
      method: method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "session": {
          "email": email,
          "password": password
        }
      })
    };
    return  get('session', optionsSession);
  };