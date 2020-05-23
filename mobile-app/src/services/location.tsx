import Geolocation from '@react-native-community/geolocation';


export const getLocation = () => {
  let lat: string;

  Geolocation.getCurrentPosition((position) => {
     lat = JSON.stringify(position.coords.latitude);
    const lon = JSON.stringify(position.coords.longitude);

    console.log(lat + lon);
    return lat;
  });

  return "";


}
