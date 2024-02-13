<template>
  <div id="mapContainer" style="width: 100%; height: calc(100vh - 60px)"></div>
</template>

<script>
import {defineComponent, onMounted} from "vue";
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
export default defineComponent({
  name: "LMap",
  setup() {
    let map = null;
    let marker = null;
    const createMap = () => {
      map = L.map('mapContainer').setView([41.2994958, 69.2400734], 13);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
      marker = L.marker([41.2994958,69.2400734]).addTo(map)
        .bindPopup('<span>A pretty CSS popup</span>.<br> Easily customizable.');
      map.on('click', function (e){
        console.log(e)
        const secondMarker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
        L.Routing.control({
          waypoints: [
            L.latLng(41.2994958, 69.2400734),
            L.latLng(e.latlng.lat, e.latlng.lng)
          ]
        }).on('routesfound',function (e){
          console.log(e)
          e.routes[0].coordinates.forEach((coord,index)=>{
            setTimeout(()=>{
              marker.setLatLng([coord.lat, coord.lng]);
            }, 100*index);
          })
        }).addTo(map);
      })
      // L.Routing.control({
      //   waypoints: [
      //     L.latLng(57.74, 11.94),
      //     L.latLng(57.6792, 11.949)
      //   ]
      // }).addTo(map);
    }
    onMounted(() => {
      createMap()
    })
  }
})
</script>

<style scoped>

</style>
