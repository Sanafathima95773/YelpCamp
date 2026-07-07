const map = L.map('cluster-map').setView([39.8283, -98.5795], 4);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const markers = L.markerClusterGroup();
const bounds = L.latLngBounds([]);

campgrounds.forEach(campground => {
    if (!campground.geometry) return;

    const lat = campground.geometry.coordinates[1];
    const lng = campground.geometry.coordinates[0];

    const marker = L.marker([lat, lng]);

    marker.bindPopup(`
        <strong>${campground.title}</strong><br>
        ${campground.location}<br>
        <a href="/campgrounds/${campground._id}">View Campground</a>
    `);

    markers.addLayer(marker);
    bounds.extend([lat, lng]);
});

map.addLayer(markers);

if (bounds.isValid()) {
    map.fitBounds(bounds);
}