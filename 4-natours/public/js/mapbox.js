/* eslint-disable no-alert, no-console */

export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoibmVjZWxlbnRhbm8iLCJhIjoiY2tucTRheGVwMDJiZzJ3bzdrajdkbW03YyJ9.BKX3ykRqBy2IbLeF1RZVOw';

  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/necelentano/cknqiqive01gx17rlhkhzxc3p',
    scrollZoom: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add pop-up
    new mapboxgl.Popup({
      offset: 40,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);
    // Extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: { top: 200, bottom: 150, left: 100, right: 100 },
  });
};

/* eslint-disable no-alert, no-console */
