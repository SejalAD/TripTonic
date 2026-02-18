
  maptilersdk.config.apiKey = "yHRLqXVT7Y9dqTAEqDCR";

const map = new maptilersdk.Map({
  container: 'map',
  style: `https://api.maptiler.com/maps/streets/style.json?key=yHRLqXVT7Y9dqTAEqDCR`,
  center: [72.8777, 19.0760],
  zoom: 12
});

new maptilersdk.Marker()
  .setLngLat([72.8777, 19.0760])
  .addTo(map);


