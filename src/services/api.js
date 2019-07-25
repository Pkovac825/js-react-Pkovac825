export function get(model, Authorization, body) {
  const getOptions = {
    method: 'GET',
    headers: {
      Authorization,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body,
  };
    return fetch(`https://flighter-hw7.herokuapp.com/api/${model}`, getOptions)
      .then((response) => response.json());
  }

export function post(model, Authorization, body) {
  const postOptions = {
    method: 'POST',
    headers: {
      Authorization,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body,
  };
  return fetch(`https://flighter-hw7.herokuapp.com/api/${model}`, postOptions)
    .then((response) => response.json());
}

export function put(model, body) {
  const putOptions = {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body,
  };
  return fetch(`https://flighter-hw7.herokuapp.com/api/${model}`, putOptions)
    .then((response) => response.json());
}

export function del(model, body) {
  const deleteOptions = {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body,
  };
  return fetch(`https://flighter-hw7.herokuapp.com/api/${model}`, deleteOptions)
    .then((response) => response.json());
}