export function get(model, options) {
    return fetch(`https://flighter-hw7.herokuapp.com/api/${model}`, options)
      .then((response) => response.json());
  }