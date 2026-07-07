const map = L.map('map').setView(
    [campground.geometry.coordinates[1], campground.geometry.coordinates[0]],
    10
);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

L.marker([
    campground.geometry.coordinates[1],
    campground.geometry.coordinates[0]
])
.addTo(map)
.bindPopup(
    `<h3>${campground.title}</h3><p>${campground.location}</p>`
)
.openPopup();