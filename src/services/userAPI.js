import { post, put, get } from './api';

/**
 * The method makes an API call that creates a user on the https://flighter-hw7.herokuapp.com/api API.
 * 
 * @param {String} email User's email 
 * @param {String} fname User's first name
 * @param {String} lname User's last name
 * @param {String} password User's password
 */
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

/**
 * The method makes an API call that gets a user from the https://flighter-hw7.herokuapp.com/api API.
 * 
 * @param appState The current AppState
 * @param {String} id User id
 * @param {String} token User authorization token.
 */
  export function fetchUser(appState, id, token) {
    return get('users/' + id, token)
              .then(user => user.user)
              .then(user => {
                appState.user.firstName = user.first_name;
                appState.user.lastName = user.last_name;
                appState.user.bookings = user.bookings;
                appState.user.id = user.id;
                appState.user.imageurl = user.image_url || "";
                appState.user.email = user.email;
              });
  }

  /**
 * The method makes an API call that modifies a user on the https://flighter-hw7.herokuapp.com/api API.
 *
 * @param {String} email User's email 
 * @param {String} password User's password
 * @param {String} imageUrl User's image URL
 * @param appState The current AppState
 * @param {String} password User's password
 */
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