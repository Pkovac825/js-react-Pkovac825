/**
 * The method makes a GET request on the https://flighter-hw7.herokuapp.com/api API. 
 * @param {String} model One of {bookings, companies, statistics/companies, flight, statistics/flight, session, users}. The model which we want to manipulate. 
 * @param {String} authorization User's authorization
 * @param {String} body Request body 
 */
export function get(model, authorization, body) {
    return fetch(`https://flighter-hw7.herokuapp.com/api/${model}`, createOption('GET', authorization, body))
          .then((response) => response.json());
  }

/**
 * The method makes a POST request on the https://flighter-hw7.herokuapp.com/api API. 
 * @param {String} model One of {bookings, companies, statistics/companies, flight, statistics/flight, session, users}. The model which we want to manipulate. 
 * @param {String} authorization User's authorization
 * @param {String} body Request body 
 */
export function post(model, authorization, body) {
  return fetch(`https://flighter-hw7.herokuapp.com/api/${model}`, createOption('POST', authorization, body))
        .then((response) => response.json());
}

/**
 * The method makes a PUT request on the https://flighter-hw7.herokuapp.com/api API. 
 * @param {String} model One of {bookings, companies, statistics/companies, flight, statistics/flight, session, users}. The model which we want to manipulate. 
 * @param {String} authorization User's authorization
 * @param {String} body Request body 
 */
export function put(model, authorization, body) {
  return fetch(`https://flighter-hw7.herokuapp.com/api/${model}`, createOption('PUT', authorization, body))
        .then((response) => response.json());
}

/**
 * The method makes a DELETE request on the https://flighter-hw7.herokuapp.com/api API. 
 * @param {String} model One of {bookings, companies, statistics/companies, flight, statistics/flight, session, users}. The model which we want to manipulate. 
 * @param {String} authorization User's authorization
 * @param {String} body Request body 
 */
export function remove(model, authorization, body) {
  return fetch(`https://flighter-hw7.herokuapp.com/api/${model}`, createOption('DELETE', authorization, body))
        .then((response) => response.json());
}

/**
 * This method creates the options JSON which is necessary for the API calls to work.
 * @param {String} method One of {GET, POST, PUT, DELETE}
 * @param {String} authorization User's authorization
 * @param {String} body Request body
 */
function createOption(method, authorization, body) {
  return {
    method,
    headers: {
      'Authorization': authorization,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body,
  }
}