import axios from 'axios';
import { GOOGLE_API_KEY } from './config/app.config';

const form = document.querySelector('form')!;
const addressInput = document.getElementById('address')! as HTMLInputElement;
// console.log(addressInput)

type GoogleGeocodingResponse = {
  results: { geometry: { location: { lat: number, lng: number }}}[];
  status: 'OK' | 'ZERO_RESULTS'
};

declare var google: any;

function searchAddressHandler(event: Event) {
  event.preventDefault();
  const enterAddress = addressInput.value;
  // console.log(enterAddress)

  axios.get<GoogleGeocodingResponse>(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enterAddress)}&key=${GOOGLE_API_KEY}`)
  .then(res => {
      if (res.data.status !== 'OK') {
        throw new Error('error')
      };
      const coordinates = res.data.results[0].geometry.location;
      // console.log(res.data)
      const map = new google.maps.Map(document.getElementById('map')!, {
        center: coordinates,
        zoom: 16,
      });
      new google.maps.Marker({ position: coordinates, map: map });
    }
  )
  .catch(err => {
    alert(err.message);
    console.log(err);
  })
}

form.addEventListener('submit', searchAddressHandler);