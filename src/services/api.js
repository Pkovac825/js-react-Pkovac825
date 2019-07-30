export function get(model, authorization, body) {
  const getOptions = {
    method: 'GET',
    headers: {
      'Authorization': authorization,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body,
  };
    return fetch(`https://flighter-hw7.herokuapp.com/api/${model}`, getOptions)
      .then((response) => response.json());
  }

export function post(model, authorization, body) {
  const postOptions = {
    method: 'POST',
    headers: {
      'Authorization': authorization,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body,
  };
  return fetch(`https://flighter-hw7.herokuapp.com/api/${model}`, postOptions)
    .then((response) => response.json());
}

export function put(model, authorization, body) {
  const putOptions = {
    method: 'PUT',
    headers: {
      'Authorization': authorization,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body,
  };
  return fetch(`https://flighter-hw7.herokuapp.com/api/${model}`, putOptions)
    .then((response) => response.json());
}

export function remove(model, authorization, body) {
  const deleteOptions = {
    method: 'DELETE',
    headers: {
      'Authorization': authorization,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body,
  };
  return fetch(`https://flighter-hw7.herokuapp.com/api/${model}`, deleteOptions)
    .then((response) => response.json());
}