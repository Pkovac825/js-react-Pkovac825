import { post, put, get } from './api';

export function createUser(email, fname, lname, password) {
    const body = JSON.stringify({
        "user": {
          "email": email,
          "first_name": fname,
          "last_name": lname,
          "password": password,
        }
      });

    return post('users', '', body);
  }

  export function fetchUser(appState, id, token) {
    return get('users/' + id, token)
              .then(user => user.user)
              .then(user => {
                console.log(user);
                appState.user.firstName = user.first_name;
                appState.user.lastName = user.last_name;
                appState.user.bookings = user.bookings;
                appState.user.id = user.id;
                appState.user.imageurl = user.image_url || "";
                appState.user.email = user.email;
              });
  }

  export function updateUser(email, password, imageurl, appState) {
    const body = JSON.stringify({
        "user": {
          "email": email,
          "first_name": appState.user.firstName,
          "last_name": appState.user.lastName,
          "password": password,
          "image_url": imageurl,
        }
      });

    return put('users/' + appState.user.id, appState.userToken, body);
  }