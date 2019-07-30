
export function uploadImage(image, appState) {
  const body = new FormData();
  body.append('image', image);
    return fetch('https://isa-js-upload.andreicek.dev/upload', {
      method: 'POST',
      headers: {
        Authorization: appState.userToken,
      },
      body,
    }).then((response) => response.json())
      .then((data) => {
        appState.user.imageurl = data.imageUrl;
        return data;
      });
}